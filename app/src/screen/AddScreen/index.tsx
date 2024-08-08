import {Suspense, lazy, useCallback, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ComponentJSX } from "../../services/type";
import FormikApp from "../../components/FormikApp";
import { ADD_FORM } from "../../services/config";
import schema from "./validateAddForm";
import Loading from "../../components/Loading";
import { FormDrug} from "../../services/interface";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { handleAddDrug } from "../../componentsSpecial/Notification/slice";

const AddForm = lazy(() => import('./include/AddForm'));

const AddScreen = () : ComponentJSX => {

    const appDispatch = useAppDispatch();
    const [show, setShow] = useState(true);
    const handleSubmit = useCallback((value : FormDrug, handle: any) => {
        appDispatch(handleAddDrug(
            {
                formDrug: value, 
                resetForm: () => handle.setValues(() => ADD_FORM.initValue)
            }
        )) 
    },[])

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
                        initValue={ADD_FORM.initValue}
                        validation={schema}
                        handleSubmit={handleSubmit}
                        children={
                            <AddForm />
                        }
                    />
                </Suspense>
            </SafeAreaView>
        );
    }
    
}


export default AddScreen;