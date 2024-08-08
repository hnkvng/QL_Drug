import React, { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from '../../../services/theme'
import { PropsNavigation } from "../../../services/stackNavigate";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Options = () : React.JSX.Element => {
    const [iconSize] = useState(50);

    const navigation = useNavigation<PropsNavigation>();

    return (
        <View>
            <Title style = {styles.title}>Chức năng</Title>
            <View style = {{paddingTop: 10, display: 'flex', flexDirection: 'row', flexWrap:"wrap"}}>
                <View style = {styles.conSurface}>
                    <TouchableOpacity 
                        style={[styles.surface,{backgroundColor: theme.colors.mainColor},]} 
                        onPress={() => navigation.navigate("addScreen")}
                    >
                        <Icon name="plus" size={iconSize} />
                    </TouchableOpacity>
                    <Text style = {{marginTop: 5}}>Thêm</Text>
                </View>
                <View style = {styles.conSurface}>
                    <TouchableOpacity  
                        style={[styles.surface,{backgroundColor: theme.colors.mainColor}]}
                        onPress={() => navigation.navigate("impactScreen")}
                    >
                        <Icon name="swap-horizontal" size={iconSize}/>
                    </TouchableOpacity >
                    <Text style = {{marginTop: 5}}>Xóa/Thay đổi</Text>
                </View>
                <View style = {styles.conSurface}>
                    <TouchableOpacity  
                        style={[styles.surface,{backgroundColor: theme.colors.mainColor}]}
                        onPress={() => navigation.navigate('storageScreen')}
                    >
                        <Icon name="store" size={iconSize}/>
                    </TouchableOpacity >
                    <Text style = {{marginTop: 5}}>Kho Thuốc</Text>
                </View>
                <View style = {styles.conSurface}>
                    <TouchableOpacity  
                        style={[styles.surface,{backgroundColor: theme.colors.mainColor}]}
                        onPress={() => navigation.navigate("sellScreen")}
                    >
                        <Icon name="cart-outline" size={iconSize}/>
                    </TouchableOpacity >
                    <Text style = {{marginTop: 5}}>Bán Thuốc</Text>
                </View>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
        padding: 20,
        paddingBottom: 0,
        paddingLeft: 10,
    },
    conSurface: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems:'center', 
        margin: 10, 
        marginTop: 0,
    },
    surface: {
        elevation: 4,
        padding: 8,
        height: 90,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
    },
})

export default Options;