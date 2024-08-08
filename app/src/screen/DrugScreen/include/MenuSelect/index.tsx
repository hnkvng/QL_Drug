import { useEffect, memo } from "react";
import { ComponentJSX, ComponentProps } from "../../../../services/type";
import { Checkbox, Title } from 'react-native-paper';
import Modal from "../../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../../../redux/selection";
import menuSelectSlice from "./slice";
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

    const {
        checkAll,
        checkNearExpired,
        checkNotExpired,
        checkExpired
    } = useSelector(getMenu);

    const reset = menuSelectSlice.actions.reset;
    const setCheckAll = menuSelectSlice.actions.setCheckAll;
    const setCheckNearExpired = menuSelectSlice.actions.setCheckNearExpired;
    const setCheckNotExpired = menuSelectSlice.actions.setCheckNotExpired;
    const setCheckExpired = menuSelectSlice.actions.setCheckExpired;

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
                        status= {checkAll ? "checked": 'unchecked'} 
                        onPress={() => dispatch(setCheckAll())}
                    />
                    <Checkbox.Item 
                        label="Thuốc còn hạn"  
                        status= {checkNotExpired ? "checked": 'unchecked'}  
                        onPress={() => dispatch(setCheckNotExpired())}
                    />
                    <Checkbox.Item 
                        label="Thuốc gần hết hạn"  
                        status= {checkNearExpired ? "checked": 'unchecked'} 
                        onPress={() => dispatch(setCheckNearExpired())}
                    />
                    <Checkbox.Item 
                        label="Thuốc gần đã hết hết hạn"  
                        status= {checkExpired ? "checked": 'unchecked'} 
                        onPress={() => dispatch(setCheckExpired())}
                    />
                </View>
                
            </View>}
        >
        </Modal>

    )
}

export default memo(MenuSelect);