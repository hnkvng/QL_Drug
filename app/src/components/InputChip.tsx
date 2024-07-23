import React, {memo} from "react";
import { StyleSheet } from "react-native";
import { Chip,HelperText, IconButton, Text } from 'react-native-paper';
import { View } from "react-native";
import { ComponentJSX, ComponentProps } from "../services/type";
import { TextInput } from "react-native-paper";
import { FormPrice } from "../services/interface";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

interface InputChipProps {
    listItem: FormPrice[],
    error?: any,
    label: string,
    icon?: IconSource,
    iconL?: IconSource,
    action: any,
    handleClose: any,
    handlePress: any
}

const InputChip : ComponentProps<InputChipProps> = ({
    listItem,
    label, 
    error,
    iconL,
    icon,
    action,
    handlePress,
    handleClose,
    }) : ComponentJSX => {

    return (
        <View  style = {{display: 'flex'}}>
            <TextInput
                style = {{margin: 10}}
                editable = {false}
                error= {error ? true : false}
                mode= "outlined"
                label= {listItem.length > 0 ? '' : label}
                left = {iconL && <TextInput.Icon icon= {iconL} disabled></TextInput.Icon>}
                right = {
                    listItem.length < 5 
                    ? <TextInput.Icon 
                        icon="plus" 
                        onPress={action}
                    /> : null
                }
                render={() => listItem.length > 0 &&
                    listItem.map((value: FormPrice, index : any) => 
                        <Chip 
                            key={index}
                            textStyle={{width: 220}}
                            style ={{width: 290, margin: 10}} 
                            icon= {icon} 
                            onPress= {() => handlePress(value, index)}
                            onClose={() => handleClose(value)}
                        >
                            Giá: {value.giaBan}₫/{value.donVi} - Số lượng: {value.soLuong}      
                        </Chip>
                )}
            >
            </TextInput>
            <HelperText type="error" visible={error ? true : false}>
                {error}
            </HelperText>
        </View>
    );
}


export default memo(InputChip);