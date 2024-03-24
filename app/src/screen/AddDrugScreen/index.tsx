import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import Selection from '../../Component/Selection';

import FaceDrug from './Component/FaceDrug';
import FormAdd from './Component/Form';
import ButtonFormAdd from './Component/Button';

import { 
    getAdd, getFaceDrug, 
    getFormInput,
} from '../../../redux/selection';

import addSlice, { Product } from './addSlice';
import faceDrugSlice from './Component/FaceDrug/faceDrugSlice';
import formSlice from './Component/Form/formSlice';
import loadingSlice from '../../Component/Loading/loadingSlice';
import notifiSlice, { Inform, tempNotifi } from '../../Component/Notifi/notifiSlice';

import { QueueDrug } from '../../../models/drug';
import Realm from 'realm';
import { configDrug } from '../../../models';
import FORM_OPTION from './Component/Form/formOption';
import { Formik } from 'formik';
import { AddSchema } from './validation';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

function AddScreen () : React.JSX.Element {
    
    const {
        MSSP, name, priceSell, 
        unit, quantity, NSX, HSD
      } = FORM_OPTION;

   
    const dispatch = useDispatch();
    const randomId = uuidv4();

    const realm = useMemo(async() => {
        return await Realm.open(configDrug)
    },[]);

    const selectData = useSelector(getFormInput).selectData;
    const faceDrug = useSelector(getFaceDrug);
    const product = useSelector(getAdd).product;

    const setProduct = addSlice.actions.setProduct;
    const setLoading = loadingSlice.actions.setShow;
    const setNotifi = notifiSlice.actions.setShow;
    const resetForm = formSlice.actions.reset;
    const resetImg = faceDrugSlice.actions.reset;
    const reset = addSlice.actions.reset;


    const handleSubmit = ( value : {
        MSSP: string;
        name: string;
        priceSell: string;
        quantity: string;
        unit: string;
        NSX: string;
        HSD: string;
    }) => {
        const price =  value.priceSell.slice(1);
        const symbol = value.priceSell[0];
        dispatch(setLoading(true));
        dispatch(setProduct({
            product: {
                _id: randomId,
                MSSP: parseInt(value.MSSP),
                img: faceDrug.uri,
                name: value.name,
                price: {
                    amount: parseInt(value.quantity),
                    price: price,
                    unit: value.unit.toLowerCase(),
                    symbol: symbol,
                },
                NSX: value.NSX,
                HSD: value.HSD,
                ...selectData
            }
        }))
    }

    const resetAll = useCallback(() : void => {
        dispatch(reset());
        dispatch(resetForm());
        dispatch(resetImg());
    },[])

    const addComplete =useCallback((info : Inform) : void => {
        dispatch(setLoading(false));
        dispatch(setNotifi({
            show:true,
            ...tempNotifi(info.text, info.status)
        }))
    },[])
    
    const addAction = useCallback((schema : Realm, product : Product) : Inform => {
        console.log(product)
        const info : Inform = new QueueDrug().addDrug(schema, product);
        return info;
    },[])


    useEffect(() => {
        if(product) {
            realm
                .then((schema) => {
                    if(product === null) {
                        return;
                    } 
                    else {
                        const info : Inform = addAction(schema, product);
                        if(info.status === 'success') {
                            resetAll();
                            addComplete(info)
                        }
                        else {
                            throw info
                        }
                    } 
                })
                .catch((info : Inform) => {
                    dispatch(setLoading(false));
                    dispatch(setNotifi({
                        show:true,
                        ...tempNotifi('Thêm sản phẩm không thành công','warning')
                    }))
                })
                .catch(() => {
                    dispatch(setLoading(false));
                    dispatch(setNotifi({
                        show:true,
                        ...tempNotifi('Có lỗi xảy ra','error')
                    }))
                })
        }
    },[product])

    useEffect(() => {
        dispatch(setLoading(true));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1500);
        return () => {
            dispatch(reset())
        }
    },[])

    return (
        <SafeAreaView style = {styles.container}>
            <FaceDrug/>
            <Formik
                validationSchema={AddSchema}
                initialValues={{ 
                    MSSP: MSSP.values, 
                    name: name.values, 
                    priceSell: priceSell.values, 
                    quantity: quantity.values, 
                    unit: unit.values,
                    NSX: NSX.values, 
                    HSD: HSD.values,
                }}
                initialErrors={{ 
                    MSSP: MSSP.errors, 
                    name: name.errors, 
                    priceSell: priceSell.errors, 
                    quantity: quantity.errors, 
                    unit: unit.errors,
                    NSX: NSX.errors, 
                    HSD: HSD.errors,
                }}
                onSubmit={value => handleSubmit(value)}
                >
                    {({ values, errors ,  setValues, handleChange, handleBlur, handleSubmit, resetForm}) => (
                        <> 
                            <FormAdd
                                values={values}
                                errors={errors}
                                setValues={setValues}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                            />
                            <ButtonFormAdd
                                values={values}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                handleClear={resetForm}
                            />
                        </>  
                    )}
                </Formik>
            <Selection/>
        </SafeAreaView >  
    )
}
export default AddScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between'
    }
})