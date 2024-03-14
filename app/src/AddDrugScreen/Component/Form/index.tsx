import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Form, Formik, FormikErrors, FormikValues } from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputField from './InputField';
import { AddSchema } from '../../validation';
import { ScrollView } from 'react-native-gesture-handler';
import FORM_OPTION from './formOption';
import ButtonFormAdd from '../Button';
import { Button, FAB } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import formSlice from './formSlice';
// import { getButton } from '../../../../redux/selection';
import InputDropdown from './inputDrop';


interface FormAddProps {
  values: FormikValues,
  errors: any,
  setValues: (values: any) => any,
  handleChange: (name: string) => any,
  handleBlur: (name: string) => any,
}

const FormAdd: React.FC<FormAddProps>  = ({values, errors, setValues, handleBlur, handleChange}) : React.JSX.Element  => {

    const dispatch = useDispatch();
    
    const reset = formSlice.actions.reset;

    useEffect(() => {
      return () => {
        dispatch(reset())
      }
    },[])
    
    return (
      <KeyboardAwareScrollView style = {styles.container}>
        <ScrollView>
            <InputField 
                key={1}
                label='Mã số sản phẩm'
                textID='MSSP'
                maxLenght = {13}
                errors={errors.MSSP}
                keyboardType = {"number-pad"}
                placeholder='Nhập mã số sản phẩm'
                inputMark="only-numbers"
                values={values}
                handleBlur={(name) => handleBlur(name)}
                handleChange={(name) => handleChange(name)}
            />
            <InputDropdown
                key={2}
                label='Tên sản phẩm'
                values={values}
                textID='name'
                errors={errors.name}
                placeholder='Nhập mã tên sản phẩm'
                setValues={setValues}
            />
            <InputField 
                key={3}
                label='Giá bán'
                textID='priceSell'
                maxLenght = {20}
                errors={errors.priceSell}
                keyboardType = 'number-pad'
                inputMark='money'
                placeholder='đ0'
                values={values}
                handleBlur={(name) => handleBlur(name)}
                handleChange={(name) => handleChange(name)}
            />
            <InputField 
                key={4}
                label='Số lượng'
                textID='quantity'
                maxLenght = {10}
                errors={errors.quantity}
                keyboardType = 'number-pad'
                placeholder='0'
                inputMark='only-numbers'
                values={values}
                handleBlur={(name) => handleBlur(name)}
                handleChange={(name) => handleChange(name)}
            />
            <InputField 
                key={5}
                label='Đơn vị tính'
                textID='unit'
                maxLenght = {10}
                errors={errors.unit}
                keyboardType = 'default'
                placeholder='vd: gói, bịch, chai'
                values={values}
                handleBlur={(name) => handleBlur(name)}
                handleChange={(name) => handleChange(name)}
            />
            <InputField 
                key={6}
                label='Ngày sản xuất'
                textID='NSX'
                errors={errors.NSX}
                keyboardType = 'number-pad'
                placeholder='DD/MM/YYYY'
                values={values}
                inputMark= 'datetime'
                handleBlur={(name) => handleBlur(name)}
                handleChange={(name) => handleChange(name)}
            />
             <InputField 
                key={7}
                label='Hạn sử dụng'
                textID='HSD'
                errors={errors.HSD}
                keyboardType = 'number-pad'
                placeholder='DD/MM/YYYY'
                values={values}
                inputMark= 'datetime'
                handleBlur={(name) => handleBlur(name)}
                handleChange={(name) => handleChange(name)}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
 );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: "100%",
  }
})

export default FormAdd;
   