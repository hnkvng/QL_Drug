import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Infomation from "./include/Infomation";
import ListItem from "./include/ListItem";
import { ScrollView } from "react-native-gesture-handler";
import { ComponentJSX, DrugItem, sortData } from "../../services/type";
import { useEffect, useState } from "react";
import { getDBConnection, getDrugItems } from "../../services/db";
import { LIST_DATA } from "../../services/config";

const StorgeScreen = () : ComponentJSX => {
    const [data, setData] = useState<{
        dataList1: DrugItem[],
        dataList2: DrugItem[],
        dataList3: DrugItem[],
    }>({
        dataList1: [],
        dataList2: [],
        dataList3: []
    });

    const [loading, setLoading] = useState<{
        loadingList1: boolean,
        loadingList2: boolean,
        loadingList3: boolean,
    }>({
        loadingList1: false,
        loadingList2: false,
        loadingList3: false,
    });
    const [sortData, setSortData] = useState<{
        sortDataList1: sortData,
        sortDataList2: sortData,
        sortDataList3: sortData,
    }>({
        sortDataList1: "ASC",
        sortDataList2: "ASC",
        sortDataList3: "ASC"
    })

    useEffect(() => {
        setLoading((load) => ({...load, loadingList1: true}));
        const db = getDBConnection();
        db.then((schema) => {
            getDrugItems(schema, sortData.sortDataList1, "WHERE HSD >= DATE('now', '+30 days')")
            .then((data) => {
                    setLoading((load) => ({...load, loadingList1: false}));
                    setData((item) => ({...item, dataList1: data}));
            })
            .catch((data) => {
                console.log(data)
                setLoading((load) => ({...load, loadingList1: false}));
            });
        }) 
    },[sortData.sortDataList1])

    useEffect(() => {
        setLoading((load) => ({...load, loadingList2: true}));
        const db = getDBConnection();
        db.then((schema) => {
            getDrugItems(schema, sortData.sortDataList1, "WHERE HSD <= DATE('now', '+30 days') AND HSD >  DATE('now')")
            .then((data) => {
                    setLoading((load) => ({...load, loadingList2: false}));
                    setData((item) => ({...item, dataList2: data}));
            })
            .catch((data) => {
                console.log(data)
                setLoading((load) => ({...load, loadingList2: false}));
            });
        }) 
    },[sortData.sortDataList2])

    useEffect(() => {
        setLoading((load) => ({...load, loadingList3: true}));
        const db = getDBConnection();
        db.then((schema) => {
            getDrugItems(schema, sortData.sortDataList3, "WHERE HSD <=  DATE('now')")
            .then((data) => {
                    setLoading((load) => ({...load, loadingList3: false}));
                    setData((item) => ({...item, dataList3: data}));
            })
            .catch((data) => {
                console.log(data)
                setLoading((load) => ({...load, loadingList3: false}));
            });
        }) 
    },[sortData.sortDataList3])

    return (
        <ScrollView style = {{flex:1}}>
            <SafeAreaView style = {styles.container}>
                <Infomation/>
                <ListItem
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
                />
            </SafeAreaView >
        </ScrollView>    
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

export default StorgeScreen;