import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch, useSelector } from 'react-redux';
import notifiSlice from './slice';
import { getNotifi } from '../../../redux/selection';

const Notification = () : React.JSX.Element => {

    const dispatch = useDispatch();
    const notifi = useSelector(getNotifi);

    const reset = notifiSlice.actions.reset;

    useEffect(() => {
        if(notifi.show)
        {
            setTimeout(() => {
                dispatch(reset());
            },1500);
        }    
    },[notifi.show]);
 
    return (
        <Modal isVisible={notifi.show}>
            <View style={styles.container}>
                <View style={{...styles.card,borderLeftColor:notifi.theme}}>
                    <View style = {styles.block}>
                        {notifi.iconName && <Icon style = {styles.iconCheck} name = {notifi.iconName} color={notifi.theme} size={30} ></Icon>}
                        {notifi.text && <Text style = {styles.text}>{notifi.text}</Text>}   
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    card: { 
        backgroundColor: 'white', 
        padding: 30, 
        borderRadius: 10, 
        borderLeftWidth:10,
        justifyContent:'flex-end'
    },
    iconClose: {
        position:'absolute',
        top:0,
        right:0,
    },
    iconCheck: {
        marginRight:10,
        marginLeft:-10,
    },
    text: {
        marginTop:5,
    },
    block: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
    }

});