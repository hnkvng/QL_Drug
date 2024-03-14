import React, { useEffect, useMemo } from "react";
import ListDrugDeleted from "./component/ListDrugDeleted";
import { useDispatch, useSelector } from "react-redux";
import listDrugDeletedSlice, { ItemsDeleted } from "./component/ListDrugDeleted/listDrugDeletedSlice";
import { 
    getButtonOptions, 
    getFactSelection, 
    getListItemsDeleted, 
    getWantAction 
} from "../../redux/selection";
import ButtonOption from "./component/Button";
import { configDrug } from "../../models";
import Realm from "realm";
import 
    factSelectionSlice, 
    { FactSelection as typeFactSelection} 
    from "../../modal/FactSelection/factSelectionSlice";
import trushDrugSlice, { ItemWantAction } from "./trushDrugSlice";
import { QueueTrush } from "../../models/drug";

import loadingSlice from "../../modal/Loading/loadingSlice";
import notifiSlice, { Inform, tempNotifi } from "../../modal/Notifi/notifiSlice";
import buttonOptionSlice, { ButtonOptions } from "./component/Button/buttonOptionSlice";

const TrashScreen = () : React.JSX.Element => {
    
    const dispatch = useDispatch();

    const realm = useMemo(async () => {
        return await Realm.open(configDrug);
      },[]);

    const factSelection :  typeFactSelection = useSelector(getFactSelection);
    const trashItems : ItemsDeleted[] = useSelector(getListItemsDeleted).items;
    const checkItemsDeleted : boolean[] = useSelector(getListItemsDeleted).checkItems;
    const want : ItemWantAction = useSelector(getWantAction).want;
    const button : ButtonOptions = useSelector(getButtonOptions);
    const checkAll = useSelector(getListItemsDeleted).checkAll;

    const reset = trushDrugSlice.actions.reset;
    const setWantAction = trushDrugSlice.actions.setWantAction;
    const setButton = buttonOptionSlice.actions.setButton;
    const setChoose = factSelectionSlice.actions.setChoose;
    const setShowFactSelection = factSelectionSlice.actions.setShow;
    const setLoading = loadingSlice.actions.setShow;
    const setNotifi = notifiSlice.actions.setShow;
    const setRefreshing = listDrugDeletedSlice.actions.setRefTrush;
    const setCheckItemsDeleted = listDrugDeletedSlice.actions.setCheckItemsDeleted;
    

    useEffect(() => {
        const listId = checkItemsDeleted
                            .map((item, index) => item ?  trashItems[index].id : - 1)
                            .filter((item) => item !== -1)
        if(button.remove) {
            dispatch(setWantAction({action: "remove", id: listId}));
            dispatch(setButton({name: 'remove',click: false}))
        }
        if(button.restore) {
            dispatch(setWantAction({action: "restore", id: listId}));
            dispatch(setButton({name: 'restore',click: false}))
        }
    },[button.remove, button.restore])

    useEffect(() => {
        if(want.action === 'remove') {
            dispatch(setShowFactSelection({show: true, nameAction: "Xóa"}));
        }
        if(want.action === 'restore') {
            dispatch(setShowFactSelection({show: true, nameAction: "Khôi phục"}));     
        }
    },[want])

    useEffect(() => {
        dispatch(setCheckItemsDeleted(checkItemsDeleted.map(() => checkAll)))
    },[checkAll])

    useEffect(( ) => {
        if(factSelection.choose) {
            dispatch(setChoose(false));
            realm
                .then((schema) => {
                    const queue = new QueueTrush();
                    let info : Inform = {
                        status: 'default',
                        text: '',
                    };
                    switch ( want.action ) {
                        case 'remove':
                            info = queue.deleteDrug(schema,want.id);
                            break;
                        case 'restore':
                            info = queue.retoreDrug(schema,want.id);
                            break;
                    }
                    
                    if(info.status !== 'success') {
                        throw info
                    }
                    else {
                        dispatch(setRefreshing(true));
                        dispatch(setLoading(false));
                        dispatch(setNotifi({
                            show: true,
                            ...tempNotifi(info.text, info.status)
                        }))
                    }
                    
                })
                .catch((info) => {
                    dispatch(setLoading(false));
                    dispatch(setNotifi({
                        show: true,
                        ...tempNotifi(info.text, info.status)
                    }))
                })
        }
    },[factSelection.choose])

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    },[])
    return (
        <>
            <ListDrugDeleted
                trashItems = {trashItems}
                checkItemsDeleted={checkItemsDeleted}
            />
            {checkItemsDeleted.some((item) => item === true) 
                && <ButtonOption/>}
        </>
        
    
    );
}
export default TrashScreen;