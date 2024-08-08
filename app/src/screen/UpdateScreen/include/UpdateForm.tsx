import { useCallback, useEffect,useState, memo } from "react";
import { ComponentJSX } from "../../../services/type"
import { EXTERNAL_API_BASE_URLS, EXTERNAL_API_ENDPOINTS } from "../../../services/api";
import FetchApi from "../../../utils/fetchApi";
import { DataSearchDrug, FormDrug} from "../../../services/interface";
import { ADD_FORM, ADD_OR_REDUCE_FORM, UPDATE_FORM, vndMark } from "../../../services/config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useFormikContext } from "formik";
import { getCodeScanScreen } from "../../../redux/selection";
import { StyleSheet, View } from "react-native";
import ImageDrug from "../../../components/ImageDrug";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { List } from "react-native-paper";
import InputApp from "../../../components/InputApp";
import { numberMark } from "../../../services/config";
import AutoDropdown from "../../AddScreen/include/AutoDropdown";
import Button from "../../../components/Button";
import { theme } from "../../../services/theme";
import DatePicker from "../../../components/DatePicker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../services/stackNavigate";
import notifiSlice from "../../../componentsSpecial/Notification/slice";


type PropsNavigation = StackNavigationProp<RootStackParamList,
    'scanScreen'
>;

