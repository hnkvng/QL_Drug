import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ComponentJSX } from "../../services/type";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Database } from "../../services/db";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ItemDrug from "./include/ItemDrug";
import { PropsNavigation } from "../../services/stackNavigate";
import DiablogApp from "../../components/DiablogApp";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import notifiSlice, { handleDeleteDrug } from "../../componentsSpecial/Notification/slice";
import { Text } from "react-native-paper";
import { DATABASE, MESSAGE } from "../../services/config";
import SearchApp from "./include/SearchApp";
import { useDispatch, useSelector } from "react-redux";
import { getCodeScanScreen } from "../../redux/selection";
import ChooseEditDelete from "../../components/ChooseEditDelete";

interface DATA {
    MST: number,
    avatar: string,
    tenThuoc: string,
}

const ImpactDrugScreen = () : ComponentJSX => {

    //config
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const navigation = useNavigation<PropsNavigation>();
    const db = useMemo(() => new Database(),[]);
    const [data, setData] = useState<DATA[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [visibleDiablog, setVisibleDiablog] = useState(false);
    const [textDiablog, setTextDiablog] = useState('');
    const [actionDiablog, setActionDiablog] = useState(() => {});
    const [tableDrug] = useState(["MST", "avatar", "tenThuoc", ]);
    const [nameDrug] = useState(DATABASE.table.Drug.name);
    const [barcodeSearch, setBarcodeSearch] = useState<{
        MST: number,
        tenThuoc: string,
    }>()

    const handleWarn = notifiSlice.actions.handleWarn;
    const handleError = notifiSlice.actions.handleError;
    const barcode = useSelector(getCodeScanScreen);
   

    //handle
    const getItemDrug = useCallback((searchQuery?: string) => 
        db.getItem(
            tableDrug,
            nameDrug,
            searchQuery ? 
            `WHERE tenThuoc LIKE '%${searchQuery}%'`: ''
        )
    ,[])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getItemDrug()
        .then((data : any) => {
            const item : DATA[] = [];
            for(let index = 0; index < data.rows.length; index++) {
                item.push({...data.rows.item(index), MST: data.rows.item(index).MST})
            }
            setData(item);
            setRefreshing(false);
        })
        .catch(() => {
            dispatch(handleError())
            setRefreshing(false)
        })
    }, []);

    const handleEdit = useCallback((id: number,) => {
        navigation.navigate('updateScreen', {MST: id})
    },[])

    const handleDelete = useCallback((id: number, name: string) => {
        const texts = `Bạn có chắc muốn xóa thuốc ${name} mã số ${id} không ?`;

        setVisibleDiablog(true);
        setTextDiablog(texts);
        setActionDiablog(() => () =>  appDispatch(handleDeleteDrug({id: id, refresh: onRefresh})));
       
    },[])

    //effect
    useFocusEffect(
        useCallback(() => {
            onRefresh();
        },[])
    )

    useEffect(() => {
        if(barcode)
            db.getItem(tableDrug, nameDrug, `WHERE MST = ${barcode}`)
            .then((data : any) => {
                if(data.rows.length) {
                    const {MST, tenThuoc} = data.rows.item(0);
                    setBarcodeSearch({MST: MST, tenThuoc: tenThuoc});
                    setOpenModal(true)
                } else {
                    dispatch(handleWarn('Không tìm thấy thuốc'))
                }
            })
            .catch(() => {
                dispatch(handleError())
            })
    },[barcode])

    return (
        <SafeAreaView style = {styles.container}>
            <SearchApp
                navigation= {navigation}
                getItemDrug= {getItemDrug}
                setData= {setData}
            />
            {data.length > 0 ? <FlatList
                data={data}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={(props) => (
                    <ItemDrug
                        {...props}
                        handleEdit= {handleEdit}
                        handleDelete= {handleDelete}
                    />
                )}
            /> : 
            <View style = {{display: 'flex', alignItems: 'center', padding: 10}}>
                <Text>Không tìm thấy thuốc nào để chỉnh sửa hoặc xóa</Text>
            </View>
            }
            <DiablogApp
                visible = {visibleDiablog}
                title = {"Xóa Thuốc"}
                text = {textDiablog}
                handleAction= {actionDiablog}
                setVisible= {setVisibleDiablog}
            />
            {barcodeSearch && <ChooseEditDelete   
                show = {openModal}
                setShow= {setOpenModal}
                handleDelete= {() => handleDelete(barcodeSearch.MST, barcodeSearch.tenThuoc)}
                handleEdit= {() => handleEdit(barcodeSearch.MST)}
            />}
        </SafeAreaView >   
    );
};

const styles = StyleSheet.create({
    container: {
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        height: "100%",
    }
});

export default ImpactDrugScreen;