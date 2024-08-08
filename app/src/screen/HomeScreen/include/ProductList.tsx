import { Text, Title } from "react-native-paper"
import { SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, View } from "react-native"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Database } from "../../../services/db"
import ProductCard from "./ProductCard"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { theme } from "../../../services/theme"
import { StackNavigationProp } from "@react-navigation/stack"
import { PropsNavigation, RootStackParamList } from "../../../services/stackNavigate"
import { DATABASE } from "../../../services/config"
import { useDispatch } from "react-redux"
import notifiSlice from "../../../componentsSpecial/Notification/slice"

export interface DATA {
    MST: number,
    avatar: string,
    tenThuoc: string,
    soDangKy: string,
    dongGoi: string,
    giaBan: {
        giaBan: string,
        donVi: string
    }[],
};

const ProductList = () => {

    //config
    const dispatch = useDispatch();
    const db = useMemo(() => new Database(),[]);
    const navigation = useNavigation<PropsNavigation>();
    const [tablePrice] = useState(['giaBan', 'donVi', 'Drug_Id']);
    const [limit] = useState(6);
    const [data, setData] = useState<DATA[]>([]);
    const namePrice = DATABASE.table.Price.name;

    const handleError = notifiSlice.actions.handleError;

    useFocusEffect(
        useCallback(() => {

            Promise.all(
                [
                    db.getDetail(`LIMIT ${limit}`) as any, 
                    db.getItem(tablePrice , namePrice) as any
                ])
            .then(([data1, data2]) => {
                const item1 : DATA [] = [];

                const item2 : {
                    giaBan: string,
                    donVi: string,
                    Drug_Id: string,
                }[] = []

                for(let index = 0; index < data2.rows.length; index++) {
                    item2.push({
                        giaBan: data2.rows.item(index).giaBan,
                        donVi: data2.rows.item(index).donVi,
                        Drug_Id: data2.rows.item(index).Drug_Id
                    })
                }
                
                for(let index = 0; index < data1.rows.length; index++) {
                    item1.push({
                        MST: data1.rows.item(index).MST,
                        avatar: data1.rows.item(index).avatar,
                        tenThuoc: data1.rows.item(index).tenThuoc,
                        soDangKy:  data1.rows.item(index).soDangKy,
                        dongGoi: data1.rows.item(index).dongGoi,
                        giaBan: item2.filter((item) => 
                            item.Drug_Id === data1.rows.item(index).MST
                        ),
                    })
                }
                setData(item1);
            })
            .catch(() => {
                dispatch(handleError())
            })
        },[])
    )

    return (
        <SafeAreaView style = {{flex: 1}}>
            <View 
                style = {styles.container}>
                <Title style = {styles.title}>Thuốc</Title>
                <TouchableOpacity onPress={() => navigation.navigate('drugScreen')}>
                    <Text 
                        style = {styles.textAll}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style = {{flex: 1}}>
                {
                    data.length > 0 ? <ScrollView horizontal>
                        {data.map((item, index) => (
                            <ProductCard 
                                key= {index} 
                                item= {item}
                                navigation= {navigation}
                            />
                        ))}
                    </ScrollView>
                    : 
                    <View style = {{display:'flex', alignItems: 'center', padding: 10}}>
                        <Text>Chưa có thuốc nào.Hãy thêm thuốc</Text>
                    </View>
                }
            </SafeAreaView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    textAll: {
        fontSize: 12, 
        padding: 10, 
        marginTop: 20, 
        color: theme.colors.mainColor
    },
    title: {
        fontWeight: '500',
        padding: 20,
        paddingBottom: 0,
        paddingLeft: 10,
    },
})

export default ProductList;