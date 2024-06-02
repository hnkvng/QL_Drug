import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, TextInput } from 'react-native-paper';
import { View } from "react-native";
import MaskInput from 'react-native-mask-input';

interface InputProps {
    textID: string,
    label: string,
    value: string,
    edit?: boolean,
    error: string | undefined,
    mark: RegExp[],
    inputMode: "none" | "decimal" | "email" | "numeric" | "search" | "tel" | "text" | "url",
    maxLength: number,
    placeholder: string,
    icon?: string,
    handleChange: any,
    setValues: any,
    action?: any,
}

const Input : React.FC<InputProps> = ({
        textID, label, value, maxLength,
        inputMode, error, placeholder, icon, mark, edit,
        handleChange, setValues, action
    }) : React.JSX.Element => {

    const iconRight = () => {
        if(value !== '') {
            return (
                <TextInput.Icon 
                    icon={"close"}
                    onPress={() => 
                        setValues((values : any)=> ({...values, [textID]: ''}))
                    }
                />
            );
            
        } else {
            if(icon && action) {
                return <TextInput.Icon icon={icon} onPress={() => action()}/>
            }
        }
        
    }

    return (
        <View>
            <TextInput
                style = {{margin: 5}}
                editable = {edit ?? true}
                mode="outlined"
                error= {error ? true : false}
                label={label}
                value={value}
                maxLength={maxLength}
                placeholder={placeholder}
                right = {iconRight()}
                onChangeText={handleChange(textID)}
                render={props => 
                    <MaskInput
                        {...props}
                        inputMode= {inputMode}
                        mask={mark}
                    />
                }
            />
            {error && <Text style = {styles.errorText}>{error}</Text>}
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

export default Input;