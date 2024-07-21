import Options from "./include/HomeOption";
import Ojects from "./include/HomeOjects";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ComponentJSX } from "../../services/type";

const HomeScreen = () : ComponentJSX => {
    return (
        <SafeAreaView style = {styles.container}>
            <Options/>
            <Ojects/>
        </SafeAreaView>   
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        width: "100%",
        height: "100%",
    }
});

export default HomeScreen;