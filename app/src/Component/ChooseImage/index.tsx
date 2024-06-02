import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../../redux/store';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import handleImg from '../../../handle/img';
import { theme } from '../../../../App';

interface SelectionProps {
    show: boolean,
    setShow: (show : boolean) => any,
    getImg: (callback : any) => any,
}

const Selection : React.FC<SelectionProps> = ({show, setShow, getImg}) : React.JSX.Element => {

    const appDispatch = useAppDispatch();

    const toggleModal = useCallback(() => {
        setShow(false)
    },[]);
    
    const pickImage = useCallback(() => {
        appDispatch(getImg((thunk : any) => handleImg(launchImageLibrary, thunk)));
        toggleModal();
    },[]);
    
    const takePhoto = useCallback(() => {
        appDispatch(getImg((thunk : any) => handleImg(launchCamera, thunk)));
        toggleModal();
    },[]);

    return (
        <Modal isVisible={show}>
            <View style={styles.container}>
                <View style = {styles.card}>
                    <Icon 
                        style = {styles.iconClose} 
                        name = 'close-circle-outline' 
                        color='grey' 
                        size={25} 
                        onPress={toggleModal}
                    />
                    <Button 
                        style = {styles.itemButton} 
                        icon="image-multiple" 
                        mode="contained" 
                        buttonColor={theme.colors.mainColor}
                        onPress={pickImage}
                    >
                        Thư viện ảnh
                    </Button>
                    <Button 
                        style = {styles.itemButton} 
                        icon="camera-iris" 
                        mode="contained" 
                        buttonColor={theme.colors.mainColor}
                        onPress={takePhoto}
                    >
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