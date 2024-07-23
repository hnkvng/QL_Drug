import { ComponentJSX, ComponentProps } from "../../../services/type";
import { Icon, List, Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { theme } from "../../../services/theme";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import  Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import { View } from "react-native";
import { useState } from "react";
import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";

interface ListSearchProps {
    item: any,
}

const ListSearch : ComponentProps<ListSearchProps> = (
    {
        item
    }) : ComponentJSX => {

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
                translationX.value =  withTiming(-100);
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

    return (

        <View style = {styles.container}>
            <View 
                style = {{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute', 
                    right: "8%", 
                }}
            >
                
                <TouchableOpacity style = {styles.buttonChange}>
                    <Icon source= "pen" color = "white" size={20}></Icon>
                </TouchableOpacity >
                <TouchableOpacity style = {styles.buttonDelete}>
                    <Icon source= "delete" color = "white" size={20}></Icon>
                </TouchableOpacity>
            </View>
            
            
            <PanGestureHandler onGestureEvent={panGesture}>
                <Animated.View style = {[styles.item, rStyle]}>
                    <Text style = {{color: 'white'}}>{item.item.title}</Text>
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
        alignItems: 'center',
    },
    buttonDelete: {
        width: 50,
        height: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    buttonChange: {
        width: 50,
        height: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
    },
    item: {
        backgroundColor: theme.colors.mainColor,
        width: '90%',
        justifyContent: 'center',
        zIndex: 1000,
        paddingLeft: 20,
        height: 50,
        margin: 10,
        borderRadius: 5,
    }
})

export default ListSearch;