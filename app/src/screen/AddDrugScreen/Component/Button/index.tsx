import React, {useMemo, useState } from "react";
import { View } from "react-native";
import { Button, FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useDispatch} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../navigation/stack/rootStackParamlist";
import scanBarSlice from "../../../ScanBarCodeScreen/scanBarSlice";
import FactSelection from "../../../../Component/FactSelection";

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

    const [factSelections, setFactSelections] = useState<{
        show: boolean, 
        nameAction: string, 
        action: (() => void)| null}
    >({show: false, nameAction:'', action: null});

    const buttonSubmit = useMemo(() => {
        return !Object.values(errors).every(item => item === '')
    },[errors]);

    const buttonClear = useMemo(() => {
        return !Object.values(values).some(item => item !== '')
    },[values]);

    const setController = scanBarSlice.actions.setController;

    return (
        <View style = {styles.conButton}>
             <View style = {styles.block}>
                <FAB
                    icon="barcode-scan"
                    style={styles.fab}
                    onPress={() => {
                        navigate.navigate('scanScreen');
                        dispatch(setController('addScreen'));
                    }}
                    color="white"
                />
            </View>  
            <Button 
                style = {styles.itemButton} 
                icon="broom" 
                mode="outlined" 
                disabled = {buttonClear}
                onPress={() => {
                    setFactSelections({
                        show: true, 
                        nameAction: 'Dọn',
                        action:  handleClear
                    })
            }}
            >
                Dọn
            </Button>
            
            <Button 
                style = {styles.itemButton} 
                icon="plus-box" 
                mode="outlined" 
                disabled = {buttonSubmit} 
                onPress={() =>  {
                    setFactSelections({
                        show: true, 
                        nameAction: 'Thêm',
                        action: handleSubmit
                     })
                     setTimeout(() => handleClear(),1500)
                }}
            >
                Thêm
            </Button>
            {factSelections.show && <FactSelection {...factSelections} setAction={setFactSelections}/>}
        </View>
    )
};
export default ButtonFormAdd;

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

});