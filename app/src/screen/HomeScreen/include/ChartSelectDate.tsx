import { memo } from "react"
import { StyleSheet, View } from "react-native"
import { ComponentJSX, ComponentProps } from "../../../services/type"
import { Text, TouchableRipple } from "react-native-paper"
import { useCallback, useState } from "react"
import { theme } from "../../../services/theme"
import { useFocusEffect } from "@react-navigation/native"


interface ChartSelectDateProps {
    item: {
        name: string
        setBar: () => void,
    }[],
    dailyDate: string,
}

const ChartSelectDate : ComponentProps<ChartSelectDateProps> = ({
    item,
    dailyDate
    }) : ComponentJSX => {

    const [index, setIndex] = useState(0);
    
    useFocusEffect(
        useCallback(() => {
            setIndex(0);
        },[dailyDate])
    )

    return (
        <View style = {{display: 'flex', flexDirection: "row",}}>
            {item.map((item, i) => (
                <TouchableRipple
                    key={i}
                    onPress={() => {
                        setIndex(i);
                        item.setBar();
                    }}
                >
                    <Text 
                        style = {[
                            styles.date, 
                            i === index && {opacity: 1}
                        ]}
                    >
                        {item.name}
                    </Text>
                </TouchableRipple>      
            ))}
        </View>    
    )
}

const styles = StyleSheet.create({
    date: {
        width: 50, 
        textAlign: 'center',
        backgroundColor: theme.colors.mainColor,
        color: 'white',
        opacity: 0.6
    },
});

export default memo(ChartSelectDate);
