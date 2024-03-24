import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from "react-native-paper";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import menuSlice from './menuSlice';
import { getOption } from '../../../../../../redux/selection';
import { useFocusEffect } from '@react-navigation/native';

const MenuAction = () : React.JSX.Element => {
    const dispatch = useDispatch();

    const reset = menuSlice.actions.reset;
    const setOption = menuSlice.actions.setOption;
    const setShowOption = menuSlice.actions.setShowOption;

    const menu = useSelector(getOption);

    const toggleModal = () => {
      dispatch(setShowOption(false))
    }

    const hanleOption = (name : string) => {
      dispatch(setOption(name));
      toggleModal();
    }
    
    useFocusEffect(
      useCallback(() => {
        return () => {
          dispatch(reset())
        }
      }, []));

    return (
      <Modal isVisible = {menu.show}>
          <View style={styles.container}>
              <View style = {styles.card}>
                  <Icon 
                    style = {styles.iconClose} 
                    name = 'close-circle-outline' 
                    color='grey' size={25} 
                    onPress={toggleModal}
                  />
                  <Button 
                    style = {styles.itemButtonAdd} 
                    icon="plus" 
                    mode="contained" 
                    onPress={() => hanleOption('add')}
                  >
                    Thêm thuốc mới
                  </Button>
                  <Button 
                    style = {styles.itemButtonDelete} 
                    icon="delete" 
                    mode="contained" 
                    onPress={() => hanleOption('delete')}
                  >
                      Xóa thuốc
                  </Button>
                  <Button 
                    style = {styles.itemButtonTrash} 
                    icon="delete-variant" 
                    mode="contained" 
                    onPress={() => hanleOption('trash')}
                    >
                      Thùng rác
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
        zIndex:1000,
        padding: 20, 
        borderRadius: 10, 
        justifyContent: 'space-between',
    },
    itemButtonAdd: {
      margin: 10,
      backgroundColor:'#4a86ed',
    },
    itemButtonChange: {
      margin: 10,
      backgroundColor:'#17c39b',
    },
    itemButtonDelete: {
      margin: 10,
      backgroundColor:'#ed1f46',
    },
    itemButtonTrash: {
      margin: 10,
      backgroundColor:'#258dad',
    },
    iconClose: {
        position:'absolute',
        top:0,
        right:0,
    },
})

export default MenuAction;