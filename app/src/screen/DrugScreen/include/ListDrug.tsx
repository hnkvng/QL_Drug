import { SafeAreaView, View } from "react-native"
import { useCallback, useEffect, useMemo, useState} from "react"
import { Database } from "../../../services/db"
import { useFocusEffect } from "@react-navigation/native";
import ItemDrug from "./ItemDrug";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { querySearchDrug } from "../../../redux/selection";
import { Text } from "react-native-paper";
import { ComponentJSX } from "../../../services/type";

const ListDrug = () : ComponentJSX => {

    const db = useMemo(() => new Database(),[]);

    const condition = useSelector(querySearchDrug);

    const [listDrug, setListDrug] = useState<{
        id: number,
        avatar: string,
        tenThuoc: string,
        soDangKy: string,
        NSX: string,
        HSD: string,
    }[]>([]);

    useFocusEffect(
        useCallback(() => {
            db.getDetail(condition).then((data : any) => {
                const item = [];
                for(let index = 0; index < data.rows.length; index++) {
                    item.push({
                        id: data.rows.item(index).id,
                        avatar: data.rows.item(index).avatar,
                        tenThuoc: data.rows.item(index).tenThuoc,
                        soDangKy: data.rows.item(index).soDangKy,
                        NSX: data.rows.item(index).NSX,
                        HSD: data.rows.item(index).HSD,
                    })
                }
                setListDrug(item);
            })
        },[condition])
    )
    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: 'white'}}>
            {
                listDrug.length > 0 ? <FlatList
                    data={listDrug}
                    renderItem={({item, index}) => (
                        <ItemDrug key={index} {...item}></ItemDrug>
                    )}
                >
                </FlatList>:
                <View style = {{display: 'flex', alignItems: 'center', padding: 10}}>
                    <Text>Không có thuốc nào được tìm thấy</Text>
                </View>
            }
        </SafeAreaView>
    )
}

export default ListDrug;