import {Suspense, lazy, useEffect, useLayoutEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { addScreenParam, ComponentJSX, DrugItem } from "../../services/type";
import FormikApp from "../../components/FormikApp";
import { ADD_FORM, STATUS } from "../../services/config";
import schema from "./validateAddForm";
import Loading from "../../components/Loading";
import { Database, getDBConnection, getItems, saveDrugItems} from "../../services/db";
import { FormDrug } from "../../services/interface";
import NotificationApp from "../../components/NotificationApp";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { addScreenParamProp, RootStackParamList } from "../../services/stackNavigate";
import { StackNavigationProp } from "@react-navigation/stack";

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'addScreen'
>;

const AddForm = lazy(() => import('./include/AddForm'));

const AddScreen = () : ComponentJSX => {
    const [show, setShow] = useState(true);

    const navigation = useNavigation<PropsNavigation>();
    const {params} = useRoute<RouteProp<RootStackParamList,'addScreen'>>();

    const initStyle = {
        icon: '',
        color: ''
    }
    const [styleNotifi, setStyleNotifi] = useState(initStyle);
    const [showNotifi, setShowNotifi] = useState(false);
    const [infoNotifi, setInfoNotifi] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataChange, setDataChange] = useState<undefined | FormDrug>();

    const handleSubmit = (value : FormDrug, handle: any) => {
        setLoading(true);
        setInfoNotifi("Đang thêm thuốc");
        setShowNotifi(true);

        const db = new Database();
        db.addInfoDrug(value)  
        .then((data) => {
            setLoading(false);
            setInfoNotifi("Thêm thuốc hoàn tất");
            setStyleNotifi(STATUS.susscess)
            handle.setValues(() => ADD_FORM.initValue)
        })
        .catch((error) => {
            setLoading(false);
            setInfoNotifi("Thêm thuốc không thành công");
            setStyleNotifi(STATUS.error)
        })  
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: params.title,
        })
    },[params])

    useLayoutEffect(() => {
        if(params.MST) {
            const db = new Database();
            db.getDetail(params.MST)
            .then((data) => {
                const item = data.rows.item(0);
                setDataChange(({...item, MST: item.id.toString(), giaBan: [{giaBan: item.giaBan, donVi: item.donVi, soLuong: item.soLuong}]}))
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
                        handleSubmit={handleSubmit}
                        children={<AddForm nameButton= {params.nameButton} />}
                    />
                </Suspense>
                <NotificationApp
                    {...styleNotifi}
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