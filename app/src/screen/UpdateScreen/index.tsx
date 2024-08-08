import { Suspense, useCallback, useMemo, useState } from "react";
import { ComponentJSX } from "../../services/type";
import Loading from "../../components/Loading";
import { SafeAreaView } from "react-native";
import FormikApp from "../../components/FormikApp";
import UpdateForm from "./include/UpdateForm";
import { DATABASE, MESSAGE, UPDATE_FORM } from "../../services/config";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { FormDrug } from "../../services/interface";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../services/stackNavigate";
import { Database } from "../../services/db";
import notifiSlice, { handleUpdateDrug } from "../../componentsSpecial/Notification/slice";
import { StackNavigationProp } from "@react-navigation/stack";
import schema from "./validateUpdateFrom";
import { useDispatch } from "react-redux";

type PropsNavigation = StackNavigationProp<RootStackParamList>;

const UpdateScreen = () : ComponentJSX => {
    
    
    const db = useMemo(() => new Database(),[]);
    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const navigation = useNavigation<PropsNavigation>();
    const {params} = useRoute<RouteProp<RootStackParamList, 'updateScreen'>>();
    
    const [show, setShow] = useState(true);
    const [dataForm, setDataForm] = useState<FormDrug>();

    const handleError = notifiSlice.actions.handleError;

    const handleSubmit = useCallback((value : FormDrug) => {
        if(dataForm)
        appDispatch(handleUpdateDrug(
            {
                MSTInit: params.MST, 
                soDangKyInit: dataForm.soDangKy, 
                formDrug: value,
                goBack: () => navigation.goBack(),
            }
        ))
    },[dataForm])


    useFocusEffect(
        useCallback(() => {
            Promise.all(
                [
                    db.getDetail(`WHERE MST = ${params.MST}`) as any,
                    db.getItem(['giaBan', 'donVi'], DATABASE.table.Price.name ,`WHERE Drug_Id = ${params.MST}`) as any
                ]
            )
           
            .then(([data1, data2]) => {
                const item : {
                    giaBan: string,
                    donVi: string,
                }[] = [];
                for(let index = 0; index < data2.rows.length; index++) {
                    item.push({
                        giaBan: data2.rows.item(index).giaBan,
                        donVi: data2.rows.item(index).donVi,
                    })
                }
                setDataForm({...data1.rows.item(0), MST: data1.rows.item(0).MST.toString(), giaBan: item});
            })
            .catch(() => {
                dispatch(handleError())
            })
        },[])
    )


    if(show) {
        setTimeout(() => setShow(false),500)
        return (
            <Loading show = {true}/>
        )
    } else {
        return ( 
            <SafeAreaView style = {{flex: 1}}>
                <Suspense fallback={<Loading show = {true}/>}>
                    <FormikApp
                        initValue={dataForm}
                        validation={schema}
                        handleSubmit={handleSubmit}
                        children={
                            <UpdateForm />
                        }
                    />
                </Suspense>
            </SafeAreaView>
        );
    }
}

export default UpdateScreen;