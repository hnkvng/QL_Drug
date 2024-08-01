import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ComponentJSX, DrugItem } from "../../services/type";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Database } from "../../services/db";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Search from "../../components/Search";
import DrugList from "./include/DrugList";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../services/stackNavigate";
import DiablogApp from "../../components/DiablogApp";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { handleDeleteDrug } from "../../componentsSpecial/Notification/slice";

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'addScreen'
>;

const ImpactDrugScreen = () : ComponentJSX => {

    const appDispatch = useAppDispatch();
    const navigation = useNavigation<PropsNavigation>();
    
    const db = useMemo(() => new Database(),[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState<DrugItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [visibleDiablog, setVisibleDiablog] = useState(false);
    const [textDiablog, setTextDiablog] = useState('');
    const [actionDiablog, setActionDiablog] = useState(() => {});

    const getItemDrug = useCallback((searchQuery?: string) => 
        db.getItemDrug(
            ["id", "tenThuoc", "avatar"],
            searchQuery ? `WHERE tenThuoc LIKE '%${searchQuery}%'`: ''
        )
    ,[])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getItemDrug()
        .then((data : any) => {
            const item : DrugItem[] = [];
            for(let index = 0; index < data.rows.length; index++) {
                item.push({...data.rows.item(index), MST: data.rows.item(index).id})
            }
            setData(item);
            setRefreshing(false);
        })
        .catch((error) => {
            console.log(error)
            setRefreshing(false)
        })
    }, []);

    const handleEdit = useCallback((id: number) => {
        navigation.navigate("addScreen",
            {
                MST: id, 
                title: 'Chỉnh sửa thuốc', 
                nameButton: 'Thay đổi'
            }
        )
    },[])

    const handleDelete = useCallback((id: number) => {
        appDispatch(handleDeleteDrug({id: id, refresh: onRefresh}))
    },[])

    useEffect(() => {
        getItemDrug(searchQuery)
        .then((data : any) => {
            const item : DrugItem[] = [];
            for(let index = 0; index < data.rows.length; index++) {
                item.push({...data.rows.item(index), MST: data.rows.item(index).id})
            }
            setData(item);
        })
        .catch((error) => {
            console.log(error)
        })
    },[searchQuery]);

    useFocusEffect(
        useCallback(() => {
            onRefresh();
        },[])
    )

    return (
        <SafeAreaView style = {styles.container}>
            <Search
                value= {searchQuery}
                setValue= {setSearchQuery}
            />
            <FlatList
                data={data}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
                renderItem={(props) => (
                    <DrugList
                        {...props}
                        handleEdit= {handleEdit}
                        handleDelete= {(id : number, name: string) => {
                            const texts = `Bạn có chắc muốn xóa thuốc ${name} mã số ${id} không ?`;

                            setVisibleDiablog(true)
                            setTextDiablog(texts);
                            setActionDiablog(() => () => handleDelete(id));
                        }}
                    />
                )}
            />
            <DiablogApp
                visible = {visibleDiablog}
                title = {"Xóa Thuốc"}
                text = {textDiablog}
                handleAction= {actionDiablog}
                setVisible= {setVisibleDiablog}
            />
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