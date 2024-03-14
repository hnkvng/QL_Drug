import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import selectionSlice from './selectionSlice';
import { getSelection } from '../../redux/selection';

const Selection = () : React.JSX.Element => {
    const dispatch = useDispatch();

    const setShow = selectionSlice.actions.setShow;
    const setChoose = selectionSlice.actions.setChoose;

    const selection = useSelector(getSelection);

    const toggleModal = useCallback(() => {
        dispatch(setShow({show:false,controller:null}))
    },[])
    
    const pickImage = useCallback(() => {
        dispatch(setChoose('pickImage')); 
        dispatch(setShow({show:false,controller:selection.controller}))
    },[selection.controller])
    
    const takePhoto = useCallback(() => {
        dispatch(setChoose('takePhoto'));
        dispatch(setShow({show:false,controller:selection.controller}))
    },[selection.controller])
    
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