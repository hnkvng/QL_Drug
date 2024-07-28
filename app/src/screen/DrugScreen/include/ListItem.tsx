import { useCallback, useEffect, useMemo, useState, memo } from "react";
import { Card, Text, Title } from 'react-native-paper';
import { theme } from "../../../services/theme";
import { StyleSheet,  Linking} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from "react-native";
import { DrugItem, propsNameIcon, sortData } from "../../../services/type";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { ComponentJSX, ComponentProps } from "../../../services/type";
import { EXTERNAL_API_BASE_URLS, EXTERNAL_API_ENDPOINTS } from "../../../services/api";
import { TouchableOpacity } from "react-native";



interface ListItemProps {
    name: string,
    title: string,
    data: DrugItem[],
    loading: boolean,
    setSortData: React.Dispatch<React.SetStateAction<{
        sortDataList1: sortData;
        sortDataList2: sortData;
        sortDataList3: sortData;
    }>>,
}

const ListItem : ComponentProps<ListItemProps> = ({
    name,
    title,
    data,
    loading,
    setSortData
    }) : ComponentJSX => {

    const sizeIconNextPage = 30;
    const MAX_ITEM_IN_PAGE = 6;
    const MAX_PAGE = 7;

    const [iconSortData, setIconSortData] = useState<propsNameIcon>('sort-ascending');
    const [current, setCurrent] = useState(1);
    const [pageMin, setPageMin] = useState(1);
    const [pageMax, setPageMax] = useState(MAX_PAGE);
    

    const STT = (index : number) => {
        return MAX_ITEM_IN_PAGE*(current - 1) + index + 1
    }

    const startPage = useCallback((index : number) => index*6,[]);

    const endPage = useCallback((index : number) => {

        const math = MAX_ITEM_IN_PAGE + MAX_ITEM_IN_PAGE*index
        const lengthData = data.length;

        if(math < lengthData) {
            return math
        } 
        return lengthData
    },[data])

    

    const Page = useMemo(() => {

        const lengthData = data.length;

        return Array.from({length: Math.ceil(lengthData/6)}, (_, index) => 
        data.slice(startPage(index), endPage(index)))
    }
    ,[data]);

    const rightTitle = useCallback((props : any) => 
        <Icon 
            {...props} 
            name = {iconSortData} 
            onPress={() => handleNameIcon(iconSortData)}
        />
    ,[iconSortData]);

    const pageIndex = useMemo(() => (
        <>
            {current === Page.length && pageMin > 1 &&
                <>
                    <Text 
                        style = {{fontSize: 12, marginRight: 5, color: 'white'}}>1</Text>
                    <Text 
                        style = {{
                            fontSize: 12,
                            marginRight: 5, 
                            color: 'white'}}
                        >
                            ...
                    </Text>
                </>
            }
            {Page.map((_,index) => {
                index++;
                if(index === current) {
                    return <Text 
                                key = {index} 
                                style = {{
                                    fontSize: 12,
                                    marginRight: 5
                                }}
                            >
                                {index}
                            </Text>
                }
                if(index >= pageMin && index <= pageMax || Page.length < 9) {
                    return <Text 
                                key = {index} 
                                style = {{
                                    fontSize: 12,
                                    marginRight: 5, 
                                    color: 'white'
                                }}
                            >
                                {index}
                            </Text>
                }
            })}
            {Page.length > MAX_PAGE + 1 && 
            <>
                <Text 
                    style = {{
                        fontSize: 12,
                        marginRight: 5, 
                        color: 'white'}}
                    >
                        ...
                    </Text>
                <Text 
                    style = {{
                        fontSize: 12, 
                        marginRight: 5, 
                        color: 'white'
                    }}
                    >
                        {Page.length}
                    </Text>
            </>}
        </>
       
    ),[current, Page])

    const handleNameIcon = useCallback((name : 'sort-ascending' | 'sort-descending' ) => {
        switch(name) {
            case 'sort-ascending':
                setIconSortData('sort-descending');
                return;
            case 'sort-descending':
                setIconSortData('sort-ascending');
                return;
        };
    },[]);

    useEffect(() => {
        if(current > pageMax) {
            setPageMax(current);
            setPageMin(current - 6);
        } else if(current < pageMin) {
            setPageMax(current + 6);
            setPageMin(current);
        }
    },[current])

    useEffect(() => {
        const lengthPage = Page.length
        if(MAX_PAGE > lengthPage) {
            setPageMax(lengthPage);
        }   
    },[Page])

    useEffect(() => {
        switch(name ) {
            case 'list1':
                switch(iconSortData) {
                    case 'sort-ascending':
                        setSortData((sort) => ({...sort, sortDataList1: "ASC"}));
                        return;
                    case 'sort-descending':
                        setSortData((sort) => ({...sort, sortDataList1: "DESC"}));
                        return;
                };
            case 'list2':
                switch(iconSortData) {
                    case 'sort-ascending':
                        setSortData((sort) => ({...sort, sortDataList2: "ASC"}));
                        return;
                    case 'sort-descending':
                        setSortData((sort) => ({...sort, sortDataList2: "DESC"}));
                        return;
                };
            case 'list3':
                switch(iconSortData) {
                    case 'sort-ascending':
                        setSortData((sort) => ({...sort, sortDataList3: "ASC"}));
                        return;
                    case 'sort-descending':
                        setSortData((sort) => ({...sort, sortDataList3: "DESC"}));
                        return;
                };
        }
        
    },[iconSortData])

    return (
        <Card style = {[styles.card,{backgroundColor: theme.colors.mainColor}]}>
            <Card.Title title= {title} titleStyle = {styles.title} right={data.length > 1 ? rightTitle : undefined}/>
            
            <Card.Content>
                {loading && <ActivityIndicator animating={true} color={MD2Colors.white} />}
                {!loading && (Page.length === 0 ? 
                     <Text style = {{color: "white"}}>Chưa có thuốc nào</Text>:  
                Page[current - 1].map((value, index) => (
                    <View key = {index} style = {styles.item}>
                        <View 
                            style = {{
                                display: 'flex',
                                width: 100,
                                justifyContent: 'center', 
                                alignItems:'center'
                            }}
                        >
                            <Card.Cover 
                                style = {{width: 80, height: 80,}} 
                                source={value.avatar ? { uri: value.avatar } : require('../../../assets/images.jpeg')}
                            />
                        </View>
                        
                        <View style = {{flexBasis: "100%", marginTop: 5}}>
                            <Title style = {styles.itemTitle}>{value.tenThuoc}</Title>
                            <Text style = {styles.itemText}>ngày sản xuất: {value.NSX}</Text>
                            <Text style = {styles.itemText}>hạn sử dụng: {value.HSD}</Text>
                        </View>
                        <TouchableOpacity
                                style = {styles.detail}
                                // onPress= {() => handleDetail(value.tenThuoc)}
                            >
                                <Text 
                                    style = {{fontSize: 10, padding:1}}
                                >
                                    chi tiết
                                </Text>
                                <Icon 
                                    style = {{color: 'black', padding: 2}}
                                    name="chevron-right"
                                />
                        </TouchableOpacity>
                        <Text style = {styles.pageIndex}>{STT(index)}</Text>
                    </View>
                )))}
                <Card.Actions>
                    {current > 1 && <View style = {{display: "flex", flexDirection: 'row'}}>
                        <Icon
                            name="chevron-double-left" 
                            size={sizeIconNextPage} 
                            onPress={() => setCurrent(1)}
                        />
                        <Icon 
                            name="chevron-left" 
                            size={sizeIconNextPage}  
                            onPress={() => setCurrent(current - 1)}>
                        </Icon> 
                    </View>}
                    {current < Page.length && <View style = {{display: "flex", flexDirection: 'row'}}>
                        <Icon 
                            name="chevron-right" 
                            size={sizeIconNextPage} 
                            onPress={() => setCurrent(current + 1)}
                        />
                        <Icon 
                            name="chevron-double-right" 
                            size={sizeIconNextPage} 
                            onPress={() => setCurrent(Page.length)}
                        />
                    </View>}
                </Card.Actions>
            </Card.Content>
            <View style = {{display:'flex', flexDirection: 'row', padding:10}}>
                {pageIndex}
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 15,
        marginBottom: 15,
        width: 320,
    },
    title: {
        fontWeight: '700', 
        fontSize: 18, 
        color: 'white'
    },
    detail: {
        display: 'flex',
        flexDirection:'row',
        position: 'absolute',
        right: 0,
    },
    item: {
        marginBottom:10,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 290,
        minHeight: 100,
        backgroundColor:'#ECECEC',
        borderRadius: 5,
    },
    itemTitle: {
        display:'flex',
        padding:5,
        width: 150,
        paddingTop:0,
        fontSize: 16,
        flexWrap: 'wrap',
    },
    itemText: {
        fontSize: 12, 
        padding: 5, 
        paddingTop:0,
    },
    pageIndex: {
        padding:8, 
        fontSize: 10,
        position:'absolute', 
        bottom: 0, 
        right:0
    }
});


export default memo(ListItem);