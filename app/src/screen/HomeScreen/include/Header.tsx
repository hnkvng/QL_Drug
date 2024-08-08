
import { Image, StyleSheet, View } from "react-native";
import { ComponentJSX } from "../../../services/type";
import { Text } from "react-native-paper";
import { theme } from "../../../services/theme";
import { memo } from "react";

const Header = () : ComponentJSX => {
    return (
        <View style = {styles.container}>
            <View style = {{display: "flex", justifyContent: 'center', flexDirection: 'row', padding: 10}}>
                <View>
                    <Text style = {{color: 'fff', fontSize: 12}}>QUẢN LÝ THUỐC</Text>
                </View>
            </View>
            <View style = {styles.containerAvatar}>
                <View style = {{paddingRight: 10}}>
                    <Image 
                        style = {styles.avatar} 
                        source={require('../../../assets/Y_si.png')}
                    />
                </View>
                <View>
                    <Text style = {{color: 'fff', fontSize: 12}}>Chào mừng,</Text>
                    <Text style = {{color: 'white', fontSize: 16}}>Phạm Thị Thắm</Text>
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: "100%",
        backgroundColor: theme.colors.mainColor,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    containerAvatar: {
        display: 'flex', 
        flexDirection: 'row',
        padding:20, 
        paddingTop: 5,
    },
    app: {
        width: 25,
        height: 25,
        borderRadius: 99,
        opacity: 0.5,
    },
    avatar: {
        width: 45, 
        height: 45,
        borderRadius: 99,
        backgroundColor: 'white'
    }
})

export default memo(Header);