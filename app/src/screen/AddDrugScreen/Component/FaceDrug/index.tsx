import React, { useCallback, useEffect, useMemo } from "react";
import { View, TouchableOpacity, StyleSheet} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { getFaceDrug, getSelection } from "../../../../../redux/selection";

import selectionSlice from "../../../../Component/Selection/selectionSlice";
import loadingSlice from "../../../../Component/Loading/loadingSlice";
import notifiSlice from "../../../../Component/Notifi/notifiSlice";

import { Avatar, Title } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import faceDrugSlice from "./faceDrugSlice";

const FaceDrug = () : React.JSX.Element => {

    const dispatch = useDispatch();

    const selection = useSelector(getSelection);
    const faceDrug = useSelector(getFaceDrug);

    const showFace = useMemo(() : boolean => {
        return  faceDrug.uri === null ? true : false;
    },[ faceDrug .uri]);
    
    const reset = faceDrugSlice.actions.reset;
    const setUriFaceDrug = faceDrugSlice.actions.setUri;
    const setShowChooseModal = selectionSlice.actions.setShow;
    const setNotifi = notifiSlice.actions.setShow;
    const setLoading = loadingSlice.actions.setShow;
   
    const handleShowModal = useCallback(() => {
        dispatch(setShowChooseModal(true));
    },[]);

    const handleStartLoadImg = useCallback(() => {
        dispatch(setLoading(true));
    },[]);

    const handleEndLoadImg = useCallback(() => {
        dispatch(setLoading(false))
        dispatch(setNotifi({
            show:true,
            text:'tải ảnh thành công',
            theme:'green',
            iconName:'check-circle',
        }));
    },[]);

    const handleErrortLoadImg = useCallback(() => {
        dispatch(setLoading(false));
        dispatch(setNotifi({
            show:true,
            text:'tải ảnh không thành công',
            theme:'red',
            iconName:'alert-circle',
        }));
    },[]);
      
    const removeImage = useCallback(() => {
        dispatch(setUriFaceDrug({uri: null}));
    },[]);

    useEffect(() => {
        if(selection.uri) 
            dispatch(setUriFaceDrug({uri: selection.uri}));
    },[selection.uri]);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    },[]);

    return (
        <SafeAreaView style = {styles.container}>
            {showFace && <>
                <TouchableOpacity style = {styles.itemFace} onPress={handleShowModal} >
                    <Icon name="image-plus" size={30} color="grey" ></Icon>      
                </TouchableOpacity>
                <Title style = {{fontSize:14}}>
                    Thêm hình ảnh
                </Title>
            </>
            }
            {faceDrug.uri && 
            <View style = {styles.itemImg}>
                <TouchableOpacity onPress={handleShowModal}>
                    <Avatar.Image 
                    style = {styles.styleTouch} 
                    size={75} 
                    source={{ uri: faceDrug.uri}} 
                    onLoadStart={handleStartLoadImg}
                    onLoadEnd={handleEndLoadImg}
                    onError={handleErrortLoadImg}
                />
                </TouchableOpacity>
                <Icon style = {styles.itemClose} name = 'close-circle-outline' color='grey' size={30} onPress={removeImage}></Icon>
            </View>}      
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        display:'flex', 
        justifyContent:'center', 
        alignItems: 'center',
    },
    itemFace:{
        backgroundColor:'#e1e1e1', 
        borderRadius:40, 
        padding:20
    },
    itemImg:{
        marginBottom:20,
        padding: 10,
    },
    itemClose: {
        position: 'absolute',
        top:0,
        right:-20,
    },
    styleTouch: {
        elevation: 5,
        shadowColor: 'black'
    }
})

export default FaceDrug;