import React, { useMemo } from "react";
import { View } from "react-native";
import { Button, FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "../../../../../../../App";
import { InputPlus } from "./slice/inputPlusSlice";

interface ButtonFormProps {
    values: any,
    priceItem: {price: string, unit: string, amount: string}[],
    errors: any,
    hanleSubmit: any,
    hanleClear: any,
    
}

const ButtonForm : React.FC<ButtonFormProps> = ({values, priceItem, errors, hanleClear, hanleSubmit}) : React.JSX.Element => {
    return (
        <View style = {[styles.container, {backgroundColor: theme.colors.mainColor}]}>
            <Button 
                style = {styles.itemButton} 
                icon="broom" 
                mode="outlined" 
                disabled = {!Object.values(values).some(item => item !== '')}
                buttonColor="white"
                textColor="black"
                onPress={() => hanleClear((values : any) => {
                    Object.keys(values).map((key) => {
                        values[key] = '';
                    })
                    return values;
                })}
            >
                Dọn
            </Button>
            
            <Button 
                style = {styles.itemButton} 
                icon="plus-box" 
                mode="outlined" 
                textColor="black"
                buttonColor="white"
                disabled = {!(priceItem.length > 0) || Object.values(errors).some(item => item === '')}
                onPress={hanleSubmit} 
            >
                Thêm
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display:'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 4,
        alignItems: 'center',
    },
    itemButton: {
        width:130,
        margin: 20,
    },

});

export default ButtonForm;