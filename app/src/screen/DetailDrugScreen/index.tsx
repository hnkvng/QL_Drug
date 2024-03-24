import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Button, Paragraph, Title } from "react-native-paper";
import { RootStackParamList } from "../../../navigation/stack/rootStackParamlist";
import { configDrug } from "../../../models";
import Realm from "realm";
import { QueueDrug } from "../../../models/drug";
import { Card } from 'react-native-paper';
import { Product } from "../AddDrugScreen/addSlice";
import { useDispatch, useSelector } from "react-redux";
import selectionSlice from "../../Component/Selection/selectionSlice";
import Selection from "../../Component/Selection";
import { getFaceDrug, getSelection } from "../../../redux/selection";
import { useAppDispatch } from "../../../redux/store";
import notifiSlice from "../../Component/Notifi/notifiSlice";
import loadingSlice from "../../Component/Loading/loadingSlice";

const DetailDrugScreen = () => {

    const dispatch = useDispatch();

    const route = useRoute<RouteProp<RootStackParamList,'detailScreen'>>();

    const [uri , setUri] = useState<string | null> (null);

    const selection = useSelector(getSelection);

    const setShowChooseModal = selectionSlice.actions.setShow;
    const setNotifi = notifiSlice.actions.setShow;
    const setLoading = loadingSlice.actions.setShow;

    const [data, setData] = useState<Product | null>(null);
    const id = route.params.id;

    const realm = useMemo(async () => {
        return await Realm.open(configDrug);
      },[]);

    const hanleChangeImge = () => {
        dispatch(setShowChooseModal( true))
    }

    const removeImage = useCallback(() => {
        setUri(null)
    },[]);
      
    useEffect(() => {
        realm
            .then((schema) => {
                const data = new QueueDrug().getDetailDrug(schema, id);
                setData(data);
                setUri(data.img)
            })
    },[])

    useEffect(() => {
        realm
            .then((schema) => {
                if(data)
                new QueueDrug().updateDrug(schema, {...data, img: uri});
            })
            .catch(() => {
                console.log('hehe')
            })
    },[uri])
    
    useEffect(() => {
        if(selection.uri) 
            setUri(selection.uri)
    },[selection.uri])

    return (
        <View>
            {data && <Card>
                <Card.Cover
                    source={{ 
                        uri:  uri
                        ?? 'https://via.placeholder.com/640x480.png?text=%E1%BA%A2NH+S%E1%BA%A2N+PH%E1%BA%A8M+640x480'}} 
                />
                    
                <Card.Content>
                    <Title>{data.name}</Title>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={hanleChangeImge}>Chọn ảnh khác</Button>
                    {uri !== null && <Button onPress={removeImage}>Xóa ảnh</Button>}
                </Card.Actions>
            </Card>}
            <Selection/>
        </View>
    )
}

export default DetailDrugScreen;