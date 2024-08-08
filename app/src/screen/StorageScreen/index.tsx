import { SafeAreaView, View } from "react-native";
import { ComponentJSX } from "../../services/type";
import SearchDrug from "./include/SearchDrug";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Database } from "../../services/db";
import { ScrollView } from "react-native-gesture-handler";
import ItemDrug from "./include/ItemDrug";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { PropsNavigation, RootStackParamList } from "../../services/stackNavigate";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { getCodeScanScreen } from "../../redux/selection";
import notifiSlice from "../../componentsSpecial/Notification/slice";
import { Text } from "react-native-paper";
import { DATABASE, MESSAGE } from "../../services/config";


const StorageScreen = () : ComponentJSX => {

    const dispatch = useDispatch();
    const navigation = useNavigation<PropsNavigation>();
    const barcode = useSelector(getCodeScanScreen);

    const handleWarn = notifiSlice.actions.handleWarn;
    const handleError = notifiSlice.actions.handleError;

    const db = useMemo(() => new Database(),[]);
    const [search, setSearch] = useState('');
    const [listDrug, setListDrug] = useState<{
        id: number,
        avatar: string,
        tenThuoc: string,  
        donViTinh: string,
        soLuongTonKho: number, 
    }[]>([]);

    useFocusEffect(
        useCallback(() => {
            Promise.all(
                [
                    db.getItem(['MST', 'avatar', 'tenThuoc'], DATABASE.table.Drug.name,`WHERE tenThuoc LIKE '%${search}%'`) as any,
                    db.getItem(['*'], DATABASE.table.Storage.name) as any,
                ]
            )
        
            .then(([data1, data2]) => {
                const item1 : {
                    id: number,
                    avatar: string,
                    tenThuoc: string,   
                    donViTinh: string,
                    soLuongTonKho: number,
                }[] = [];

                const item2 : {
                    donViTinh: string,
                    soLuongTonKho: number,
                    Drug_Id: number,
                }[] = []

                for(let index = 0; index < data2.rows.length; index++) {
                    item2.push({
                        donViTinh: data2.rows.item(index).donViTinh,
                        soLuongTonKho: data2.rows.item(index).soLuongTonKho,
                        Drug_Id: data2.rows.item(index).Drug_Id,
                    })
                }
                
                for(let index = 0; index < data1.rows.length; index++) {
                    const {soLuongTonKho, donViTinh} = item2.filter((item) => item.Drug_Id ===  data1.rows.item(index).MST)[0];
                    item1.push({
                        id: data1.rows.item(index).MST,
                        avatar: data1.rows.item(index).avatar,
                        tenThuoc: data1.rows.item(index).tenThuoc,
                        donViTinh: donViTinh,
                        soLuongTonKho: soLuongTonKho,
                    })
                }
                setListDrug(item1)
            })
            .catch(() => {
                dispatch(handleError())
            })
        },[search])
    )

    const handleIconRight = () => navigation.navigate('scanScreen')

    useEffect(() => {
        if(barcode) {
            const code = parseInt(barcode);
            if(listDrug.some((item) => item.id === code)) {
                setTimeout(() => {
                    navigation.navigate('addOrReduceScreen', 
                        {
                            MST: parseInt(barcode), 
                        })
                },500);
            } else {
                dispatch(handleWarn('Không tìm thấy thuốc nào'))
            }
            
        }
    },[barcode])

    return (
        <SafeAreaView>
            <SearchDrug
                value= {search}
                setValue= {setSearch}
                handleIconRight={handleIconRight}
            />
            {listDrug.length > 0 ? 
            <ScrollView style = {{height: "100%"}}>
                {listDrug.map((item, index) => (
                    <ItemDrug
                        key= {index}
                        {...item}
                    />
                ))}
            </ScrollView>
            :   <View style = {{display: 'flex', alignItems: 'center', padding: 10}}>
                    <Text>Không tìm thấy thuốc nào trong kho</Text>
                </View>
            }
           
        </SafeAreaView>
    )
}

export default StorageScreen;