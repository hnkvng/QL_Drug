import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Infomation from "./include/Infomation";
import ListItem from "./include/ListItem";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { ComponentJSX, DrugItem, sortData } from "../../services/type";
import { useEffect, useState } from "react";
import { Database, getDBConnection, getItems } from "../../services/db";
import { LIST_DATA } from "../../services/config";
import { useNavigation } from "@react-navigation/native";
import SearchScreen from "../SearchScreen";
import { Icon, Searchbar } from "react-native-paper";
import DrugList from './include/DrugList'
const DrugScreen = () : ComponentJSX => {

    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState<DrugItem[]>([]);

    useEffect(() => {
        // setLoading((load) => ({...load, loadingList1: true}));
        const db = new Database();
        db.getItemDrug(searchQuery ? `WHERE tenThuoc LIKE '%${searchQuery}%'`: '')
        .then((data) => {
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
    
    return (
        <SafeAreaView style = {styles.container}>
            <Searchbar
                style = {{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    margin: 20,
                    height: 50,
                }}
                cursorColor="black"
                placeholder="Search..."
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
                <FlatList
                data={data}
                renderItem={(props) => (
                    <DrugList
                        {...props}
                    />
                )}
            />
            {/* <ListItem
                name= "list1"
                title= {LIST_DATA.title.list1}
                loading= {loading.loadingList1}
                data= {data.dataList1}
                setSortData={setSortData}
            />
            <ListItem
                name= "list2"
                title= {LIST_DATA.title.list2}
                loading= {loading.loadingList2}
                data= {data.dataList2}
                setSortData={setSortData}
            />
            <ListItem
                name= "list3"
                title= {LIST_DATA.title.list3}
                loading= {loading.loadingList3}
                data= {data.dataList3}
                setSortData={setSortData}
            /> */}
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

export default DrugScreen;