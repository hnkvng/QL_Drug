import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from "react-native-paper";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FactSelectionProps {
    show : boolean,
    nameAction : string,
    action : (() => void) | null;
    setAction : React.Dispatch<React.SetStateAction<{
        show: boolean;
        nameAction: string;
        action: (() => void) | null;
    }>>;
}

const FactSelection : React.FC<FactSelectionProps> = ({show, nameAction, action, setAction}) : React.JSX.Element => {

    const toggleModal = useCallback(() => {
        setAction({
            show: false,
            nameAction: '',
            action: null,
        })
    },[]);

    const handleFactCheck = useCallback(() => {
        if(action) {
            action();
        }
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
                    <View>
                        <Title>
                            Bạn có chắc muốn {nameAction} không?
                        </Title>
                    </View>
                    <View>
                        <Button 
                            style = {styles.itemButtonNo} 
                            icon="close-outline" 
                            mode="contained" 
                            onPress={toggleModal}
                        >
                            Không
                        </Button>
                        <Button 
                            style = {styles.itemButtonYes} 
                            icon="check" 
                            mode="contained" 
                            onPress = {handleFactCheck}
                        >
                            Có
                        </Button>
                    </View>
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
    itemButtonYes: {
        margin: 10,
        backgroundColor: "green",
    },
    itemButtonNo: {
        margin: 10,
        backgroundColor: "grey",
    },
    iconClose: {
        position:'absolute',
        top:0,
        right:0,
    },
})

export default FactSelection;