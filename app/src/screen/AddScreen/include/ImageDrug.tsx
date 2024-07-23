import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";
import ChooseImg from "../../../components/ChooseImg";
import { ComponentProps } from "../../../services/type";

interface  ImageDrugProps {
    label: string,
    value?: string,
    handleChange: any,
}

const ImageDrug : ComponentProps<ImageDrugProps> = ({label, value, handleChange}) : React.JSX.Element => {
    const [show, setShow] = useState(false);

    return (
        <View style = {styles.container}>
            {value && <View style = {styles.conImg}>
                        <Image
                            style = {styles.img}
                            source={{uri: value}}
                        />
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