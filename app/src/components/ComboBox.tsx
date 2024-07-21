
import { ComponentJSX, ComponentProps} from "../services/type";
import { useState } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle} from "react-native";
import DropDown from "react-native-paper-dropdown";

interface ComboBoxProps {
    label : string,
    value? : string,
    placeholder : string, 
    style? : ViewStyle,
    options: any,
    handleChange : any, 
}

const ComboBox : ComponentProps<ComboBoxProps> = ({
    label,
    value,
    placeholder, 
    style,
    options,
    handleChange,
}) : ComponentJSX => {
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    
    return (
        <SafeAreaView style={styles.containerStyle}>
            <DropDown
                dropDownStyle={style}
                label= {label}
                mode= {"outlined"}
                placeholder= {placeholder}
                visible={showMultiSelectDropDown}
                showDropDown={() => setShowMultiSelectDropDown(true)}
                onDismiss={() => setShowMultiSelectDropDown(false)}
                value={value}
                setValue={handleChange}
                list={options}
                multiSelect
            />
        </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      margin: 10,
    },
    spacerStyle: {
      marginBottom: 15,
    },
    safeContainerStyle: {
      flex: 1,
      margin: 20,
      justifyContent: "center",
    },
});

export default ComboBox;

