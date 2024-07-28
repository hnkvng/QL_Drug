import { ComponentJSX, ComponentProps } from "../../../services/type";
import { Icon, Text } from 'react-native-paper';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { theme } from "../../../services/theme";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import  Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from 'react-native-reanimated';
import { View } from "react-native";

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
                    right: 0, 
                }}
            >
                <TouchableOpacity style = {styles.buttonChange} onPress={() => {translationX.value = withTiming(0)}}>
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
                    width: "50.2%",
                    height: 70,
                    backgroundColor: theme.colors.mainColor,
                    opacity: 0.5,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                }}>
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
        backgroundColor: theme.colors.mainColor,
        width: '95%',
        // marginLeft: 10,
        marginRight: 30,
        justifyContent: 'center',
        paddingLeft: 20,
        height: 70,
        borderRadius: 5,
    }
})

export default ListSearch;