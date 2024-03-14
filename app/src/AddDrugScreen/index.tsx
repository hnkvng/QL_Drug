import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDispatch, useSelector } from 'react-redux';
import Selection from '../../modal/Selection';

import FaceDrug from './Component/FaceDrug';
import FormAdd from './Component/Form';
import ButtonFormAdd from './Component/Button';
import ModalDate from '../../modal/DatePicker';
import LoadingNotifi from '../../modal/Loading';
import Notification from '../../modal/Notifi';

import { 
    getAdd, getDataPicker, getFaceDrug, 
    getFormInput,
    getLoading, 
    getSelection
} from '../../redux/selection';

import addSlice, { Product } from './addSlice';
import faceDrugSlice from './Component/FaceDrug/faceDrugSlice';
import formSlice from './Component/Form/formSlice';
import ListDrugSlice from '../MainScreen/DrugPage/Component/ListDrug/listDrugSlice';
// import buttonSlice from './Component/Button/buttonSlice';
import loadingSlice from '../../modal/Loading/loadingSlice';
import notifiSlice, { Inform, tempNotifi } from '../../modal/Notifi/notifiSlice';

import { QueueDrug, ListAdd } from '../../models/drug';
import Realm from 'realm';
import { configDrug } from '../../models';
import FORM_OPTION from './Component/Form/formOption';
import { Formik } from 'formik';
import { AddSchema } from './validation';


function AddScreen () : React.JSX.Element {
    
    const {
        MSSP, name, priceSell, 
        unit, quantity, NSX, HSD
      } = FORM_OPTION;

    const dispatch = useDispatch();

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
                _id: parseInt(value.MSSP),
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
                    addComplete(info)
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
// const dispatch = useDispatch();

    // const realm = useMemo(async() => {
    //     return await Realm.open(configDrug)
    // },[]);

    // const queue = useMemo(() => new QueueDrug(),[]);

    // const add = useSelector(getAdd);
    // const form = useSelector(getFormInput);
    // const faceDrug = useSelector(getFaceDrug);
    // const button = useSelector(getButton);
    // const inputTarget = useSelector(getInputTarget);
    // const modalLoading = useSelector(getLoading);
    // const modalDate = useSelector(getDataPicker);
    // const modalSelection = useSelector(getSelection);

    // const setRefreshing = ListDrugSlice.actions.setRefreshing;
    // const setInput = formSlice.actions.setInput;
    // const setProduct = addSlice.actions.setProduct;
    // const setButtonSubmit = buttonSlice.actions.setButtonSubmit;
    // const setButtonClear = buttonSlice.actions.setButtonClear;
    // const setLoading = loadingSlice.actions.setShow;
    // const setNotifi = notifiSlice.actions.setShow;
   
    // // const themeNull = formSlice.actions.addThemeInputNull;
    // const resetForm = formSlice.actions.reset;
    // const resetImg = faceDrugSlice.actions.reset;
    // const reset = addSlice.actions.reset;

    // const addAction = useCallback((schema : Realm, product : Product) : Inform => {
    //     const createdAt =  new Date();
    //     const listAdd : ListAdd = {
    //         id: product.id,
    //         img: product.img,
    //         name: product.name,
    //         price: product.price,
    //         NSX: product.NSX,
    //         HSD: product.HSD,
    //         createdAt: createdAt,
    //     }
    //     const info : Inform = queue.addDrug(schema, listAdd);
    //     return info;
    // },[])

    // const addComplete =useCallback((info : Inform) : void => {
    //     dispatch(setButtonSubmit(false));
    //     dispatch(setLoading(false));
    //     dispatch(setNotifi({
    //         show:true,
    //         ...tempNotifi(info.text, info.status)
    //     }))
    //     dispatch(setRefreshing(true));
    // },[])

    // const resetAll = useCallback(() : void => {
    //     dispatch(reset());
    //     dispatch(resetForm());
    //     dispatch(resetImg());
    //     // dispatch(themeNull());
    // },[])

    // const loadingManager : boolean = useMemo(() => {
    //     return [faceDrug.loading, add.loading]
    //             .some((item) => item === true)
    // },[faceDrug.loading, add.loading]);

    // const handleConfirm = useCallback((data : Date) : void => {
    //     // if(inputTarget.target === 'NSX' || inputTarget.target === 'HSD')
    //     // {
    //     //     dispatch(setInput({
    //     //         name:inputTarget.target,
    //     //         value:data.toLocaleDateString(),
    //     //     }))
    //     //     dispatch(setTarget({target:null}))
    //     //     dispatch(resetDate())
    //     // }
    // },[inputTarget.target])

    // useEffect(() => {
        // if(button.submit)
        // {
        //     const price =  form.input[4].value.slice(1);
        //     const symbol = form.input[4].value[0];
        //     dispatch(setLoading(true));
        //     dispatch(setProduct({
        //         product: {
        //             id: parseInt(form.input[0].value),
        //             img: faceDrug.uri,
        //             name: form.input[1].value,
        //             price: {
        //                 amount: parseInt(form.input[2].value),
        //                 price: price,
        //                 unit: form.input[3].value,
        //                 symbol: symbol,
        //             },
        //             NSX: form.input[5].value,
        //             HSD: form.input[6].value,
        //         }
        //     }))
        // }
        
    //     if(button.clear) {
    //         resetAll();
    //         dispatch(setLoading(true));
    //         setTimeout(() => {
    //             dispatch(setButtonClear(false))
    //             dispatch(setLoading(false))
    //             dispatch(setNotifi({
    //                 show:true,
    //                 text:'dọn thành công',
    //                 theme:'pink',
    //                 iconName:'television-shimmer',
    //             }))
    //         },2000);
    //     }
    // },[button.submit, button.clear])

    // useEffect(() => {
    //     dispatch(setLoading(loadingManager))
    // },[loadingManager])

    // useEffect(() => {
    //     realm
    //     .then((schema) => {
    //         if(add.product === null) {
    //             return;
    //         } 
    //         else {
    //             const info : Inform = addAction(schema, add.product);
    //             if(info.status === 'success') {
    //                 resetAll();
    //                 addComplete(info)
    //             }
    //             else {
    //                 throw info
    //             }
    //         } 
    //     })
    //     .catch((info : Inform) => {
    //         addComplete(info)
    //     })
    //     .catch(() => {
    //         dispatch(setButtonSubmit(false));
    //         dispatch(setLoading(false));
    //         dispatch(setNotifi({
    //             show:true,
    //             ...tempNotifi('Có lỗi xảy ra','error')
    //         }))
    //     })
    // },[add.product])

    // useEffect(() => {
    //     dispatch(setLoading(true));
    //     setTimeout(() => {
    //         dispatch(setLoading(false));
    //     },1500)
    //     return () => {
    //         dispatch(reset());
    //     }
    // },[])