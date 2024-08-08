import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { ComponentJSX } from "../../services/type";
import SearchDrug from "./include/SearchDrug";
import { useEffect, useMemo, useState } from "react";
import ItemDrug from "./include/ItemDrug";
import { Database } from "../../services/db";
import Cart from "../../componentsSpecial/Cart";
import { DATABASE, MESSAGE } from "../../services/config";
import { useDispatch } from "react-redux";
import notifiSlice from "../../componentsSpecial/Notification/slice";


const SellScreen = () : ComponentJSX => {

    const dispatch = useDispatch();
    const db = useMemo(() => new Database(),[]);

    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [listDrug, setListDrug] = useState<{
        id: number,
        avatar: string,
        tenThuoc: string,   
    }[]>([]);

    const handleError = notifiSlice.actions.handleError;
    

    useEffect(() => {
        db.getItem(['MST', 'avatar', 'tenThuoc'], DATABASE.table.Drug.name,`WHERE tenThuoc LIKE '%${search}%'`)
        .then((data : any) => {
            const item : {
                id: number,
                avatar: string,
                tenThuoc: string,   
            }[] = [];

            for(let index = 0; index < data.rows.length; index++) {
                item.push({
                    id: data.rows.item(index).MST,
                    avatar: data.rows.item(index).avatar,
                    tenThuoc: data.rows.item(index).tenThuoc
                })
            }
            setListDrug(item)
        })
        .catch(() => {
            dispatch(handleError())
        })
    },[search])

    return (
        <SafeAreaView style = {{flex: 1}}>
            <SearchDrug
                value= {search}
                setValue= {setSearch}
                handleFocus= {setFocus}
            />
            {listDrug.length > 0 ? <ScrollView style = {{height: "100%"}}>
                {listDrug.map((item, index) => (
                    <ItemDrug 
                        key= {index}
                        {...item}
                    />
                ))}
            </ScrollView> 
            : <SafeAreaView style = {{flex: 1,}}>
                <Text style = {{textAlign: 'center', color: 'black'}}>Không tìm thấy thuốc nào để bán</Text>
            </SafeAreaView >}
            <SafeAreaView>
                <Cart focusSearch = {focus}></Cart>
            </SafeAreaView>
        </SafeAreaView>
    );
}

export default SellScreen;