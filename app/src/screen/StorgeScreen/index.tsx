import React from "react";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../App";
import { SafeAreaView } from "react-native-safe-area-context";
import Infomation from "./Component/Infomation";
import ListItem from "./Component/ListItem";
import { ScrollView } from "react-native-gesture-handler";
const StorgeScreen = () : React.JSX.Element => {
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