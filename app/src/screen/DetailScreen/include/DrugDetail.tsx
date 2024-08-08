import { SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet} from "react-native"
import { ComponentJSX, ComponentProps } from "../../../services/type"
import { Text, Title } from "react-native-paper";
import { useMemo, useState, memo } from "react";
import Barcode from '@kichiyaki/react-native-barcode-generator';
import { theme } from "../../../services/theme";
import { DATA } from "..";

interface DetailDrugProps {
    data: DATA,
}

const DetailDrug : ComponentProps<DetailDrugProps> = ({data}) : ComponentJSX => {

    const {
        MST,
        tenThuoc,
        NSX,
        HSD,
        giaBan,
        huongDanSuDung,
        soDangKy,
        hoatChat,
        nongDo,
        baoChe,
        dongGoi,
        tuoiTho,
        congTySx,
        nuocSx,
        diaChiSx,
        congTyDk,
        nuocDk,
        diaChiDk,
        nhomThuoc,
    } = data;

    const [selecDonVi, setSelectDonVi] = useState(0);
    const [focus, setFocus] = useState(giaBan.map((_,index) => index === 0 ? true: false));
    const trangThai = useMemo(() => {
        const dateHSD = new Date(HSD);
        const now = new Date();
        if(dateHSD < now) {
            return 'Thuốc đã hết hạn';
        }
        else if(dateHSD.getMonth() === now.getMonth() 
            && dateHSD.getFullYear() === now.getFullYear()) {
            if(dateHSD.getDate() <= now.getDate() + 30) {
                return 'Thuốc gần hết hạn';
            }
        } else {
            return 'Thuốc còn hạn'
        }
        
    },[HSD])

    const listDetail = useMemo(() => [
        {
            name: 'Trang thái',
            value: trangThai,
        },
        {
            name: 'Số đăng ký',
            value: soDangKy,
        },
        {
            name: 'Ngày sản suất',
            value: NSX,
        },
        {
            name: 'Hạn sử dụng',
            value: HSD,
        },
        {
            name: 'Nhóm thuốc',
            value: nhomThuoc,
        },
        {
            name: 'Hoạt chất',
            value: hoatChat,
        },
        {
            name: 'Nồng độ',
            value: nongDo,
        },
        {
            name: 'Dạng bào chế',
            value: baoChe,
        },
        {
            name: 'Quy cách đóng gói',
            value: dongGoi,
        },
        {
            name: 'Tuổi thọ',
            value: tuoiTho,
        },
        {
            name: 'Công ty đăng ký',
            value: congTyDk,
        },
        {
            name: 'Công ty sản xuất',
            value: congTySx,
        },
        {
            name: 'Dịa chỉ đăng ký',
            value: diaChiDk,
        },
        {
            name: 'Địa chỉ sản xuất',
            value: diaChiSx,
        },
        {
            name: 'Nước đăng ký',
            value: nuocDk,
        },
        {
            name: 'Nước sản xuất',
            value: nuocSx,
        },
        {
            name: 'Hướng dẫn sử dụng',
            value: huongDanSuDung,
        },
    ],[trangThai])

    


    return (
        <SafeAreaView 
            style = {
                {
                    flex:1, 
                    backgroundColor: 'white', 
                    margin: 10,
                    marginTop: 15,
                    marginBottom: 0,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 1.5,
                    borderBottomRightRadius: 1.5,
                }
            }
        >
            <ScrollView>
                <View style = {{ padding: 10,}}>
                    <Title 
                        style = {
                            {
                                textAlign: 'center', 
                                fontWeight: 700
                            }
                        }
                    >
                        {tenThuoc}
                    </Title>
                    <Barcode
                        style={{marginTop: 10,}}
                        height={80}
                        value = {MST}
                        format= {"EAN13"}
                        text= {MST}
                        onError={(err) => console.log(err)}
                        textStyle= {{color: 'black', fontSize: 12, opacity: 0.6}}
                    />
                    <View 
                        style = {
                            {
                                width: '100%',
                                marginTop: 10,
                                padding: 5, 
                                borderTopWidth: 1, 
                                borderBottomWidth: 1,
                                borderColor: 'black'
                            }
                        }
                    >
                        { listDetail.map((item ,index) => 
                                <View 
                                    key={index}
                                    style = {
                                    {
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        justifyContent: 'space-between',
                                        marginTop: 5,
                                        marginBottom: 5,
                                    }
                                }
                                >
                                    <Text>{item.name}</Text>
                                    <Text style = {{width: 140}}>{item.value}</Text>
                                </View>
                            )
                        }
                    </View>
                    <View style = {{
                            display: 'flex', 
                            flexDirection:'column',
                            justifyContent: 'space-between', 
                            margin: 10, 
                            
                    }}>
                        <View
                            style = {
                                {
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    alignItems:'center',
                                    flexWrap: 'wrap',
                                    
                                }
                            }
                        >
                            {giaBan.map((item, index) => 
                                    <TouchableOpacity
                                            key= {index}
                                            style = {
                                                [
                                                    styles.itemDoVi, 
                                                    focus[index] ? {
                                                        borderWidth: 1,
                                                        borderColor: theme.colors.mainColor
                                                    } : {}
                                                ]} 
                                            onPress={() => {
                                                setSelectDonVi(index)
                                                setFocus(() => focus.map((_, indexs) => 
                                                    indexs === index ? true: false))
                                            }}
                                        >
                                        <Text 
                                            style = {
                                                [
                                                    {textAlign: 'center'},
                                                    focus[index] ? {color: theme.colors.mainColor}
                                                    : {}
                                                ]
                                            }
                                        >
                                            {item.donVi}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                        <View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: "100%"}}>
                            <Text style = {{fontSize: 20, fontWeight: 700}}>{giaBan[selecDonVi].giaBan}</Text>
                            <Text style = {{fontSize: 18, fontWeight: 700}}>₫/{giaBan[selecDonVi].donVi}</Text>
                        </View>
                        
                    </View>
                       
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    itemDoVi: {
        margin: 5, 
        padding: 10, 
        minWidth: 50,
        borderWidth: 0.5, 
        borderColor: 'grey', 
        borderRadius: 10,
    }
})

export default memo(DetailDrug);