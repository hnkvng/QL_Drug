import {Suspense, lazy, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { ComponentJSX } from "../../services/type";
import FormikApp from "../../components/FormikApp";
import { ADD_FORM, STATUS } from "../../services/config";
import schema from "./validateAddForm";
import Loading from "../../components/Loading";
import { getDBConnection, saveDrugItems} from "../../services/db";
import { FormDrug } from "../../services/interface";
import NotificationApp from "../../components/NotificationApp";

const AddForm = lazy(() => import('./include/AddForm'));

const AddScreen = () : ComponentJSX => {
    const [show, setShow] = useState(true);

    const initStyle = {
        icon: '',
        color: ''
    }
    const [styleNotifi, setStyleNotifi] = useState(initStyle);
    const [showNotifi, setShowNotifi] = useState(false);
    const [infoNotifi, setInfoNotifi] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (value : FormDrug, handle: any) => {
        setLoading(true);
        setInfoNotifi("Đang thêm thuốc");
        setShowNotifi(true);

        const db = await getDBConnection(); 
        saveDrugItems(db, value)
        .then((res) => {
            setInfoNotifi(res.message)
            setStyleNotifi(STATUS.susscess)
            setLoading(false);
        })
        .catch((res) => {
            setInfoNotifi(res.message)
            setStyleNotifi(STATUS.error)
            setLoading(false);
        })     
        setTimeout(() => handle.setValues(() => ADD_FORM.initValue),1000);  
    }

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
                        initValue={ADD_FORM.initValue}
                        validation={schema}
                        handleSubmit={handleSubmit}
                        children={<AddForm/>}
                    />
                </Suspense>
                <NotificationApp
                    icon= {styleNotifi.icon}
                    color= {styleNotifi.color}
                    loading= {loading}
                    info= {infoNotifi}
                    visible= {showNotifi}
                    setVisible= {setShowNotifi}
                />
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