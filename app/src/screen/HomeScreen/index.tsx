import Options from "./include/Option";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ComponentJSX } from "../../services/type";
import Header from "./include/Header";
import { ScrollView } from "react-native-gesture-handler";
import ProductList from "./include/ProductList";

const HomeScreen = () : ComponentJSX => {
    return (
        <SafeAreaView style = {styles.container}>
            <Header/>
            <ScrollView style = {{flex: 1, width: "100%"}}>
                <Options/>
                <ProductList/>
            </ScrollView>
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
    },
    
});

export default HomeScreen;