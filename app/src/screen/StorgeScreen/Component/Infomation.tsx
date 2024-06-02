import React from "react";

import { Card, Text } from 'react-native-paper';
import { theme } from "../../../../../App";
import { StyleSheet } from "react-native";


const Infomation = () : React.JSX.Element => {

    const sumDrug = 20;
    const drugNeerExpire = 0;
    const drugExpire = 0;
    
    return (
        <Card style = {[styles.card,{backgroundColor: theme.colors.mainColor}]}>
            <Card.Title title='Thông tin' titleStyle = {styles.title}/>
            <Card.Content style = {{marginLeft: 20}}>
                <Text style = {{color: 'white'}}>Tổng số thuốc: {sumDrug}</Text>
                <Text style = {{color: 'white'}}>Thuốc gần hết hạn: {drugNeerExpire}</Text>
                <Text style = {{color: 'white'}}>Thuốc gần đã hết hạn: {drugExpire}</Text>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 15,
        marginBottom: 15,
        width: 320,
    },
    title: {
        fontWeight: '700', 
        fontSize: 18, 
        color: 'white'
    },
});


export default Infomation;