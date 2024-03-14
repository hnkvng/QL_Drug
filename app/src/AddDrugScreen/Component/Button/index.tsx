import React, { useCallback, useEffect, useMemo } from "react";
import { View } from "react-native";
import { Button, FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFactSelection, getFormInput } from "../../../../redux/selection";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../App";
import scanBarSlice from "../../../ScanBarCodeScreen/scanBarSlice";
import factSelectionSlice from "../../../../modal/FactSelection/factSelectionSlice";
import notifiSlice from "../../../../modal/Notifi/notifiSlice";

type PropsNavigation = StackNavigationProp<RootStackParamList,"scanScreen">;

interface ButtonFormAddProps {
    handleSubmit: any,
    handleClear: any,
    errors: any,
    values: any,
}

const ButtonFormAdd : React.FC<ButtonFormAddProps> = ({values, errors, handleSubmit , handleClear}) : React.JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigation<PropsNavigation>();

    const resetFact = factSelectionSlice.actions.reset;
    const setNotifi = notifiSlice.actions.setShow;
    const setFactSelection = factSelectionSlice.actions.setShow;
    const setController = scanBarSlice.actions.setController;

    const factSelection = useSelector(getFactSelection);

    const buttonSubmit = useMemo(() => {
        return !Object.values(errors).every(item => item === '')
    },[errors])

    const buttonClear = useMemo(() => {
        return !Object.values(values).some(item => item !== '')
    },[values])

    useEffect(() => {
        if(
            factSelection.choose && 
            factSelection.typeAction === 'addScreen/clear'
        ) {
            handleClear();
            dispatch(resetFact());
            dispatch(setNotifi({
                show: true,
                text: "Dọn thành công",
                iconName: 'broom',
                theme: 'green'
            }))
        }
        if(
            factSelection.choose && 
            factSelection.typeAction === 'addScreen/add'
        ) {
            handleSubmit();
            setTimeout(() => handleClear(),1500)
            dispatch(resetFact());
        }
    },[factSelection])

    return (
        <View style = {styles.conButton}>
             <View style = {styles.block}>
                <FAB
                    icon="barcode-scan"
                    style={styles.fab}
                    onPress={() => {
                        navigate.navigate('scanScreen');
                        dispatch(setController('add'));
                    }}
                    color="white"
                />
            </View>  
            <Button 
                style = {styles.itemButton} 
                icon="broom" 
                mode="outlined" 
                disabled = {buttonClear}
                onPress={() => dispatch(setFactSelection({
                    show: true, 
                    nameAction: 'Dọn',
                    typeAction: 'addScreen/clear'
                }))}
            >
                Dọn
            </Button>
            
            <Button 
                style = {styles.itemButton} 
                icon="plus-box" 
                mode="outlined" 
                disabled = {buttonSubmit} 
                onPress={() => dispatch(setFactSelection({
                    show: true, 
                    nameAction: 'Thêm',
                    typeAction: 'addScreen/add'
                }))}
            >
                Thêm
            </Button>
        </View>
    )
}
export default ButtonFormAdd

const styles = StyleSheet.create({
    conButton: {
        display:'flex', 
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:'white',
        elevation: 20,
        alignItems: 'center',
    },
    block: {
        position: 'absolute',
        right: '43.2%',
        top: -30,
    },
    fab: {
        borderRadius:50,
        backgroundColor:'#8fb5e0',
    },
    itemButton: {
        width:130,
        margin: 20,
    },

})