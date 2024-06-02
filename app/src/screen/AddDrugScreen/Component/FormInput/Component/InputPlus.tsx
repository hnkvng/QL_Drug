import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Chip, IconButton, Text, TextInput } from 'react-native-paper';
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getInputPlus } from "../../../../../../redux/selection";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import inputPlusSlice from "./slice/inputPlusSlice";
import priceUnitSlice from "./slice/priceUnitSlice";

interface InputPlusProps {
    setVisible: any,
}

const InputPlus : React.FC<InputPlusProps> = ({setVisible}) : React.JSX.Element => {

    const dispatch = useDispatch();
    
    const listPriceUnit = useSelector(getInputPlus).listPriceUnit;
    const lengthlistPriceUnit = listPriceUnit.length;
    const setIndexEdit = priceUnitSlice.actions.setIndexEdit;
    const setPriceUnit = priceUnitSlice.actions.setPriceUnit;

    const deleteItemListPriceUnit = inputPlusSlice.actions.deleteItemListPriceUnit;
    
    return (
        <View>
            <TextInput
                style = {{margin: 5}}
                editable = {false}
                error = {lengthlistPriceUnit === 0}
                mode="outlined"
                label= {lengthlistPriceUnit=== 0 ? "Giá bán": ''}
                right = {
                    lengthlistPriceUnit !== 5 
                    ? <TextInput.Icon 
                        icon="plus" 
                        onPress={() => {setVisible(true)}}
                    /> : null
                }
                render={() => listPriceUnit &&
                    <View  style = {{display: 'flex'}}>
                        {listPriceUnit.map((value, index) => 
                            <Chip 
                                key={index}
                                textStyle={{width: 220}}
                                style ={{width: 290, margin: 10}} 
                                icon="cash-multiple" 
                                onPress={() => {
                                    dispatch(setIndexEdit(index));
                                    dispatch(setPriceUnit({price: value.price, unit: value.unit, amount: value.amount}));
                                    setVisible(true);
                                }}
                                closeIcon={ (props) => <IconButton {...props} icon='close'></IconButton>}
                                onClose={() => dispatch(deleteItemListPriceUnit(index))}
                                
                            >
                                
                                Giá: {value.price}₫/{value.unit} - Số lượng: {value.amount}      
                            </Chip>
                        )}
                    </View>
                }
            />
            {lengthlistPriceUnit === 0 && <Text style = {styles.errorText}>Không được để trống!</Text>}
        </View>
        
    );
}

const styles = StyleSheet.create({
    item: {
        
    },
    errorText: {
        color: 'red',
        margin: 5,
    }
})

export default InputPlus;