import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";
import Selection from "../../../../Component/ChooseImage";
import imageDrugSlice, { getImg } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { getImgDrug } from "../../../../../redux/selection";



const ImageDrug = () : React.JSX.Element => {

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    
    const img : string | null= useSelector(getImgDrug).img;
    
    const reset = imageDrugSlice.actions.reset;
    const setImgNull = imageDrugSlice.actions.setImgNull;
    
    useEffect(() => {
        return () => {
            dispatch(reset());
        }
    },[])

    return (
        <View style = {styles.container}>
            {img && <View style = {styles.conImg}>
                        <Image
                            style = {styles.img}
                            source={{uri: img}}
                        />
                        <Icon 
                            name="close-circle-outline" 
                            size={25} 
                            style = {{color: 'black'}} 
                            onPress={() => dispatch(setImgNull())}
                        />
                    </View>
            } 
            {!img &&<View style = {styles.conImg}>
                        <TouchableOpacity 
                            style = {styles.addImg} 
                            onPress={() => {
                                setShow(true);
                            }}
                        >
                            <Icon name="image-plus" size={40} color="grey" ></Icon>      
                        </TouchableOpacity>
                        <Text>
                            Thêm ảnh
                        </Text>
                    </View>
            }
            <Selection show = {show} setShow={setShow} getImg={getImg}></Selection>
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