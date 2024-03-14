import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from "react-native-paper";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getFactSelection } from '../../redux/selection';
import factSelectionSlice from './factSelectionSlice';


const FactSelection = () : React.JSX.Element => {
    const dispatch = useDispatch();

    const reset = factSelectionSlice.actions.reset;
    const setShowFactSelection = factSelectionSlice.actions.setShow;
    const setChoose = factSelectionSlice.actions.setChoose;

    const factSelection = useSelector(getFactSelection);

    const toggleModal = () => {
        dispatch(reset())
    }

    const handleFactCheck = () => {
        dispatch(setChoose(true));
        dispatch(setShowFactSelection({
            show: false, 
            nameAction : factSelection.nameAction, 
            typeAction: factSelection.typeAction
        }))
    }

    return (
        <Modal isVisible={factSelection.show}>
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
                            Bạn có chắc muốn {factSelection.nameAction} không?
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