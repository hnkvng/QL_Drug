import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListDrug from "./Component/ListDrug";
import { Appbar } from 'react-native-paper';
import MenuAction from "./Component/MenuAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../navigation/stack/rootStackParamlist";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
    getButtonOption, 
    getListDrug, getOption 
} from "../../../../redux/selection";
import { configDrug } from "../../../../models";
import Realm from "realm";
import { QueueDrug } from "../../../../models/drug";
import FactSelection from "../../../Component/FactSelection";
import loadingSlice from "../../../Component/Loading/loadingSlice";
import notifiSlice, { Inform, tempNotifi } from "../../../Component/Notifi/notifiSlice";
import listDrugSlice, { Items } from "./Component/ListDrug/listDrugSlice";
import 
    menuSlice, 
    { MenuDrug } from "./Component/MenuAction/menuSlice";
import 
    buttonOptionSlice, 
    { ButtonOption } from "./Component/Button/buttonOptionSlice";

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

    const [factSelections, setFactSelections] = useState<{
        show: boolean, 
        nameAction: string, 
        action: (() => void)| null}
    >({show: false, nameAction:'', action: null});

    const setCheckItem = listDrugSlice.actions.setCheckItem;
    const resetOption = menuSlice.actions.reset;
    const setLoading = loadingSlice.actions.setShow;
    const setNotifi = notifiSlice.actions.setShow;
    const setRefreshing = listDrugSlice.actions.setRefreshing;
    const setButton = buttonOptionSlice.actions.setButton; 
    const setShowOption = menuSlice.actions.setShowOption;
    const setShowButton = buttonOptionSlice.actions.setShow;
    
    const navigation = useNavigation<PropsNavigation>();
    const checkedItems : boolean[] = useSelector(getListDrug).checkItems;
    const items : Items[] = useSelector(getListDrug).items;
    const menu : MenuDrug = useSelector(getOption);
    const button : ButtonOption = useSelector(getButtonOption);

    const listIdRemove = useMemo(() => {
        return checkedItems
            .map((item, index) => item ? items[index].id : - 1)
            .filter((item) => item !== -1)
    },[checkedItems]);

    const actionDelete = useCallback(() : void=> {
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
                .catch((info : Inform) => {
                    dispatch(setLoading(false));
                    dispatch(setNotifi({
                        show: true,
                        ...tempNotifi(info.text, info.status)
                    }))
                })
    },[listIdRemove])

    useEffect(() => {
        if(button.close) {
            dispatch(setShowButton(false));
            dispatch(setCheckItem(checkedItems.map(() => false)));
        }
        if(button.remove) {
            setFactSelections({
                show : true,
                nameAction : "Xóa",
                action : actionDelete,
            })
            dispatch(setButton({name: 'remove', click: false}));
        }
    },[button.close, button.remove])
    
    
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
                {factSelections.show && <FactSelection {...factSelections} setAction={setFactSelections}/>}
            </SafeAreaView>
        </SafeAreaView>
    );
}

export default DrugPage