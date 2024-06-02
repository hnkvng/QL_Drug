import { Formik, useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getImgDrug, getInputPlus, getValueInput } from "../../../../../redux/selection";
import Input from "./Component/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Masks, createNumberMask } from 'react-native-mask-input';
import ButtonForm from "./Component/ButtonForm";
import DatePickerComonent from "./Component/DatePicker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../navigation/rootStack";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import PriceUnit from "./Component/PriceUnit";
import InputPlus from "./Component/InputPlus";
import * as Yup from 'yup';
import moment from 'moment';
import priceUnitSlice from "./Component/slice/priceUnitSlice";
import inputPlusSlice from "./Component/slice/inputPlusSlice";
import { DrugItem, PriceItem } from "../../../../../models";
import { getDBConnection, saveDrugItems, savePriceItems } from "../../../../../database/db-service";

export interface FormOption {
    id: string,
    label: string,
    value: string,
    maxLength: number,
    mark: RegExp[] | any,
    inputMode: "none" | "decimal" | "email" | "numeric" | "search" | "tel" | "text" | "url"
    placeholder: string,
    iconRight?: string,
    action?: any,
};

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'scanScreen'
>;


const FormInput = () : React.JSX.Element => {

    const dispatch = useDispatch();

    const route = useRoute<RouteProp<RootStackParamList>>();
    const navigation = useNavigation<PropsNavigation>();

    const [open, setOpen] = useState(false);
    const [titleSelectDate, setTitleSelectDate] = useState('');
    const [valueMST, setValueMST] = useState('');
    const [idDate, setIDDate] = useState('');
    const [visible, setVisible] = useState(false);
    
    const resetListPriceUnit = inputPlusSlice.actions.reset;
    const priceItem = useSelector(getInputPlus).listPriceUnit;
    const imgDrug = useSelector(getImgDrug).img;
    
    const schema = Yup.object().shape({
        MST: Yup.string()
            .min(13, 'Mã số sản phẩm phải có 13 chữ số')
            .required('Không được để trống!'),
        name: Yup.string()
            .required('Không được để trống!'),     
        NSX: Yup.string()
        .test('dateIvalid','Ngày sản xuất không hợp lệ',(value) => {
            if(value) {
                return moment(value, 'DD/MM/YYYY', true).isValid();
            }
            return false;
        })
        .required('Không được để trống!'),
        HSD: Yup.string()
        .test('dateIvalid','Ngày sản xuất không hợp lệ',(value) => {
            if(value) {
                return moment(value, 'DD/MM/YYYY', true).isValid();
            }
            return false;
        })
        .required('Không được để trống!'),   
    });

    const formOption : FormOption[] = [
        {
            id: "MST",
            value: valueMST,
            label: "Mã số thuốc",
            maxLength: 13,
            mark: Array.from({length: 13}, () => /\d/),
            inputMode: "decimal",
            placeholder: "Nhập mã số thuốc",
            iconRight: "barcode-scan", 
            action: () => navigation.navigate('scanScreen'),
        },
        {
            id: "name",
            value: '',
            label: "Tên thuốc",
            maxLength: 50,
            inputMode: "text",
            mark: Array.from({length: 50}, () => /[a-z A-Z]/),
            placeholder: "Nhập tên thuốc",
        },
        {
            id: "NSX",
            value: '',
            label: "Ngày sản xuất",
            maxLength: 10,
            inputMode: "numeric",
            mark: Masks.DATE_DDMMYYYY,
            placeholder: "Nhập ngày sản xuất",
            iconRight: 'calendar-month', 
            action: () => {
                setOpen(true);
                setTitleSelectDate('ngày sản xuất');
                setIDDate("NSX");
            },
        },
        {
            id: "HSD",
            value: '',
            label: "Hạn sử dụng",
            maxLength: 10,
            inputMode: "numeric",
            mark: Masks.DATE_DDMMYYYY,
            placeholder: "Nhập hạn sử dụng",
            iconRight: 'calendar-month', 
            action: () => {
                setOpen(true);
                setTitleSelectDate('hạn sử dụng');
                setIDDate("HSD");
            },
        },
    ]

    useEffect(() => {
        return () => {
            dispatch(resetListPriceUnit())
        }
    },[])

    useEffect(() => {
        if(route.params?.code) {
            setValueMST(route.params?.code)
        }
    },[route.params?.code])

    return (
        <Formik
            validationSchema={schema}
            enableReinitialize
            initialValues={Object.fromEntries(formOption.map((item) => [item.id, item.value]))}
            initialErrors={Object.fromEntries(formOption.map((item) => [item.id, item.value ? '' : 'Không được để trống!']))}
            onSubmit={async value => {
                const db = await getDBConnection();
                const drugItem : DrugItem = {
                    MST: parseInt(value.MST),
                    name: value.name.toString(),
                    NSX: value.NSX.toString(),
                    HSD: value.HSD.toString(),
                }
                const price : PriceItem[] = priceItem.map((value) => 
                    ({
                        price: parseInt(value.price), 
                        unit: value.unit.toString(), 
                        amount: parseInt(value.amount)
                    }))
                await saveDrugItems(db, imgDrug, drugItem);
                await savePriceItems(db, drugItem.MST, price);
                
            }}
        >
            {({ values, errors, setValues, handleChange, handleSubmit}) => (
                <>
                    <KeyboardAwareScrollView style = {styles.container}>
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
                        <InputPlus setVisible={setVisible}></InputPlus>
                    </KeyboardAwareScrollView>
                    <ButtonForm 
                        values={values} 
                        priceItem={priceItem}
                        errors={errors} 
                        hanleClear={setValues} 
                        hanleSubmit={handleSubmit}
                    >
                    </ButtonForm>
                    <DatePickerComonent 
                        title = {titleSelectDate} 
                        textID = {idDate}
                        open = {open} 
                        setOpen={setOpen}
                        setValues={setValues}
                    />
                    <PriceUnit
                        visible = {visible}
                        setVisible= {setVisible}
                    />
                </>
                
            )} 
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        backgroundColor: 'white',
        height: '100%',
        borderRadius: 10,
    }
})

export default FormInput;