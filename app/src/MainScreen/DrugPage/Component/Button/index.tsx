import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet} from "react-native";
import { useDispatch} from "react-redux";
import buttonOptionSlice from "./buttonOptionSlice";

interface ButtonOptionProps {
    checkedItems : boolean[],
}

const ButtonOption : React.FC<ButtonOptionProps> = ({checkedItems}) : React.JSX.Element => {

    const dispatch = useDispatch();

    const reset = buttonOptionSlice.actions.reset;
    const setButton = buttonOptionSlice.actions.setButton;

    const handlePress = useCallback(() : void => {
        dispatch(setButton({name: 'remove', click: true}))
    },[])

    const handleClose = useCallback(() : void => {
        dispatch(setButton({name: 'close', click: true}))
    },[])

    const buttonPress = useMemo(() =>{
        return !checkedItems.some((item) => item === true)
    },[checkedItems])

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    },[])
    return (
    <View style = {styles.container}>
        <Button 
            style = {styles.itemButton} 
            icon="close" 
            mode="outlined" 
            labelStyle={{ color: 'grey' }}
            onPress={handleClose}
        >
          Đóng
        </Button>
  
        <Button 
            style = {styles.itemButton} 
            icon= "delete"
            mode="outlined" 
            labelStyle={{ color: buttonPress ? 'grey' : 'red'}}
            disabled = {buttonPress} 
            onPress={handlePress}
        >
            Xóa
        </Button>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: 100,
      display:'flex', 
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor:'white',
      elevation: 20,
      alignItems: 'center',
    },
    itemButton: {
        width:130,
        margin: 20,
    },
})

export default ButtonOption;