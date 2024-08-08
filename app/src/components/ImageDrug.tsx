import React, { useEffect, useState } from "react";
import { Image, Linking, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";
import ChooseImg from "./ChooseImg";
import { ComponentProps } from "../services/type";
import { useCameraPermission } from "react-native-vision-camera";
import { useDispatch } from "react-redux";
import notifiSlice from "../componentsSpecial/Notification/slice";

interface  ImageDrugProps {
    label: string,
    value?: string,
    handleChange: any,
}

const ImageDrug : ComponentProps<ImageDrugProps> = (
    {
        label, 
        value, 
        handleChange,
    }
    ) : React.JSX.Element => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleWarn = notifiSlice.actions.handleWarn;

    const {
        requestPermission: requestCameraPermission,
    } = useCameraPermission();

    const handleCameraPermission = async () => {
        const granted = await requestCameraPermission();
    
        if (!granted) {
          dispatch(handleWarn(`Cần có sự cho phép của máy ảnh để sử dụng máy ảnh. Vui lòng cấp quyền trong cài đặt thiết bị của bạn`));
          Linking.openSettings();
        }
    };
    
    useEffect(() => {
        handleCameraPermission()
    },[])

    return (
        <View style = {styles.container}>
            {value && <View style = {styles.conImg}>
                        <TouchableOpacity 
                            onPress={() => {
                                setShow(true);
                            }}
                        >
                            <Image
                                style = {styles.img}
                                source={{uri: value}}
                            />
                        </TouchableOpacity>
                        <Icon 
                            name="close-circle-outline" 
                            size={25} 
                            style = {{color: 'black'}} 
                            onPress={() => handleChange('')}
                        />
                    </View>
            } 
            {!value &&<View style = {styles.conImg}>
                        <TouchableOpacity 
                            style = {styles.addImg} 
                            onPress={() => {
                                setShow(true);
                            }}
                        >
                            <Icon name="image-plus" size={40} color="grey" ></Icon>      
                        </TouchableOpacity>
                        <Text>
                            {label}
                        </Text>
                    </View>
            }
            <ChooseImg
                show = {show}
                setShow= {setShow}
                getImg= {handleChange}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 20,
    },
    conImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    img: {
        borderRadius: 10,
        width: 100, 
        height: 100
    },
    addImg: {
        backgroundColor:'#e1e1e1', 
        borderRadius:40, 
        margin: 10,
        padding:20
    }
})

export default ImageDrug;