const UpdateForm = () : ComponentJSX => {
    const {
        values,
        errors,
        handleSubmit,
        handleChange,
        setFieldValue,
        setValues,
    } = useFormikContext<FormDrug>();

    const dispatch = useDispatch();
    const navigation = useNavigation<PropsNavigation>();
    const [expandedBasic, setExpandedBasic] = useState(true);
    const [expandedDetail, seteExpandedDetail] = useState(false);
    const [titleDate, setTitleDate] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [fieldDate, setFieldDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [dataSearch, setDataSearch] = useState<DataSearchDrug[]>([]);

    const barCode =  useSelector(getCodeScanScreen);

    const handleError = notifiSlice.actions.handleError;

    const ACTION_MST = useCallback(() => {
        navigation.navigate('scanScreen')
    },[]);

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

    useEffect(() => {
        if(searchText) {
            const api = new FetchApi(EXTERNAL_API_BASE_URLS.DRUG_BANK_API);
            api.get(EXTERNAL_API_ENDPOINTS.DRUG_BANK.SEARCH_MEDICINE(searchText))
            .then((data) => {
                const listData : DataSearchDrug[] = data.map((value : any) => ({
                    label: `${value.tenThuoc.toLowerCase().trim()} - (SĐK: ${value.soDangKy})`,
                    value: `${value.tenThuoc.toLowerCase().trim()} - (SĐK: ${value.soDangKy})`,
                    tenThuoc: value.tenThuoc.toLowerCase().trim(),
                    soDangKy: value.soDangKy,
                    hoatChat: value.hoatChat,
                    nongDo: value.nongDo,
                    baoChe: value.baoChe,
                    dongGoi: value.dongGoi,
                    tuoiTho:value.tuoiTho,
                    congTySx: value.congTySx,
                    nuocSx: value.nuocSx,
                    diaChiSx: value.diaChiSx,
                    congTyDk: value.congTyDk,
                    nuocDk: value.nuocDk,
                    diaChiDk: value.diaChiDk,
                    nhomThuoc: value.nhomThuoc,
                }))

                setDataSearch(listData)
            })
            .catch(() => {
                dispatch(handleError())
            })
        }
    },[searchText])


    useEffect(() => {
        if(barCode) {
            setFieldValue("MST", barCode);
        }
    },[barCode])

    return (<>
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
            
            enableOnAndroid
            style  = {{
                backgroundColor: "white",
                borderRadius: 10, 
            }}
        >
              <List.Section title="Thông tin thuốc">
                <List.Accordion
                    title="Thông tin cơ bản"
                    left={props => <List.Icon {...props} icon="pill" />}
                    expanded = {expandedBasic}
                    onPress={() => {
                        setExpandedBasic(!expandedBasic)
                        if(expandedDetail)
                            seteExpandedDetail(false);
                        
                    }}
                >
                    <InputApp
                        label= {ADD_FORM.label.MST}
                        value= {values.MST}
                        error= {errors.MST}
                        maxLength= {ADD_FORM.maxLength.MST}
                        inputMode= {ADD_FORM.inputMode.MST}
                        placeholder= {ADD_FORM.placeholder.MST}   
                        mark= {numberMark}
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
                        soDangKy= {values.soDangKy}
                        error= {errors.tenThuoc}
                        data= {dataSearch}
                        setData= {setDataSearch}
                        iconL=  {ADD_FORM.iconLeft.tenThuoc}
                        setSearchText= {setSearchText}
                        handleChange= {handleChange("tenThuoc")}
                        setValues= {setValues}
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
                    {values.giaBan.map((item, index) => (
                        <InputApp
                            key={index}
                            label= {UPDATE_FORM.label.giaBan(item.donVi)}
                            value= {values.giaBan[index].giaBan}
                            error= {errors.giaBan ? errors.giaBan[index].giaBan: undefined}
                            mark= {vndMark}
                            inputMode= {UPDATE_FORM.inputMode.giaBan}
                            placeholder= {UPDATE_FORM.placeholder.giaBan}
                            handleChange= {(value : string) => {
                                values.giaBan[index].giaBan = value;
                                setValues((item) => item)
                            }}
                        />
                    ))}
                    {/*  */}
                    <InputApp
                        label= {ADD_FORM.label.huongDanSuDung}
                        value= {values.huongDanSuDung}
                        inputMode= {ADD_FORM.inputMode.huongDanSuDung}
                        iconL= {ADD_FORM.iconLeft.huongDanSuDung}
                        placeholder= {ADD_FORM.placeholder.huongDanSuDung}
                        multiline= {true}
                        handleChange= {handleChange("huongDanSuDung")}
                    />       
                </List.Accordion>
                <List.Accordion
                    title="Thông tin chi tiết"
                    left={props => <List.Icon {...props} icon="information" />}
                    expanded = {expandedDetail}
                    onPress= {() => {
                        if(expandedBasic)
                            setExpandedBasic(false);
                        seteExpandedDetail(!expandedDetail)
                    }}

                >
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.soDangKy}
                        value= {values.soDangKy}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.nhomThuoc}
                        value= {values.nhomThuoc}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.nongDo}
                        value= {values.nongDo}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.hoatChat}
                        value= {values.hoatChat}
                        multiline= {true}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.baoChe}
                        value= {values.baoChe}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.nuocDk}
                        value= {values.nuocDk}
                        multiline= {true}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.nuocSx}
                        value= {values.nuocSx}
                        multiline= {true}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.congTyDk}
                        value= {values.congTyDk}
                        multiline= {true}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.congTySx}
                        value= {values.congTySx}
                        multiline= {true}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.diaChiDk}
                        value= {values.diaChiDk}
                        multiline= {true}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.diaChiSx}
                        value= {values.diaChiSx}
                        multiline= {true}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.dongGoi}
                        value= {values.dongGoi}
                        multiline= {true}
                    />
                    <InputApp
                        edit= {false}
                        label= {ADD_FORM.label.tuoiTho}
                        value= {values.tuoiTho}
                    />
                </List.Accordion>
              </List.Section>    
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
            name = "Thay đổi"
            mode= "contained"
            disabled= {Object.values(errors).some(text => text)}
            handleClick={handleSubmit}
        />
    </View>
    <DatePicker
        title= {titleDate}
        open= {openDate}
        setOpen= {setOpenDate}
        handleChange= {handleChange(fieldDate)}
    />
</>)
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


export default memo(UpdateForm);