import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Infomation from "./include/Infomation";
import ListItem from "./include/ListItem";
import { ScrollView } from "react-native-gesture-handler";
import { ComponentJSX } from "../../services/type";


const StorgeScreen = () : ComponentJSX => {
    return (
        <ScrollView style = {{flex:1}}>
            <SafeAreaView style = {styles.container}>
                <Infomation/>
                <ListItem/>
            </SafeAreaView >
        </ScrollView>    
    );
};

const styles = StyleSheet.create({
    container: {
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: "100%",
        height: "100%",
    }
});

export default StorgeScreen;