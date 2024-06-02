import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Text, Title } from 'react-native-paper';
import { theme } from "../../../../../App";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from "react-native";
import { getDBConnection, getDrugItems } from "../../../../database/db-service";
import { DrugItem } from "../../../../models";


const Page = Array.from({length: 4}, (_, index) => index + 1);

const ListItem = () : React.JSX.Element => {
    const [nameIconTitle, setNameIconTitle] = useState<'sort-ascending' | 'sort-descending'>('sort-ascending');
    const sizeIconNextPage = 30;
    const [DATA, setDATA] = useState<DrugItem[]>([]);
    const db = useMemo(async () => {
        return await getDBConnection()
    },[])

    const [current, setCurrent] = useState(1);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(7);

    const rightTitle = useCallback((props : any) => 
        <Icon {...props} name = {nameIconTitle} onPress={() => handleNameIcon(nameIconTitle)}/>
    ,[nameIconTitle]);

    const page = () => (
        <>
            {current === Page.length && min > 1 &&
                <>
                    <Text style = {{fontSize: 12, marginRight: 5, color: 'white'}}>1</Text>
                    <Text style = {{fontSize: 12, marginRight: 5, color: 'white'}}>...</Text>
                </>
            }
            {Page.map((index) => {
                if(index === current) {
                    return <Text key = {index} style = {{fontSize: 12, marginRight: 5}}>{index}</Text>
                }
                if(index >= min && index <= max || Page.length < 9) {
                    return <Text key = {index} style = {{fontSize: 12, marginRight: 5, color: 'white'}}>{index}</Text>
                }
            })}
            {Page.length > max + 1 && 
            <>
                <Text style = {{fontSize: 12, marginRight: 5, color: 'white'}}>...</Text>
                <Text style = {{fontSize: 12, marginRight: 5, color: 'white'}}>{Page.length}</Text>
            </>}
        </>
       
    )

    const handleNameIcon = useCallback((name : 'sort-ascending' | 'sort-descending' ) => {
        switch(name) {
            case 'sort-ascending':
                setNameIconTitle('sort-descending');
                return;
            case 'sort-descending':
                setNameIconTitle('sort-ascending');
                return;
        };
    },[]);

    useEffect(() => {
        if(current > max) {
            setMax(current);
            setMin(current - 6);
        } else if(current < min) {
            setMax(current + 6);
            setMin(current);
        }
    },[current])

    useEffect(() => {
        if(max > Page.length) {
            setMax(Page.length);
        }   
    },[])

    useEffect(() => {
        db.then((schema) => {
            let arrange : "ASC" | "DESC" = 'ASC';
            switch(nameIconTitle) {
                case 'sort-ascending':
                    arrange = 'ASC';
                    break;
                case 'sort-descending':
                    arrange = 'DESC';
                    break;
            };
            getDrugItems(schema, arrange).then((data) => setDATA(data));
        }) 
    },[nameIconTitle])
     
    return (
        <Card style = {[styles.card,{backgroundColor: theme.colors.mainColor}]}>
            <Card.Title title='Danh sách' titleStyle = {styles.title} right={rightTitle}/>
            <Card.Content>
                {DATA.map((value, index) => (
                    <View key = {index} style = {styles.item}>
                        <View style = {styles.detail}>
                            <Text style = {{fontSize: 10, padding:1}}>chi tiết</Text>
                            <Icon name="chevron-right" style = {{color: 'black', padding: 2}}></Icon>
                        </View>
                        <Title style = {styles.itemTitle}>{value.name}</Title>
                        <Text style = {styles.itemText}>ngày sản xuất: {value.NSX}</Text>
                        <Text style = {styles.itemText}>hạn sử dụng: {value.HSD}</Text>
                        <Text style = {styles.page}>{index + 1}</Text>
                    </View>
                ))}
                <Card.Actions>
                    {current > 1 && <View style = {{display: "flex", flexDirection: 'row'}}>
                        <Icon name="chevron-double-left" size={sizeIconNextPage} onPress={() => setCurrent(1)}></Icon>
                        <Icon name="chevron-left" size={sizeIconNextPage}  onPress={() => setCurrent(current - 1)}></Icon> 
                    </View>}
                    {current < Page.length && <View style = {{display: "flex", flexDirection: 'row'}}>
                        <Icon name="chevron-right" size={sizeIconNextPage} onPress={() => setCurrent(current + 1)}></Icon>
                        <Icon name="chevron-double-right" size={sizeIconNextPage} onPress={() => setCurrent(Page.length)}></Icon>
                    </View>}
                </Card.Actions>
            </Card.Content>
            <View style = {{display:'flex', flexDirection: 'row', padding:10}}>
                {page()}
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
        right:0,
    },
    item: {
        marginBottom:10,
        display:'flex',
        width: 290,
        backgroundColor:'#ECECEC',
        borderRadius: 5,
    },
    itemTitle: {
        padding:5,
        paddingTop:0,
        fontSize: 16
    },
    itemText: {
        fontSize: 12, 
        padding: 5, 
        paddingTop:0,
    },
    page: {
        padding:8, 
        fontSize: 10,
        position:'absolute', 
        bottom: 0, 
        right:0
    }
});


export default ListItem;