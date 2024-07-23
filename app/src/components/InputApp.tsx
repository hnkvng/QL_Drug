import {ChangeEvent, ReactNode, memo, useCallback} from "react";
import { ComponentJSX, ComponentProps, InputModeType} from "../services/type";
import { HelperText, TextInput } from 'react-native-paper';
import { StyleProp, TextStyle, View } from "react-native";
import MaskedTextInput, { Mask} from 'react-native-mask-input';
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { theme } from "../services/theme";

interface InputAppProps {
    style? : StyleProp<TextStyle>,
    label : string,
    value? : string, 
    placeholder? : string, 
    maxLength? : number,
    error? : string, 
    mark?: Mask,
    multiline?: boolean,
    inputMode?: InputModeType,
    edit?: boolean,
    iconR?: IconSource,
    iconL?: IconSource,
    action?: () => void,
    handleChange : (e: string | ChangeEvent<any>) => void, 
}

const InputApp : ComponentProps<InputAppProps>  = ({
    label,
    value, 
    placeholder, 
    maxLength,
    error, 
    mark,
    multiline,
    inputMode = "none",
    edit,
    iconR,
    iconL,
    action,
    handleChange, 
    }) : ComponentJSX => {

    const iconRight = useCallback(() : ReactNode => {
        if(value !== '') {
            return (
                <TextInput.Icon 
                    icon={"close"}
                    onPress={() => 
                        handleChange('')
                    }
                />
            );
            
        } else {
            if(iconR && action) {
                return <TextInput.Icon icon={iconR} onPress={() => action()}/>
            }
        }   
    },[value])

    return (
        <View>
            <TextInput
                mode= 'outlined'
                activeOutlineColor= {theme.colors.mainColor}
                editable = {edit ?? true}
                inputMode= {inputMode}
                style = {{margin: 10}}   
                label= {label}
                value= {value}
                error= {error ? true : false}
                placeholder= {placeholder}
                maxLength= {maxLength}
                onChangeText={(value) => handleChange(value.trim())}
                right = {iconRight()}
                left = {iconL && <TextInput.Icon icon= {iconL} disabled></TextInput.Icon>}
                multiline = {multiline}
                render={props => 
                    <MaskedTextInput
                        {...props}
                        inputMode= {inputMode}
                        mask={mark}
                        
                    />
                }
            />
            <HelperText type="error" visible={error ? true : false}>
                {error}
            </HelperText>
        </View>
    )
}

export default memo(InputApp,);