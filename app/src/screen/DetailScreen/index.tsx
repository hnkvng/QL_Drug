import { SafeAreaView,  View, ScrollView, StyleSheet} from "react-native";
import { ComponentJSX } from "../../services/type";
import ImageDrug from "./include/ImageDrug";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { theme } from "../../services/theme";
import DetailDrug from "./include/DrugDetail";
import { Database } from "../../services/db";
import { RootStackParamList } from "../../services/stackNavigate";
import Loading from "../../components/Loading";



const DetailScreen = () : ComponentJSX => {
    const {params} = useRoute<RouteProp<RootStackParamList,'detailScreen'>>();

    const db = useMemo(() => new Database(),[]);

    const [data, setData] = useState<{
        id: string,
        avatar: string,
        tenThuoc: string,
        NSX: string,
        HSD: string,
        giaBan: {
            giaBan: string,
            donVi: string
        }[],
        huongDanSuDung: string,
        soDangKy: string,
        hoatChat: string,
        nongDo: string,
        baoChe: string,
        dongGoi: string,
        tuoiTho:string,
        congTySx: string,
        nuocSx: string,
        diaChiSx: string,
        congTyDk: string,
        nuocDk: string,
        diaChiDk: string,
        nhomThuoc: string,
    }>();

    useEffect(() => {
        if(params.id)
            Promise.all(
            [
                db.getDetail(`WHERE D.id = ${params.id}`) as any, 
                db.getIemPrice(['giaBan', 'donVi'], `WHERE Drug_Id = ${params.id}`) as any
            ])
                .then(([data1, data2]) => {
                    let item1 : {
                        id: string,
                        avatar: string,
                        tenThuoc: string,
                        NSX: string,
                        HSD: string,
                        giaBan: {
                            giaBan: string,
                            donVi: string
                        }[],
                        huongDanSuDung: string,
                        soDangKy: string,
                        hoatChat: string,
                        nongDo: string,
                        baoChe: string,
                        dongGoi: string,
                        tuoiTho:string,
                        congTySx: string,
                        nuocSx: string,
                        diaChiSx: string,
                        congTyDk: string,
                        nuocDk: string,
                        diaChiDk: string,
                        nhomThuoc: string,
                    };

                    const item2 : {
                        giaBan: string,
                        donVi: string,
                    }[] = []

                    for(let index = 0; index < data2.rows.length; index++) {
                        item2.push({
                            giaBan: data2.rows.item(index).giaBan,
                            donVi: data2.rows.item(index).donVi,
                        })
                    }
                    
                    
                    for(let index = 0; index < data1.rows.length; index++) {
                        item1 = {
                            id: data1.rows.item(index).id.toString(),
                            avatar: data1.rows.item(index).avatar,
                            tenThuoc: data1.rows.item(index).tenThuoc,
                            NSX: data1.rows.item(index).NSX,
                            HSD: data1.rows.item(index).HSD,
                            giaBan: item2,
                            huongDanSuDung: data1.rows.item(index).huongDanSuDung,
                            soDangKy: data1.rows.item(index).soDangKy,
                            hoatChat: data1.rows.item(index).hoatChat,
                            nongDo: data1.rows.item(index).nongDo,
                            baoChe: data1.rows.item(index).baoChe,
                            dongGoi: data1.rows.item(index).dongGoi,
                            tuoiTho:data1.rows.item(index).tuoiTho,
                            congTySx: data1.rows.item(index).congTySx,
                            nuocSx: data1.rows.item(index).nuocSx,
                            diaChiSx: data1.rows.item(index).diaChiSx,
                            congTyDk: data1.rows.item(index).congTyDk,
                            nuocDk: data1.rows.item(index).nuocDk,
                            diaChiDk: data1.rows.item(index).diaChiDk,
                            nhomThuoc: data1.rows.item(index).nhomThuoc,
                        }
                    }
                    setData(item1);
                })
    },[params])
    if(data) {
        return (
            <SafeAreaView  style = {{ 
                margin: 10, 
                backgroundColor: theme.colors.mainColor, 
                borderRadius: 10,
                height: "97%",
                ...styles.shadow}}>
                <ImageDrug
                    avatar= {data.avatar}
                >
                </ImageDrug>
                <DetailDrug {...data}></DetailDrug>
            </SafeAreaView>
            
        )
    } else {
        return (
            <Loading show = {true}></Loading>
        )
    }
  
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'blue',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})

export default DetailScreen;