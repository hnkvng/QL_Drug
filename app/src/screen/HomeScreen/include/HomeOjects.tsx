import React from "react";
import { Title } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import { theme } from '../../../services/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native-gesture-handler";

const Ojects = () : React.JSX.Element => {
    const iconSize = 50;
    return (
        <View>
            <View>
                <Title style = {styles.title}>Thành phần</Title>
            </View>
            <View style = {{padding: 15, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <View style = {styles.conSurface}>
                    <TouchableOpacity style={[styles.surface,{backgroundColor: theme.colors.mainColor}]}>
                        <Icon name="delete-outline" size={iconSize}/>
                    </TouchableOpacity >
                    <Text style = {{marginTop: 5}}>Thùng rác</Text>
                </View>
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontWeight: '500',
        padding: 20,
    },
    conSurface: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems:'center', 
        margin: 10, 
        marginTop: 0,
    },
    surface: {
        elevation: 4,
        padding: 8,
        height: 90,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
    },
});
export default Ojects;