import {Suspense, lazy, useCallback, useLayoutEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { ComponentJSX } from "../../services/type";
import FormikApp from "../../components/FormikApp";
import { ADD_FORM } from "../../services/config";
import schema from "./validateAddForm";
import Loading from "../../components/Loading";
import { Database} from "../../services/db";
import { FormDrug, FormPrice } from "../../services/interface";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../services/stackNavigate";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { handleAddDrug, handleUpdateDrug } from "../../componentsSpecial/Notification/slice";

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'addScreen'
>;

const AddForm = lazy(() => import('./include/AddForm'));

const AddScreen = () : ComponentJSX => {

    const appDispatch = useAppDispatch();

    const [show, setShow] = useState(true);

    const navigation = useNavigation<PropsNavigation>();
    const {params} = useRoute<RouteProp<RootStackParamList,'addScreen'>>();
    const [dataChange, setDataChange] = useState<undefined | FormDrug>();

    const handleSubmit = useCallback((value : FormDrug, handle: any) => {
        appDispatch(handleAddDrug(
            {
                formDrug: value, 
                resetForm: () => handle.setValues(() => ADD_FORM.initValue)
            }
        )) 
    },[])

    const handleChange = useCallback((value : FormDrug) => {
        if(params.MST && dataChange)
        {
            appDispatch(handleUpdateDrug(
                {
                    id: params.MST, 
                    soDangKyInit: dataChange.soDangKy, 
                    giaBanInit: dataChange.giaBan,
                    formDrug: value,
                    goBack: () => navigation.goBack(),
                }
            ))
        }
    },[dataChange])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: params.title,
        })
    },[params])

    useLayoutEffect(() => {
        if(params.MST) {
            const db = new Database();
            Promise.all([
                db.getDetail(`WHERE D.id = ${params.MST}`) as any,
                db.getIemPrice(["giaBan", "donVi", "soLuong"],`WHERE Drug_Id = ${params.MST}`) as any
            ])
            .then(([dataDetail, dataPrice]) => {
                const itemDetail = dataDetail.rows.item(0);
                const itemPrice = dataPrice.rows.item;

                const item : FormPrice[] = [];
                for(let index = 0; index < dataPrice.rows.length; index++) {
                    item.push({...(itemPrice(index)), soLuong: itemPrice(index).soLuong.toString()})
                }
                const formAdd : FormDrug = {
                    ...itemDetail, 
                    MST: itemDetail.id.toString(), 
                    giaBan: item,
                }
                setDataChange(formAdd)
            })
            .catch((error) => {
                console.log(error)
            });  
        }
    },[params.MST])

    if(show) {
        setTimeout(() => setShow(false),500)
        return (
            <Loading show = {true}/>
        )
    } else {
        return ( 
            <SafeAreaView style = {styles.container}>
                <Suspense fallback={<Loading show = {true}/>}>
                    <FormikApp
                        initValue={dataChange ? dataChange: ADD_FORM.initValue}
                        validation={schema}
                        handleSubmit={(value: any, handle: any) => {
                            switch (params.nameButton) {
                                case "Thêm":
                                    return handleSubmit(value, handle)
                                case "Thay đổi":
                                    return handleChange(value)
                            }
                        }}
                        children={
                            <AddForm 
                                nameButton= {params.nameButton}
                            />
                        }
                    />
                </Suspense>
            </SafeAreaView>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
})

export default AddScreen;