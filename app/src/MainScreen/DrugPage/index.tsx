import React, { useCallback, useEffect, useMemo } from "react";
import ListDrug from "./Component/ListDrug";
import { Appbar } from 'react-native-paper';
import MenuAction from "./Component/MenuAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
    getButtonOption, 
    getFactSelection, 
    getListDrug, getLoading, 
    getNotifi, getOption 
} from "../../../redux/selection";
import { configDrug } from "../../../models";
import Realm from "realm";
import { QueueDrug } from "../../../models/drug";
import FactSelection from "../../../modal/FactSelection";
import loadingSlice from "../../../modal/Loading/loadingSlice";
import notifiSlice, { tempNotifi } from "../../../modal/Notifi/notifiSlice";
import listDrugSlice, { Items } from "./Component/ListDrug/listDrugSlice";
import Notification from "../../../modal/Notifi";
import LoadingNotifi from "../../../modal/Loading";
import 
    menuSlice, 
    { MenuDrug } from "./Component/MenuAction/menuSlice";
import 
    buttonOptionSlice, 
    { ButtonOption } from "./Component/Button/buttonOptionSlice";
import 
    factSelectionSlice, 
    { FactSelection as typeFactSelection} 
    from "../../../modal/FactSelection/factSelectionSlice";
import { useFocusEffect } from '@react-navigation/native';

type PropsNavigation = StackNavigationProp<RootStackParamList,
    | "searchScreen" 
    | "addScreen" 
    | "trashScreen"
>;

function DrugPage() : React.JSX.Element {
    const dispatch = useDispatch();

    const realm = useMemo(async () => {
        return await Realm.open(configDrug);
      },[]);

    const setCheckItem = listDrugSlice.actions.setCheckItem;
    const resetOption = menuSlice.actions.reset;
    const setShowFactSelection = factSelectionSlice.actions.setShow;
    const setLoading = loadingSlice.actions.setShow;
    const setNotifi = notifiSlice.actions.setShow;
    const setRefreshing = listDrugSlice.actions.setRefreshing;
    const setButton = buttonOptionSlice.actions.setButton; 
    const setShowOption = menuSlice.actions.setShowOption;
    const setChoose = factSelectionSlice.actions.setChoose;
    const setShowButton = buttonOptionSlice.actions.setShow;
    
    const navigation = useNavigation<PropsNavigation>();
    const factSelection : typeFactSelection = useSelector(getFactSelection);
    const checkedItems : boolean[] = useSelector(getListDrug).checkItems;
    const items : Items[] = useSelector(getListDrug).items;
    const menu : MenuDrug = useSelector(getOption);
    const button : ButtonOption = useSelector(getButtonOption);

    const listIdRemove = useMemo(() => {
        if(factSelection.choose && 
            factSelection.typeAction === "DrugPage/delete"
        ) {
            return checkedItems
                .map((item, index) => item ? items[index].id : - 1)
                .filter((item) => item !== -1)
        }
        return [];
    },[factSelection.choose]);

    
    
    useEffect(() => {
        if(button.close) {
            dispatch(setShowButton(false));
            dispatch(setCheckItem(checkedItems.map(() => false)));
        }
        if(button.remove) {
            dispatch(setShowFactSelection({
                show: true, 
                nameAction: "Xóa", 
                typeAction: 'DrugPage/delete'
            }));
            dispatch(setButton({name: 'remove', click: false}));
        }
    },[button.close, button.remove])
    
    useEffect(() => {
        if(
            factSelection.choose && 
            factSelection.typeAction === "DrugPage/delete"
        ) {
            dispatch(setChoose(false));
            realm
                .then((schema) => {
                    const info = new QueueDrug().softDelete(schema,listIdRemove);
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
        switch (menu.option) {
            case 'add':
                navigation.navigate('addScreen');
                break;
            case 'delete':
                dispatch(setShowButton(true));
                break;
            case "trash":
                navigation.navigate('trashScreen'); 
                break;
            default:
              break;
          }
        dispatch(resetOption());
    },[menu.option]);

    return (
        <SafeAreaView style = {{ flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title="Thuốc" />
                <Appbar.Action
                    icon="magnify" 
                    onPress={() => navigation.navigate('searchScreen')}
                />
                <Appbar.Action 
                    icon="dots-vertical" 
                    onPress={() => dispatch(setShowOption(true))}
                />
            </Appbar.Header>
            <SafeAreaView style = {{ flex: 1}}>
                <MenuAction/>
                <ListDrug/>
                {factSelection.show && <FactSelection/>}
            </SafeAreaView>
        </SafeAreaView>
    );
}

export default DrugPage