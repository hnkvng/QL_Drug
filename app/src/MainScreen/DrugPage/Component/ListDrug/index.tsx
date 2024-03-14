import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Checkbox, DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getButtonOption,getListDrug} from '../../../../../redux/selection';
import Realm from 'realm';
import { QueueDrug } from '../../../../../models/drug';
import listDrugSlice, { Items } from './listDrugSlice';
import { configDrug } from '../../../../../models';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonOption from '../Button';
import { useFocusEffect } from '@react-navigation/native';


const ListDrug  = () : React.JSX.Element  => {

    const dispatch = useDispatch();

    const setRefreshing = listDrugSlice.actions.setRefreshing;

    const buttonOption = useSelector(getButtonOption);
    const refreshing = useSelector(getListDrug).refreshing;

    const checkedItems : boolean[] = useSelector(getListDrug).checkItems;
    const items : Items[] = useSelector(getListDrug).items;

    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPageList] = useState([5,10,15]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
      numberOfItemsPerPageList[0]
    );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    
    const realm = useMemo(async () => {
      return await Realm.open(configDrug);
    },[]);

    const reset = listDrugSlice.actions.reset;
    const setListDrug = listDrugSlice.actions.setListDrug;
    const setCheckItem = listDrugSlice.actions.setCheckItem;

    const CheckBox = useCallback(() => {
      return (
        buttonOption.show && items.length > 0 &&
        <DataTable.Title onPress={() => {
            if(checkedItems.every((item) => item === true)) {
              dispatch(setCheckItem(checkedItems.map(() => false)));
              return;
            }
            if(checkedItems.every((item) => item === false)) {
              dispatch(setCheckItem(checkedItems.map(() => true)));
              return;
            }
            dispatch(setCheckItem(checkedItems.map((item) => item ? false: item)))
          }}> {checkedItems.every((item) => item === false ) ? "Chọn tất cả" : "Huỷ chọn"}</DataTable.Title>
          )
      },[checkedItems,  buttonOption.show]);

    const ButtonOp = useCallback(() => {
      return (
        buttonOption.show && <ButtonOption
          checkedItems={checkedItems}
        />
      )
    },[checkedItems, buttonOption.show])

    const handleCheckboxToggle = useCallback((index : any) => {
      const updatedCheckedItems = [...checkedItems];
      updatedCheckedItems[index] = !updatedCheckedItems[index];
      dispatch(setCheckItem(updatedCheckedItems));
    },[checkedItems]);
    
    useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);

    useFocusEffect(
      useCallback(() => {
        if(realm) {
          realm
            .then((schema) => {
              const data : Items[] = new QueueDrug().getDrug(schema);
              dispatch(setListDrug(data));
              dispatch(setCheckItem(data.map(() => false)));
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
      <SafeAreaView>
        <DataTable
          style = {styles.container}
        >
          <DataTable.Header>
            {CheckBox()}
            <DataTable.Title>Tên thuốc</DataTable.Title>
            <DataTable.Title numeric>Sô lượng</DataTable.Title>
          </DataTable.Header>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={['blue']} 
              >

              </RefreshControl>
            }
          >
            {items.slice(from, to).map((item :any, index : any) => (
              <DataTable.Row key={index + 1} style = {styles.item} onPress={() => console.log(index)}>
                {buttonOption.show && <DataTable.Cell>
                    <Checkbox
                        status={checkedItems[index] ? 'checked' : 'unchecked'}
                        onPress={() => handleCheckboxToggle(index)}
                    />
                </DataTable.Cell>}
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
          <DataTable.Pagination
            style = {styles.footer}
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Số thuốc hiển thị'}
          />
          {ButtonOp()}
        </DataTable>       
      </SafeAreaView>   
    );
};

const styles = StyleSheet.create({
    container: {
      display:'flex',
      height:'100%',
      justifyContent:'space-between',
    },
    conButton: {
      width: "100%",
      position: "absolute",
      bottom:0,
      display:'flex', 
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor:'white',
      elevation: 20,
      alignItems: 'center',
    },
    itemButton: {
        width:130,
        margin: 20,
    },
    item: {
      backgroundColor:'white',
      borderRadius:5,
      margin:5,
    }, 
    footer: {
      width:'100%',
      backgroundColor:'white',
    }
})

export default ListDrug;