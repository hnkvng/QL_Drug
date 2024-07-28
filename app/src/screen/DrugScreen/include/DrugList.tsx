import { ComponentJSX, ComponentProps, DrugItem } from "../../../services/type";
import { Avatar, Icon, Text } from 'react-native-paper';
import { Image, StyleSheet, TouchableOpacity} from 'react-native';
import { theme } from "../../../services/theme";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import  Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import { View } from "react-native";
import { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../services/stackNavigate";
import { useNavigation } from "@react-navigation/native";

interface DrugListProps {
    item: DrugItem,
}

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'addScreen'
>;

const DrugList : ComponentProps<DrugListProps> = (
    {
        item
    }) : ComponentJSX => {

    const navigation = useNavigation<PropsNavigation>();
    const translationX = useSharedValue(0);
    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            if(translationX.value < -150)
                return;
            if(translationX.value > 150)
                return;
            translationX.value = event.translationX;
        },
        onEnd: () => {
            if(translationX.value < -100)
                translationX.value =  withTiming(-140);
            else 
                translationX.value =  withTiming(0);    
        },
    });

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translationX.value,
            }
        ]
    }))

    const animationDelete = useAnimatedStyle(() => ({
        transform: [
            {
                scale: (translationX.value)/-100
            }
        ],
    }))

    const animationChange = useAnimatedStyle(() => ({
        transform: [
            {
                scale: (translationX.value)/-100
            }
        ]
    }))

    return (
        <View style = {styles.container}>
            <View 
                style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute', 
                    right: "3.5%", 
                }}
            >
                <TouchableOpacity 
                    style = {styles.buttonChange} 
                    onPress={() => {
                            translationX.value = withTiming(0);
                            navigation.navigate("addScreen",{MST: item.MST, title: 'Chỉnh sửa thuóc', nameButton: 'Thay đổi'})
                        }
                    }
                >
                    <Animated.View style = {animationChange}>
                        <Icon source= "pen" color = "white" size={20}></Icon>
                    </Animated.View>
                </TouchableOpacity >
                <TouchableOpacity style = {styles.buttonDelete} onPress={() => {translationX.value = withTiming(0)}}>
                    <Animated.View style = {animationDelete}>
                        <Icon source= "delete" color = "white" size={20}></Icon>
                    </Animated.View>
                </TouchableOpacity>
            </View>
            
            <View style = {{
                    position: 'absolute',   
                    left: "3%",
                    width: "54.5%",
                    height: 70,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                }}>
            </View>
            <PanGestureHandler onGestureEvent={panGesture}>
                <Animated.View style = {[styles.item, rStyle]}>
                    <Image 
                        style = {{width: 50, height:50, borderRadius: 5,}}
                        source={item.avatar ? 
                            { uri: item.avatar } 
                            : require('../../../assets/imageDrug.jpg')
                        } 
                    />
                    <View style = {{margin:10}}>
                        <Text 
                            style = {{width: 200}} 
                            numberOfLines={1} 
                            ellipsizeMode="tail"
                        >
                            {item.tenThuoc}
                        </Text>
                        <Text style = {{fontSize: 12, opacity:0.8}}>
                            {item.MST}
                        </Text>
                    </View>
                    <View style = {{position: 'absolute', right: 15}}>
                        <Icon source='chevron-left' size={20}></Icon>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        // margin: 10,
        alignItems: 'center',
    },
    buttonDelete: {
        width: 70,
        height: 70, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    buttonChange: {
        width: 70,
        height: 70, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white",
        width: '94%',
        margin: 10,
        padding: 10,
        height: 70,
        borderRadius: 5,
    }
})

export default DrugList;