import { View } from "react-native"
import { ComponentJSX, ComponentProps } from "../../../services/type"
import { Card, Text, Title } from "react-native-paper"
import { useState, memo } from "react"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { theme } from "../../../services/theme"
import Button from "../../../components/Button"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../../services/stackNavigate"


type PropsNavigation = StackNavigationProp<RootStackParamList,
    'detailScreen'
>;

interface ProductCardProps {
    id: number,
    avatar: string,
    tenThuoc: string,
    soDangKy: string,
    dongGoi: string,
    giaBan: {
        giaBan: string,
        donVi: string
    }[],
}

const ProductCard : ComponentProps<ProductCardProps> = (
    {
        id,
        avatar,
        tenThuoc,
        soDangKy,
        giaBan,
        dongGoi,
    }
    ) : ComponentJSX => {

    const navigation = useNavigation<PropsNavigation>();
    const [selecDonVi, setSelectDonVi] = useState(0);
    const [focus, setFocus] = useState(giaBan.map((_,index) => index === 0 ? true: false));

    return (
        <Card style = {{width: 200, margin: 10}}>
            <Card.Cover 
                source={avatar ? 
                    { uri: avatar } 
                    : require('../../../assets/imageDrug.jpg')
                }
                style = {{padding: 10}}
            />
            <Card.Content style = {styles.content}>
                <Card.Title
                    title = {tenThuoc}
                    subtitle = {soDangKy}
                />
                <ScrollView horizontal style = {styles.containerDoVi}>
                    <View
                        style = {
                            {
                                display: 'flex', 
                                flexDirection: 'row', 
                                alignItems:'center'
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
                </ScrollView>
                <ScrollView horizontal>
                    <Text 
                        style = {
                            { 
                                fontSize: 17, 
                                fontWeight: 700, 
                                color: theme.colors.mainColor
                            }
                        }
                    >
                        {giaBan[selecDonVi].giaBan}
                    </Text>
                    <Text 
                        style = {
                            { 
                                fontSize: 15, 
                                color: theme.colors.mainColor
                            }
                        }
                    >
                        ₫/{giaBan[selecDonVi].donVi}
                    </Text>
                </ScrollView>
                <ScrollView horizontal>
                    <Text 
                        style = {
                            {
                                display: 'flex', 
                                marginTop: 10, 
                                padding: 5,
                                backgroundColor: '#edf0f3', 
                                borderRadius: 10
                            }
                        }
                        >
                            {dongGoi}
                        </Text>
                </ScrollView>
            </Card.Content>
            <View 
                style = {
                    {
                        display:'flex', 
                        justifyContent: 'center', 
                        padding: 10, 
                        paddingTop: 5
                    }
                }
            >
                <Button
                    style= {{backgroundColor: 'grey', margin: 5}}
                    mode= "contained"
                    name="Xem chi tiết"
                    textColor= "white" 
                    handleClick={() => navigation.navigate('detailScreen', {id: id})} 
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    content: {
        padding:10, 
        height: 250, 
        display: 'flex',
        justifyContent: 'space-between',
    },
    containerDoVi: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#edf0f3',
        borderWidth: 0.2,
        borderColor: '#e5e7eb',
        borderRadius: 10,
    },
    itemDoVi: {
        margin: 5, 
        padding: 10, 
        minWidth: 50,
        borderWidth: 0.5, 
        borderColor: 'grey', 
        borderRadius: 10,
    }
})

export default memo(ProductCard);