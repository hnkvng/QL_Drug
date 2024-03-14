import React, { useCallback, useEffect, useMemo } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet} from "react-native";
import { useDispatch} from "react-redux";
import buttonOptionSlice from "./buttonOptionSlice";


const ButtonOption  = () : React.JSX.Element => {

    const dispatch = useDispatch();

    const reset = buttonOptionSlice.actions.reset;
    const setButton = buttonOptionSlice.actions.setButton;

    const handlePress = useCallback(() : void => {
        dispatch(setButton({name: 'remove', click: true}))
    },[])

    const handleClose = useCallback(() : void => {
        dispatch(setButton({name: 'restore', click: true}))
    },[])

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    },[])
    return (
    <View style = {styles.container}>
        <Button 
            style = {styles.itemButton} 
            icon="restore"
            mode="outlined" 
            labelStyle={{ color: 'blue' }}
            onPress={handleClose}
        >
          Phục hồi
        </Button>
  
        <Button 
            style = {styles.itemButton} 
            icon= "delete"
            mode="outlined" 
            labelStyle={{ color: 'red' }}
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