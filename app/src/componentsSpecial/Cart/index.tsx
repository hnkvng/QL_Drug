import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { ComponentJSX, ComponentProps } from "../../services/type"
import { Icon, Text, Title } from "react-native-paper";
import ItemCart from "./include/ItemCart";
import { useDispatch, useSelector } from "react-redux";
import { getCart, mathSumPrice} from "../../redux/selection";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CartSlice from "./slice";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Button from "../../components/Button";
import { theme } from "../../services/theme";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { handleSell } from "../Notification/slice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


interface CartProps {
    focusSearch: boolean
}

const Cart : ComponentProps<CartProps> = ({
    focusSearch
    }) : ComponentJSX | undefined => {

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();
    const listItem = useSelector(getCart).listItem;
    const tongGia = useSelector(mathSumPrice);

    const [shouldReset, setShouldReset] = useState(false);

    const [upAndDown, setUpAndDown] = useState<'down' | 'up'>('up');

    const nameIcon = useMemo(() => upAndDown === 'up' 
        ? 'arrow-up-drop-circle-outline' 
        : 'arrow-down-drop-circle-outline'
    ,[upAndDown])

    const reset = CartSlice.actions.reset;
    const heightShare = useSharedValue(40);

    const handleUpAndDown = () => {
        if(upAndDown === 'down') {
            setUpAndDown('up')
        } else {
            setUpAndDown('down')
        }
    }
    
    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart: () => {
            heightShare.value = withTiming(600);
            if(heightShare.value == 600) {
                heightShare.value =  withTiming(40);
            }
            runOnJS(handleUpAndDown)();
        },
    });

    const animaitionHidden = useAnimatedStyle(() => ({
        height: heightShare.value
        
    }))

    const handlePay = useCallback((listItems : {
        id: number;
        avatar: string;
        tenThuoc: string;
        giaBan: string;
        soLuong: number;
        donVi: string;
        heSo: number;
    }[], tongTien: number) => {
        appDispatch(handleSell({lisCart: listItems,tongTien: tongTien, resetCart: () => dispatch(reset())}))
    },[])

    useEffect(() => {
        return () => {
            dispatch(reset())
        }
    },[])

    useEffect(() => {
        if(shouldReset) {
            dispatch(reset());
            setShouldReset(false);
        }
    },[shouldReset])

    if(!focusSearch) 
    return (
        <Animated.View
            style = {[
                styles.container,
                animaitionHidden
            ]}
        >
            <View>
                <Text 
                    style = {{position: 'absolute', left: 0, padding: 10}}
                >
                    {listItem.length} sản phẩm
                </Text>
                <Title style = {{textAlign: 'center', fontSize: 18, fontWeight: 700}}>Giỏ hàng</Title>
                <PanGestureHandler onGestureEvent={panGesture}>
                    <Animated.View style = {{position:'absolute', right: 0, padding: 5}}>
                        <Icon source= {nameIcon} size={30}></Icon>
                    </Animated.View>
                </PanGestureHandler>
            </View>
            <KeyboardAwareScrollView style = {{marginTop: 10}}>
                {listItem.length > 0 && listItem.map((item, index) => (
                    <ItemCart
                        key={index}
                        index= {index}
                        {...item}
                    />
                ))}
            </KeyboardAwareScrollView>
            <View style = {{ padding: 10}}>
                <Text style = {{fontSize: 17}}>Tổng tiền: {tongGia.toLocaleString('vi-VN')}₫</Text>
            </View>
            <Button
                style={{backgroundColor: theme.colors.mainColor, margin: 10,}}
                name = "Thanh toán"
                mode= 'contained'
                textColor="white"
                disabled = {listItem.length === 0}
                handleClick={() => handlePay(listItem, tongGia)}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    }
})

export default Cart;