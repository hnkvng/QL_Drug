import { SafeAreaView, View } from "react-native"
import { useCallback, useMemo, useState, memo} from "react"
import { Database } from "../../../services/db"
import { useFocusEffect } from "@react-navigation/native";
import ItemDrug from "./ItemDrug";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { querySearchDrug } from "../../../redux/selection";
import { Text } from "react-native-paper";
import { ComponentJSX } from "../../../services/type";
import notifiSlice from "../../../componentsSpecial/Notification/slice";

export interface DATA {
    MST: number,
    avatar: string,
    tenThuoc: string,
    soDangKy: string,
    NSX: string,
    HSD: string,
}

const ListDrug = () : ComponentJSX => {

    const dispatch = useDispatch();
    const db = useMemo(() => new Database(),[]);
    const [data, setData] = useState<DATA[]>([]);
    const condition = useSelector(querySearchDrug);

    const handleError = notifiSlice.actions.handleError;
   
    useFocusEffect(
        useCallback(() => {
            db.getDetail(condition).then((data : any) => {
                const item : DATA[] = [];
                for(let index = 0; index < data.rows.length; index++) {
                    item.push({
                        MST: data.rows.item(index).MST,
                        avatar: data.rows.item(index).avatar,
                        tenThuoc: data.rows.item(index).tenThuoc,
                        soDangKy: data.rows.item(index).soDangKy,
                        NSX: data.rows.item(index).NSX,
                        HSD: data.rows.item(index).HSD,
                    })
                }
                setData(item);
            })
            .catch(() => {
                dispatch(handleError())
            })
        },[condition])
    )
    return (
        <SafeAreaView style = {{flex: 1, backgroundColor: 'white'}}>
            {
                data.length > 0 ? <FlatList
                    data={data}
                    renderItem={({item, index}) => (
                        <ItemDrug key={index} item={item}/>
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

export default memo(ListDrug);