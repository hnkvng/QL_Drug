import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Checkbox,List, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ItemsDeleted } from './listDrugDeletedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { configDrug } from '../../../../../models';
import { QueueTrush } from '../../../../../models/drug';
import Realm from 'realm';
import listDrugDeletedSlice from './listDrugDeletedSlice';
import trushDrugSlice from '../../trushDrugSlice';
import { getListItemsDeleted } from '../../../../../redux/selection';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { useFocusEffect } from '@react-navigation/native';
interface ListDrugDeletedProps {
    trashItems : ItemsDeleted[],
    checkItemsDeleted : boolean[],
}

const ListDrugDeleted: React.FC<ListDrugDeletedProps> =  ({trashItems, checkItemsDeleted}) : React.JSX.Element => {
    const dispatch = useDispatch();

    const realm = useMemo(async () => {
        return await Realm.open(configDrug);
    },[]);

    
    const reset = listDrugDeletedSlice.actions.reset;
    const setItemsDeleted =listDrugDeletedSlice.actions.setItemsDeleted;
    const setCheckItemsDeleted = listDrugDeletedSlice.actions.setCheckItemsDeleted;
    const setRefreshing = listDrugDeletedSlice.actions.setRefTrush;
    const setWantAction = trushDrugSlice.actions.setWantAction;
    const setCheckAll = listDrugDeletedSlice.actions.setCheckAll;

    const refreshing = useSelector(getListItemsDeleted).refreshing;
    const checkAll = useSelector(getListItemsDeleted).checkAll;

    const handleCheckboxToggle = useCallback((index : any) => {
        const updatedCheckedItems = [...checkItemsDeleted];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        dispatch(setCheckItemsDeleted(updatedCheckedItems));
    },[checkItemsDeleted]);

    const handleCheckboxAll = () => {
        dispatch(setCheckAll(!checkAll))
    }

    const onRefresh = () => {
        dispatch(setRefreshing(true));
    };

    const deletePermanently = useCallback((id : number) => {
        dispatch(setWantAction({id:[id], action: 'remove'}))
    },[]);  

    const restoreItem = useCallback((id : number) => {
        dispatch(setWantAction({id: [id], action: 'restore'}));
    },[]);

    useFocusEffect(
        useCallback(() => {
          if(realm) {
            realm
              .then((schema) => {
                const data : ItemsDeleted[] = new QueueTrush().getDrug(schema);
                dispatch(setItemsDeleted(data));
                dispatch(setCheckItemsDeleted(data.map(() => false)))
                dispatch(setRefreshing(false));
              })
              .catch(() => {
                console.log('error')
              })
          }
          return () => {
            dispatch(reset())
          };
    }, [refreshing]));
    
    return (
        <ScrollView 
            style={{ flex: 1}}
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['blue']}
                />
            }
        >
        {trashItems.length <= 0 && 
            <View style = {styles.null}>
                <Text> Thùng rác trống </Text>
            </View>}
        {trashItems.length > 0 &&
            <View style = {styles.option} >
                <View style = {{display:'flex', flexDirection: 'row', marginTop: 10, marginLeft:10,}}>
                    <Checkbox
                        status={checkAll ? 'checked' : 'unchecked'}
                        onPress={handleCheckboxAll}
                    />
                    <Text style = {{marginTop: 10,}}>Chọn tất cả</Text>
                </View>
            </View>
        }
        {trashItems.map((item, index) => <List.Item
                key={index}
                title={item.name}
                style= {styles.item}
                left={() => (
                    <Checkbox
                        status={checkItemsDeleted[index] ? 'checked' : 'unchecked'}
                        onPress={() => handleCheckboxToggle(index)}
                    />)}
                right={() => 
                    <View style = {{display:'flex',flexDirection: 'row' }}>
                        <Icon 
                            size={25} 
                            style = {{marginTop: 5, marginBottom:5, color: 'blue'}} 
                            name ="restore" 
                            onPress={() => restoreItem(item.id)}
                        />
                        <Icon 
                            size={25} 
                            style = {{marginTop: 5, marginBottom:5, marginLeft: 15,  color: 'red'}} 
                            name ="delete-forever" 
                            onPress={() => deletePermanently(item.id)}
                        />
                    </View>
                }
            />)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    null: {
        width:"100%", 
        height: "100%", 
        display:'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    option: {
        width:"100%", 
        height:50, 
    },
    item: {
        margin:10,
        backgroundColor: 'white',
        borderRadius: 5,
    }
})

export default ListDrugDeleted;