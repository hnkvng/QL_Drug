import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import selectionSlice, { getFaceImg } from './selectionSlice';
import { getSelection } from '../../../redux/selection';
import { useAppDispatch } from '../../../redux/store';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import handleImg from '../../../handleImg';

const Selection = () : React.JSX.Element => {

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();

    const selection = useSelector(getSelection);

    const reset = selectionSlice.actions.reset;
    const setShow = selectionSlice.actions.setShow;
    
    const toggleModal = useCallback(() => {
        dispatch(setShow(false))
    },[]);
    
    const pickImage = useCallback(() => {
        appDispatch(getFaceImg((thunk : any) => handleImg(launchImageLibrary, thunk)));
    },[]);
    
    const takePhoto = useCallback(() => {
        appDispatch(getFaceImg((thunk : any) => handleImg(launchCamera, thunk)));
    },[]);

    useEffect(() => {
        dispatch(reset());
    },[selection.uri]);

    return (
        <Modal isVisible={selection.show}>
            <View style={styles.container}>
                <View style = {styles.card}>
                    <Icon style = {styles.iconClose} name = 'close-circle-outline' color='grey' size={25} onPress={toggleModal}></Icon>
                    <Button style = {styles.itemButton} icon="image-multiple" mode="contained" onPress={pickImage}>
                        Thư viện ảnh
                    </Button>
                    <Button style = {styles.itemButton} icon="camera-iris" mode="contained" onPress={takePhoto}>
                        Mở máy ảnh
                    </Button>
                </View>
            </View>
        </Modal>    
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    card: { 
        display:'flex',
        flexDirection:'column',
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 10, 
        justifyContent: 'space-between',
    },
    itemButton: {
        margin: 10,
    },
    iconClose: {
        position:'absolute',
        top:0,
        right:0,
    },
})

export default Selection;