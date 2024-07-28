import { StyleSheet, View } from "react-native";
import { ComponentJSX, ComponentProps } from "../src/services/type"
import { Text } from "react-native-paper";

interface HeaderTitleProps {
    children: string,
}

const HeaderTitle : ComponentProps<HeaderTitleProps> = ({children}) : ComponentJSX => {
    return (
        <View style = {styles.container}> 
            <Text style = {styles.headerTitle}>{children}</Text>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black'
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    }
})

export default  HeaderTitle;