import { FormikValues } from "formik";
import React, { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { TextInputMask } from 'react-native-masked-text'
import { StyleSheet, View } from "react-native";

interface InputFieldProps {
    label: string,
    errors: any,
    textID: string,
    maxLenght?: number | undefined,
    keyboardType : "number-pad" | "default" ,
    values: FormikValues,
    placeholder: string,
    inputMark?: "money" | "datetime" | "only-numbers",
    handleChange: (name: string) => any,
    handleBlur: (name: string) => any,
}

const InputField : React.FC<InputFieldProps> = (
    {
        label, errors, maxLenght,textID,
        values, placeholder ,keyboardType, 
        handleChange, handleBlur, inputMark
    }) 
    : React.JSX.Element  => {

    const renderInputMark = (props : any) => {
        switch (inputMark) {
            case "only-numbers":
                return (
                    <TextInputMask
                        {...props}
                        type= {inputMark}
                    />
                )
            case 'money':
                return (
                    <TextInputMask
                        {...props}
                        type= {inputMark}
                        options={{
                            precision: 0, 
                            separator: ',',
                            delimiter: '.', 
                            unit: '₫', 
                        }}
                    />
                )
            case 'datetime':
                return (
                    <TextInputMask
                        {...props}
                        type= {inputMark}
                        options={{
                            format:'DD-MM-YYYY'
                        }}
                    />
                )
        }
    }
    return (
        <View>
             <TextInput
                style = {{margin:5}}
                label={label}
                mode='outlined'
                maxLength= {maxLenght}
                keyboardType= {keyboardType}
                error = {errors}
                placeholder={placeholder}
                onChangeText={handleChange(textID)}
                onBlur={handleBlur(textID)}
                value={values[textID]}
                render={inputMark ? (props) => renderInputMark(props) : undefined}
            />
            {errors && <Text style = {styles.errorText}>{errors}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        margin: 5,
    }
})
export default InputField;