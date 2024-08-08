import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ComponentJSX, ComponentProps } from "../../../services/type";
import InputApp from "../../../components/InputApp";
import { useFormikContext } from "formik";
import { FormAddOrReduce } from "../../../services/interface";
import { ADD_OR_REDUCE_FORM, numberMark } from "../../../services/config";
import ComboBox from "../../../components/ComboBox";
import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "react-native";
import Button from "../../../components/Button";
import { theme } from "../../../services/theme";
import { Text } from "react-native-paper";
import { useEffect, useMemo, useState } from "react";


interface AddOrReduceFormProps {
    listHeSo?: {
        label: string,
        value: string,
    }[]
}

const AddOrReduceForm : ComponentProps<AddOrReduceFormProps> = ({
    listHeSo,
    }) : ComponentJSX => {
    const {
        values,
        errors,
        handleSubmit,
        handleChange,
        setFieldValue,
        setValues,
    } = useFormikContext<FormAddOrReduce>();

    const chuThich = useMemo(() => {
        if(listHeSo && values.donVi) {
            const {label, value} = listHeSo.filter((item) => item.value === values.donVi)[0];
            return <Text style = {{padding: 10, color: theme.colors.mainColor}}>{label} = {value} {listHeSo[listHeSo.length - 1].label}</Text>
        }
    },[values.donVi, listHeSo])

    useEffect(() => {
        if(values.soLuong && !parseInt(values.soLuong)) {
            setFieldValue('soLuong','1');
        }
    },[values.soLuong])

    return (
        <SafeAreaView style = {{flex: 1}}>
            <KeyboardAwareScrollView    
                enableOnAndroid
            >
                <InputApp
                    label= {ADD_OR_REDUCE_FORM.label.soLuong}
                    placeholder= {ADD_OR_REDUCE_FORM.placeholder.soLuong}
                    inputMode= {ADD_OR_REDUCE_FORM.inputMode.soLuong}
                    maxLength= {ADD_OR_REDUCE_FORM.maxLength.soLuong}
                    error= {errors.soLuong}
                    value= {values.soLuong}
                    mark= {numberMark}
                    handleChange={handleChange('soLuong')}
                />
                <View style = {{padding: 10,}}>
                    {listHeSo && <ComboBox
                        placeholder= {ADD_OR_REDUCE_FORM.placeholder.donVi}
                        options= {listHeSo}
                        handleChange= {handleChange('donVi')}
                    />}
                    {chuThich}
                </View>
                <View style = {{padding: 10,}}>
                    <ComboBox
                        placeholder= {ADD_OR_REDUCE_FORM.placeholder.themBot}
                        options= {
                            [
                                {
                                    label: 'Thêm',
                                    value: 'Thêm'
                                },
                                {
                                    label: 'Bớt',
                                    value: 'Bớt'
                                }
                            ]
                        }
                        handleChange={handleChange('themBot')}
                    />
                </View>
               
               
            </KeyboardAwareScrollView>
            <View style = {[styles.buttonContainer, {backgroundColor: theme.colors.mainColor}]}>
                <Button
                    style= {{backgroundColor: 'white', width: "90%"}}
                    textColor= "black"
                    name = {values.themBot || 'Hãy chọn thêm hoặc bớt'}
                    mode= "contained"
                    disabled= {!Object.values(values).every(text => text)}
                    handleClick={handleSubmit}
                />
            </View>
        </SafeAreaView>
       
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        height: 70,
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center'
    },
})


export default AddOrReduceForm;