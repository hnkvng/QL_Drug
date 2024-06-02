import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageDrug from "./Component/ImageDrug";
import { StyleSheet } from "react-native";
import FormInput from "./Component/FormInput";

 
const AddDrugScreen = () : React.JSX.Element => {
    return (
        <SafeAreaView style = {styles.container}>
            <ImageDrug/>
            <FormInput/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
})

export default AddDrugScreen;