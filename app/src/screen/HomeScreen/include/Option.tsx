import React from "react";
import { Title } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { theme } from '../../../services/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../services/stackNavigate";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

type PropsNavigation = StackNavigationProp<RootStackParamList,
    | "impactScreen"
    | "addScreen"
    | "sellScreen"
>;

const Options = () : React.JSX.Element => {
    const iconSize = 50;

    const navigation = useNavigation<PropsNavigation>();


    return (
        <View>
            <View>
                <Title style = {styles.title}>Chức năng</Title>
            </View>
            <View style = {{padding: 15, display: 'flex', flexDirection: 'row', flexWrap:"wrap"}}>
                <View style = {styles.conSurface}>
                    <TouchableOpacity 
                        style={[styles.surface,{backgroundColor: theme.colors.mainColor}]} 
                        onPress={() => navigation.navigate("addScreen",{title: 'Thêm thuốc', nameButton: 'Thêm'})}
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