import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListDrugDeleted from "./component/ListDrugDeleted";
import { useDispatch, useSelector } from "react-redux";
import listDrugDeletedSlice, { ItemsDeleted } from "./component/ListDrugDeleted/listDrugDeletedSlice";
import { 
    getButtonOptions, 
    getListItemsDeleted, 
    getWantAction 
} from "../../../redux/selection";
import ButtonOption from "./component/Button";
import { configDrug } from "../../../models";
import Realm from "realm";
import trushDrugSlice, { ItemWantAction } from "./trushDrugSlice";
import { QueueTrush } from "../../../models/drug";

import loadingSlice from "../../Component/Loading/loadingSlice";
import notifiSlice, { Inform, tempNotifi }  from "../../Component/Notifi/notifiSlice";
import buttonOptionSlice, { ButtonOptions } from "./component/Button/buttonOptionSlice";
import FactSelection from "../../Component/FactSelection";

const TrashScreen = () : React.JSX.Element => {
    
    const dispatch = useDispatch();

    const realm = useMemo(async () => {
        return await Realm.open(configDrug);
      },[]);

    const trashItems : ItemsDeleted[] = useSelector(getListItemsDeleted).items;
    const checkItemsDeleted : boolean[] = useSelector(getListItemsDeleted).checkItems;
    const want : ItemWantAction = useSelector(getWantAction).want;
    const button : ButtonOptions = useSelector(getButtonOptions);
    const checkAll = useSelector(getListItemsDeleted).checkAll;

    const reset = trushDrugSlice.actions.reset;
    const setWantAction = trushDrugSlice.actions.setWantAction;
    const setButton = buttonOptionSlice.actions.setButton;
    const setLoading = loadingSlice.actions.setShow;
    const setNotifi = notifiSlice.actions.setShow;
    const setRefreshing = listDrugDeletedSlice.actions.setRefTrush;
    const setCheckItemsDeleted = listDrugDeletedSlice.actions.setCheckItemsDeleted;

    const [factSelections, setFactSelections] = useState<{
        show: boolean, 
        nameAction: string, 
        action: (() => void)| null}
    >({show: false, nameAction:'', action: null});

    const listId = useMemo(() => {
        return checkItemsDeleted
            .map((item, index) => item ? trashItems[index].id : - 1)
            .filter((item) => item !== -1)
    },[checkItemsDeleted]);
    
    const handleAction = useCallback(() => {
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
    },[want.id]);

    useEffect(() => {
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
            setFactSelections({show: true, nameAction: "Xóa", action: handleAction});
        }
        if(want.action === 'restore') {
            setFactSelections({show: true, nameAction: "Khôi phục", action: handleAction});
        }
    },[want])

    useEffect(() => {
        dispatch(setCheckItemsDeleted(checkItemsDeleted.map(() => checkAll)))
    },[checkAll])

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
             {factSelections.show && <FactSelection {...factSelections} setAction={setFactSelections}/>}
        </>
        
    
    );
}
export default TrashScreen;