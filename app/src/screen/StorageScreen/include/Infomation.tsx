import React, { useEffect, useState } from "react";
import { Card, Text } from 'react-native-paper';
import { theme } from "../../../services/theme";
import { StyleSheet } from "react-native";
import { getDBConnection, getMemberDrug } from "../../../services/db";


const Infomation = () : React.JSX.Element => {

    const [sumDrug, setSumDrug] = useState(0);
    const [stilldate, setStilldate] = useState(0);
    const [almostExpire, setAlmostExpire] = useState(0);
    const [expire, setExpire] = useState(0);

    useEffect(() => {
        const db = getDBConnection();
        db.then((schema) => {
            getMemberDrug(schema).then((data) => {
                setSumDrug(data.stilldate + data.expired + data.almostExpired)
                setStilldate(data.stilldate);
                setExpire(data.expired);
                setAlmostExpire(data.almostExpired);
            })
        })
    },[])

    
    return (
        <Card style = {[styles.card,{backgroundColor: theme.colors.mainColor}]}>
            <Card.Title title='Thông tin' titleStyle = {styles.title}/>
            <Card.Content style = {{marginLeft: 20}}>
                <Text style = {{color: 'white'}}>Tổng số thuốc: {sumDrug}</Text>
                <Text style = {{color: 'white'}}>Thuốc gần còn hạn: {stilldate}</Text>
                <Text style = {{color: 'white'}}>Thuốc gần hết hạn: {almostExpire}</Text>
                <Text style = {{color: 'white'}}>Thuốc đã hết hạn: {expire}</Text>
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