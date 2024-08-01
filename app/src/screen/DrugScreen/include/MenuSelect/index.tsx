import { useEffect } from "react";
import { ComponentJSX, ComponentProps } from "../../../../services/type";
import { Checkbox, Title } from 'react-native-paper';
import Modal from "../../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getCheckAll, getCheckExpired, getCheckNearExpired, getCheckNotExpired } from "../../../../redux/selection";
import MenuSelectSlice from "./slice";
import { View } from "react-native";

interface MenuSelectProps {
    visible: boolean,
    setVisible: any,
}

const MenuSelect : ComponentProps<MenuSelectProps> = ({
    visible,
    setVisible
    }) : ComponentJSX | boolean => {
    const dispatch = useDispatch();

    const menu = {
        checkAll: useSelector(getCheckAll),
        checkNearExpired: useSelector(getCheckNearExpired),
        checkNotExpired: useSelector(getCheckNotExpired),
        checkExpired: useSelector(getCheckExpired)
    }

    const reset = MenuSelectSlice.actions.reset;
    const setCheckAll = MenuSelectSlice.actions.setCheckAll;
    const setCheckNearExpired = MenuSelectSlice.actions.setCheckNearExpired;
    const setCheckNotExpired = MenuSelectSlice.actions.setCheckNotExpired;
    const setCheckExpired = MenuSelectSlice.actions.setCheckExpired;

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    },[])
    
    return (
        <Modal
            style={{
                display: 'flex',
                justifyContent: 'flex-start',
                top: "20%",
                height: 500,
                margin: 40,
                backgroundColor: 'white',
                borderRadius: 10,
            }}
            visible = {visible}
            setVisible= {setVisible}
            children={
            <View style = {{padding: 10}}>
                <View>
                    <Title>Tìm theo hạn sử dụng</Title>
                    <Checkbox.Item 
                        label="Tất cả" 
                        status= {menu.checkAll ? "checked": 'unchecked'} 
                        onPress={() => dispatch(setCheckAll())}
                    />
                    <Checkbox.Item 
                        label="Thuốc còn hạn"  
                        status= {menu.checkNotExpired ? "checked": 'unchecked'}  
                        onPress={() => dispatch(setCheckNotExpired())}
                    />
                    <Checkbox.Item 
                        label="Thuốc gần hết hạn"  
                        status= {menu.checkNearExpired ? "checked": 'unchecked'} 
                        onPress={() => dispatch(setCheckNearExpired())}
                    />
                    <Checkbox.Item 
                        label="Thuốc gần đã hết hết hạn"  
                        status= {menu.checkExpired ? "checked": 'unchecked'} 
                        onPress={() => dispatch(setCheckExpired())}
                    />
                </View>
                
            </View>}
        >
        </Modal>

    )
}

export default MenuSelect;