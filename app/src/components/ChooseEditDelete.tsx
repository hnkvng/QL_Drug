import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ComponentJSX } from '../services/type';

interface ChooseEditDeleteProps {
    show: boolean,
    setShow: (show : boolean) => any,
    handleEdit: () => void,
    handleDelete: () => void,
}

const ChooseEditDelete : React.FC<ChooseEditDeleteProps> = ({
    show, 
    setShow, 
    handleEdit,
    handleDelete
    }) : ComponentJSX => {

    const toggleModal = useCallback(() => {
        setShow(false)
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
                        icon="pen" 
                        mode="contained" 
                        buttonColor= 'pink'
                        onPress={() => {
                            toggleModal();
                            handleEdit();
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Button 
                        style = {styles.itemButton} 
                        icon="delete" 
                        mode="contained" 
                        buttonColor= 'red'
                        onPress={() => {
                            toggleModal();
                            handleDelete();
                        }}
                    >
                        Xóa
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

export default ChooseEditDelete;