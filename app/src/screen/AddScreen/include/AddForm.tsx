import { ADD_FORM, PRICE_ADD_FORM } from "../../../services/config";
import { ComponentJSX } from "../../../services/type";
import ImageDrug from "./ImageDrug";
import { StyleSheet, View } from "react-native";
import { useFormikContext } from "formik";
import { FormDrug, FormPrice } from "../../../services/interface";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "../../../components/DatePicker";
import { useState, memo, useCallback, useMemo, useEffect } from "react";
import InputChip from "../../../components/InputChip";
import ModalApp from "../../../components/Modal";
import FormikApp from "../../../components/FormikApp";
import schema from "../validationPriceForm";
import PriceFrom from "./PriceForm";
import Button from "../../../components/Button";
import { theme } from "../../../services/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../services/stackNavigate";
import { useNavigation, useRoute } from "@react-navigation/native";
import InputApp from "../../../components/InputApp";
import AutoDropdown from "../../../components/AutoDropdown";
import FetchApi from "../../../utils/fetchApi";
import { EXTERNAL_API_BASE_URLS, EXTERNAL_API_ENDPOINTS } from "../../../services/api";


type PropsNavigation = StackNavigationProp<RootStackParamList,
    'scanScreen'
>;

const AddForm = () : ComponentJSX => {
    const {
        values,
        errors,
        handleSubmit,
        handleChange,
        setFieldValue,
        setValues,
    } = useFormikContext<FormDrug>();

    const navigation = useNavigation<PropsNavigation>();

    const {params} = useRoute();

    const [check, setCheck] = useState('');
    const [titleDate, setTitleDate] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [fieldDate, setFieldDate] = useState('');
    const [openModalPrice, setOpenModalPrice] = useState(false);
    const [indexEdit, setIndexEdit] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [soDangKy, setSoDangKy] = useState('');
    const [valuesPrice, setValuesPrice] = useState<FormPrice>({
        giaBan: '',
        donVi: '',
        soLuong: ''
    });
    
   
    const lengthGiaBan = useMemo(() => values.giaBan.length, [values.giaBan]);
    
    const ACTION_MST = useCallback(() => navigation.navigate('scanScreen'),[]);

    const ACTION_NSX = useCallback(() => {
        setOpenDate(true)
        setTitleDate(ADD_FORM.placeholder.NSX)
        setFieldDate("NSX")
    },[]);

    const ACTION_HSD = useCallback(() =>  {
        setOpenDate(true)
        setTitleDate(ADD_FORM.placeholder.HSD)
        setFieldDate("HSD")
    },[]);

    const ACTION_GIA_BAN = useCallback(() => {
        setOpenModalPrice(true)
        setValuesPrice({
            giaBan: '',
            donVi: '',
            soLuong: ''
        })
        setIndexEdit(null);
        setCheck(lengthGiaBan > 0 ? values.giaBan[lengthGiaBan - 1].donVi : '')
    },[lengthGiaBan, values.giaBan]);

    const handlePressGiaBan = useCallback((value : any, index : any) => {
        setIndexEdit(index);
        setValuesPrice(value);
        setOpenModalPrice(true);
        setCheck(index > 0 ? values.giaBan[index - 1].donVi : '');
    },[values.giaBan]);

    const handleCloseGiaBan = useCallback((value : any) => {
        setFieldValue("giaBan",(values.giaBan.filter(item  => value !== item)))
    },[values.giaBan]);
    
    const handleSubmitGiaBan = useCallback((value : any) => {
        if(indexEdit !== null) {
            values.giaBan[indexEdit] = value
            setFieldValue('giaBan',[...values.giaBan]);              
        } else {
            setFieldValue('giaBan', [...values.giaBan, value])
        }   
        setOpenModalPrice(false);
    },[values.giaBan, indexEdit]);

    useEffect(() => {
        setValues((data) => ({...data,...params})) 
    },[params])

    useEffect(() => {
        if(searchText) {
            const api = new FetchApi(EXTERNAL_API_BASE_URLS.DRUG_BANK_API);
            api.get(EXTERNAL_API_ENDPOINTS.DRUG_BANK.SEARCH_MEDICINE(searchText))
            .then((data) => {
                const listData = data.map((value : any) => ({
                    label: value.tenThuoc.toLowerCase().trim(), 
                    value: value.tenThuoc.toLowerCase().trim(),
                    soDangKy: value.soDangKy,
                }))

                setDataSearch(() => listData.reduce((accumulator : [], currentValue : any) => {
                    if (accumulator.length > 0) {
                        if(!accumulator.find((item) => item.value == currentValue.value))
                            accumulator.push(currentValue);
                    } else {
                        accumulator.push(currentValue);
                    }
                    return accumulator;
                }, []))
            })
            .catch((data) => {
                console.log(data)
            })
        }
    },[searchText])

    useEffect(() => {
        values.soDangKy = soDangKy;
    },[soDangKy])

    return (
        <>
            <View
                style = {styles.container}
            >
                <View>
                    <ImageDrug 
                        label= {ADD_FORM.label.avatar} 
                        value= {values.avatar}
                        handleChange= {handleChange("avatar")}
                    />
                </View>
                <KeyboardAwareScrollView  
                    style  = {{
                        backgroundColor: "white",
                        borderRadius: 10, 
                    }}
                >
                    <InputApp
                        label= {ADD_FORM.label.MST}
                        value= {values.MST}
                        error= {errors.MST}
                        maxLength= {ADD_FORM.maxLength.MST}
                        inputMode= {ADD_FORM.inputMode.MST}
                        placeholder= {ADD_FORM.placeholder.MST}   
                        iconR= {ADD_FORM.iconRight.MST}
                        iconL= {ADD_FORM.iconLeft.MST}
                        handleChange= {handleChange("MST")}
                        action={ACTION_MST}
                    />
                    <AutoDropdown
                        label= {ADD_FORM.label.tenThuoc}
                        searchText= {searchText}
                        placeholder= {ADD_FORM.placeholder.tenThuoc}
                        value= {values.tenThuoc}
                        error= {errors.tenThuoc}
                        data= {dataSearch}
                        setData= {setDataSearch}
                        iconL=  {ADD_FORM.iconLeft.tenThuoc}
                        setSearchText= {setSearchText}
                        handleChange= {handleChange("tenThuoc")}
                        setSoDangKy= {setSoDangKy}
                    />
                    <InputApp
                        label= {ADD_FORM.label.NSX}
                        value= {values.NSX}
                        error= {errors.NSX}
                        edit= {false}
                        inputMode= {ADD_FORM.inputMode.NSX}
                        iconR= {ADD_FORM.iconRight.HSD}
                        placeholder= {ADD_FORM.placeholder.NSX}
                        handleChange= {handleChange("NSX")}
                        action={ACTION_NSX}
                    />
                    <InputApp
                        label= {ADD_FORM.label.HSD}
                        value= {values.HSD}
                        edit= {false}
                        error= {errors.HSD}
                        inputMode= {ADD_FORM.inputMode.HSD}
                        iconR= {ADD_FORM.iconRight.HSD}
                        placeholder= {ADD_FORM.placeholder.HSD}
                        handleChange= {handleChange("HSD")}
                        action={ACTION_HSD}
                    />
                    
                    <InputChip
                        label= {ADD_FORM.label.giaBan}
                        listItem= {values.giaBan}
                        error= {errors.giaBan}
                        icon= {ADD_FORM.iconRight.giaBan}
                        action= {ACTION_GIA_BAN }
                        handlePress= {handlePressGiaBan}
                        handleClose= {handleCloseGiaBan}
                    />         
                </KeyboardAwareScrollView>      
            </View>
            <View style = {[styles.buttonContainer, {backgroundColor: theme.colors.mainColor}]}>
                <Button
                    style= {{backgroundColor: 'white',}}
                    textColor= "black"
                    name = "Dọn"
                    mode= "contained"
                    disabled= {!Object.values(values).some(text => text.length !== 0)}
                    handleClick={() => setValues(() => ADD_FORM.initValue)}
                />
                <Button
                    style= {{backgroundColor: 'white',}}
                    textColor= "black"
                    name = "Thêm"
                    mode= "contained"
                    disabled= {Object.values(errors).some(text => text)}
                    handleClick={handleSubmit}
                />
            </View>
            <ModalApp
                style = {styles.containerModal}
                visible = {openModalPrice}
                setVisible= {setOpenModalPrice}
                children= {
                    <FormikApp
                        initValue= {valuesPrice ?? PRICE_ADD_FORM.initValue}
                        enableReinitialize= {true}
                        validation= {schema}
                        children= {<PriceFrom nameItem= {check}/>} 
                        handleSubmit={(value : any) => handleSubmitGiaBan(value)}
                    />
                }
            /> 
            <DatePicker
                title= {titleDate}
                open= {openDate}
                setOpen= {setOpenDate}
                handleChange= {handleChange(fieldDate)}
            />
        </>
        
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    buttonContainer: {
        display: 'flex',
        height: 70,
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    containerModal:{
        flex:1,
        marginTop: 100,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 100,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20
    }
})


export default memo(AddForm);
