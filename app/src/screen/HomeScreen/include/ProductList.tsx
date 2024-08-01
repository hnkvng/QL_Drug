import { Text, Title } from "react-native-paper"
import { SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, View } from "react-native"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Database } from "../../../services/db"
import ProductCard from "./ProductCard"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { theme } from "../../../services/theme"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../../services/stackNavigate"

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'drugScreen'
>;

const ProductList = () => {

    const db = useMemo(() => new Database(),[]);
    const navigation = useNavigation<PropsNavigation>();
    
    const [info, setInfo] = useState<{
        id: number,
        avatar: string,
        tenThuoc: string,
        soDangKy: string,
        dongGoi: string,
        giaBan: {
            giaBan: string,
            donVi: string
        }[],
    }[]>([]);

    useFocusEffect(
        useCallback(() => {
            Promise.all([db.getDetail("LIMIT 6") as any, db.getIemPrice(['giaBan', 'donVi', 'Drug_Id']) as any])
            .then(([data1, data2]) => {
            const item1 : {
                id: number,
                avatar: string,
                tenThuoc: string,
                soDangKy: string,
                dongGoi: string,
                giaBan: {
                    giaBan: string,
                    donVi: string
                }[],
            }[] = [];

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
                    id: data1.rows.item(index).id,
                    avatar: data1.rows.item(index).avatar,
                    tenThuoc: data1.rows.item(index).tenThuoc,
                    soDangKy:  data1.rows.item(index).soDangKy,
                    dongGoi: data1.rows.item(index).dongGoi,
                    giaBan: item2.filter((item) => item.Drug_Id === data1.rows.item(index).id),
                })
            }
            setInfo(item1);
        })
        db.getStorage(['*']).then((data : any) => console.log(data.rows.item(0)))
        // db.dropTrigger("changeInfoDrug").then((data) => console.log(data))
        },[])
    )

    return (
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Title style = {styles.title}>Thuốc</Title>
                <TouchableOpacity onPress={() => navigation.navigate('drugScreen')}>
                    <Text style = {{fontSize: 12, padding: 10, marginTop: 20, color: theme.colors.mainColor}}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView style = {{flex: 1}}>
                {
                    info.length > 0 ? <ScrollView horizontal>
                        {info.map((item, index) => (
                            <ProductCard 
                                key={index} 
                                {...item}
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
    title: {
        fontWeight: '500',
        padding: 20,
        paddingBottom: 0,
    },
})

export default ProductList;