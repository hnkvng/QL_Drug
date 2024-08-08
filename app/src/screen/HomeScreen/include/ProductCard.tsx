import { View } from "react-native"
import { ComponentJSX, ComponentProps } from "../../../services/type"
import { Card, Text } from "react-native-paper"
import { useState, memo, useCallback } from "react"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { StyleSheet } from "react-native"
import { theme } from "../../../services/theme"
import Button from "../../../components/Button"
import { PropsNavigation } from "../../../services/stackNavigate"
import { DATA } from "./ProductList"

interface ProductCardProps {
    item: DATA,
    navigation: PropsNavigation,
}
const ProductCard : ComponentProps<ProductCardProps> = ({item, navigation}) : ComponentJSX => {
    
    const { 
        MST,
        avatar,
        tenThuoc,
        soDangKy,
        giaBan,
        dongGoi
    } = item

    const [index, setIndex] = useState(0);

    const handleButton = useCallback(() => {
        navigation.navigate('detailScreen', {MST: MST})
    },[MST])
    
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
                        {giaBan.map((item, i) => {
                            const active = i === index;
                            return (
                                <TouchableOpacity 
                                        key= {i}
                                        style = {
                                            [
                                                styles.itemDoVi, 
                                                active ? {
                                                    borderWidth: 1,
                                                    borderColor: theme.colors.mainColor
                                                } : {}
                                            ]} 
                                        onPress={() => setIndex(i)}
                                    >
                                    <Text 
                                        style = {
                                            [
                                                {textAlign: 'center'},
                                                active ? {color: theme.colors.mainColor}
                                                : {}
                                            ]
                                        }
                                    >
                                        {item.donVi}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
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
                        {giaBan[index].giaBan}
                    </Text>
                    <Text 
                        style = {
                            { 
                                fontSize: 15, 
                                color: theme.colors.mainColor
                            }
                        }
                    >
                        ₫/{giaBan[index].donVi}
                    </Text>
                </ScrollView>
                <ScrollView horizontal>
                    <Text style = {styles.textDongGoi}> {dongGoi}</Text>
                </ScrollView>
            </Card.Content>
            <View style = {styles.containerButton}>
                <Button
                    style= {{backgroundColor: 'grey', margin: 5}}
                    mode= "contained"
                    name="Xem chi tiết"
                    textColor= "white" 
                    handleClick={handleButton} 
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
    containerButton: {
        display:'flex', 
        justifyContent: 'center', 
        padding: 10, 
        paddingTop: 5
    },
    textDongGoi: {
        display: 'flex', 
        marginTop: 10, 
        padding: 5,
        backgroundColor: '#edf0f3', 
        borderRadius: 10
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