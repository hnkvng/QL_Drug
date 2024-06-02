import React from "react";
import { Text } from "react-native-paper";
import Options from "./Component/Option";
import Ojects from "./Component/Ojects";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () : React.JSX.Element => {
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