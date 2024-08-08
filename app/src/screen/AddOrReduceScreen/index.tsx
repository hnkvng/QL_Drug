import { RouteProp, useRoute } from "@react-navigation/native";
import { ComponentJSX } from "../../services/type";
import { RootStackParamList } from "../../services/stackNavigate";
import FormikApp from "../../components/FormikApp";
import { ADD_OR_REDUCE_FORM, DATABASE, MESSAGE } from "../../services/config";
import schema from "./validateAddOrReduceForm";
import AddOrReduceForm from "./include/AddOrReduceForm";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Database } from "../../services/db";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import notifiSlice, { handleAddOrReduce } from "../../componentsSpecial/Notification/slice";
import { useDispatch } from "react-redux";
import { SafeAreaView, View} from "react-native";
import { Text, Title } from "react-native-paper";

const AddOrReduceScreen = () : ComponentJSX => {

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const db = useMemo(() => new Database(),[]);
    const {params} = useRoute<RouteProp<RootStackParamList, 'addOrReduceScreen'>>();
    const [initValue, setInitValue] = useState(ADD_OR_REDUCE_FORM.initValue);
    const [listHeSo, setListHeSo] = useState<{
        label: string,
        value: string,
    }[]>();
    const [tablePrice] = useState(['donVi','quyCach']);
    const [namePrice] = useState(DATABASE.table.Price.name);
    const [title, setTitle] = useState('');
    const [suptitle, setSupTitle] = useState('');
    const [tonKho, setTonKho] = useState(0);
    const handleError = notifiSlice.actions.handleError;
    
    const handleSubmit = useCallback((value : any, handle: any) => {
        let soLuong = parseInt(value.donVi) * parseInt(value.soLuong);
        const {MST } = params;
        appDispatch(handleAddOrReduce(
            {
                MST: MST, 
                soLuong: soLuong, 
                soLuongTonKho: tonKho,
                addOrReduce: value.themBot,
                resetForm: () => {
                    handle.setValues((item : typeof initValue) => ({...item, soLuong: ''}));
                    handleTitle();
                },
            }))
    },[listHeSo, tonKho])

    const handleTitle = useCallback(() => {
        db.getDetail(`WHERE MST = ${params.MST}`)
        .then((data : any) => {
            const {tenThuoc, soDangKy, soLuongTonKho, donViTinh} = data.rows.item(0)
            const titleChange = `${tenThuoc} - (${soDangKy})`;
            const supTitleChange = `${soLuongTonKho}/${donViTinh}`;
            setTonKho(soLuongTonKho)
            setTitle(titleChange)
            setSupTitle(supTitleChange)
        })
        .catch(() => {
            dispatch(handleError());
        })
    },[])
    
    useEffect(() => {
        db.getItem(tablePrice, namePrice,`WHERE Drug_Id = ${params.MST}`)
        .then((data : any) => {

            setInitValue((item) => ({...item}));
            let listHeSo : {
                label: string,
                value: string,
            }[] = [];
        
            for(let index = 0; index < data.rows.length; index ++) {
                let heSo = 1;
                for(let jdex = index + 1; jdex < data.rows.length; jdex++) {
                    heSo *= data.rows.item(jdex).quyCach;
                }
                listHeSo.push({
                    label:  data.rows.item(index).donVi,
                    value:  heSo.toString(),
                })
            }
            setListHeSo(listHeSo)
        })
        .catch(() => {
            dispatch(handleError());
        })
    },[])

    useEffect(() => {
        handleTitle()
    },[])
    
    return (
        <SafeAreaView style = {{flex: 1}}>
            <View style = {{padding: 10}}>
                <Title>{title}</Title>
                <Text>{suptitle}</Text>
            </View>
            <FormikApp
                initValue= {initValue}
                validation= {schema}
                enableReinitialize
                children= {<AddOrReduceForm listHeSo={listHeSo} />}
                handleSubmit= {handleSubmit}
            />
        </SafeAreaView>
        
    )
}  

export default AddOrReduceScreen;