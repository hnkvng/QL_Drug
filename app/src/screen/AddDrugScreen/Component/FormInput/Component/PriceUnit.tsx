import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import * as Yup from 'yup';
import { FormOption } from '..';
import { Masks, createNumberMask } from 'react-native-mask-input';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from './Input';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import inputPlusSlice from './slice/inputPlusSlice';
import { getInputPlus, getPriceUnit } from '../../../../../../redux/selection';
import priceUnitSlice from './slice/priceUnitSlice';
import { useFocusEffect } from '@react-navigation/native';


interface PriceUnitProps {
    visible: boolean,
    setVisible: any,
}

const vndMark = createNumberMask({
  delimiter: '.',
  separator: '',
  precision: 0,
})


const PriceUnit : React.FC<PriceUnitProps> = ({visible, setVisible}) : React.JSX.Element => {

  const dispatch = useDispatch();

  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const listPriceUnit = useSelector(getInputPlus).listPriceUnit;
  const {price, unit, amount, indexEdit} = useSelector(getPriceUnit);
  const itemPriceUnit = listPriceUnit[listPriceUnit.length - 1];
  
  const setListPriceUnit = inputPlusSlice.actions.setListPriceUnit;
  const reset = priceUnitSlice.actions.reset;

  const schema = Yup.object().shape({
    price: Yup.string()
      .test('maxValue','Số tiền nằm trong khoảng (1 - 999999999)', (value) => {
        if(value) {
          const price = parseInt(value?.replaceAll('.',''));
          if(price > 0 && price < 1000000000) {
            return true;
          }
        }
      })
      .required('không được để trống!'),
    unit: Yup.string()
      .test('notEqual','đơn vị không được trùng nhau', (text) => {
        if(text && listPriceUnit.length > 0 && indexEdit === null) {
          if(!listPriceUnit.some((value) => value.unit === text)) {
            return true;
          }
        } else {
          return true;
        }
        
      })
      .required('không được để trống!'),
    amount: Yup.string().required('không được để trống!'),
  });

  const formOption : FormOption[] = [
    {
      id: "price",
      label: "Giá bán",
      value: price,
      maxLength: 50,
      mark: vndMark,
      inputMode: "decimal",
      placeholder: "Nhập giá bán",
    },
    {
      id: "unit",
      value: unit,
      label: "Đơn vị",
      maxLength: 50,
      mark: Array.from({length: 50}, () => /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u),
      inputMode: "text",
      placeholder: "Nhập giá bán",
    },
    {
      id: "amount",
      value: amount,
      label: listPriceUnit.length > 0 && indexEdit === null ? `Số lượng/${itemPriceUnit.unit}` : "Số lượng",
      maxLength: 50,
      mark: Array.from({length: 50}, () => /[0-9]/),
      inputMode: "decimal",
      placeholder: "Nhập số lượng",
    },
  ]

  const hanleAmount = (value : any, amount : any) => {
    value.amount = (value.amount*amount).toString();
    return value;
  };

  
  return (
    <Modal visible={visible} onDismiss={() => {
      hideModal();
      dispatch(reset());
    }} contentContainerStyle={containerStyle}>
         <Formik
            validationSchema={schema}
            initialValues={Object.fromEntries(formOption.map((item) => [item.id, item.value]))}
            initialErrors={Object.fromEntries(formOption.map((item) => [item.id,item.value ? '' : 'Không được để trống!']))}
            onSubmit={value => {
              if(listPriceUnit.length > 0 && indexEdit === null) {
                hanleAmount(value, itemPriceUnit.amount)
              }
              dispatch(setListPriceUnit(
                {
                  indexEdit: indexEdit, 
                  value: {
                    price: value.price,
                    unit: value.unit,
                    amount: value.amount,
                  }
                }));
              dispatch(reset());
              setVisible(false);
            }}
        >
            {({ values, errors, setValues, handleChange, handleSubmit, resetForm}) => (
                  <View style = {styles.container}>
                      {formOption.map((item, index) => 
                          <Input
                              key= {index}
                              textID= {item.id}
                              label= {item.label}
                              value= {values[item.id]}
                              error= {errors[item.id]}
                              mark={item.mark}
                              inputMode={item.inputMode}
                              maxLength={item.maxLength}
                              placeholder= {item.placeholder}
                              icon= {item.iconRight}
                              handleChange= {handleChange}
                              setValues={setValues}
                              action={item.action}
                          />
                      )}
                      <Button 
                        icon="plus"
                        mode="outlined" 
                        disabled = {!Object.values(errors).every(item => item === '')}
                        onPress={() => handleSubmit()}
                      >
                        Thêm
                      </Button>
                  </View>
                  
            )} 
        </Formik>   
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
      // display: 'flex',
      backgroundColor: 'white',
      // height: '100%',
      borderRadius: 10,
  }
})

export default PriceUnit;