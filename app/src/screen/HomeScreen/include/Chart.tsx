import { Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Title } from "react-native-paper";
import {LineChart, } from "react-native-chart-kit";
import { theme } from "../../../services/theme";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { useCallback, useMemo, useState, memo} from "react";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { BAR_CHART, DATABASE } from "../../../services/config";
import { getDateString } from "../../../utils/changeDate";
import ChartSelectDate from "./ChartSelectDate";
import DatePicker from "../../../components/DatePicker";
import { formatNumberWithDots } from "../../../utils/formatNumber";
import { Alert } from "react-native";
import { Database } from "../../../services/db";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import notifiSlice from "../../../componentsSpecial/Notification/slice";



const chartConfig :  AbstractChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    decimalPlaces: 0,
    useShadowColorFromDataset: false,
};

interface SellDate {
    ngayTao: Date,
    soTien: number,
}


const Chart = () => {

    const dispatch = useDispatch();
    const db = useMemo(() => new Database(),[]);
    const [dataBar, setDataBar] = useState<ChartData>();
    const [dailyDate, setDailyDate] = useState(getDateString(new Date));
    const [openDate, setOpenDate] = useState(false);
    const [dataDate, setDataDate] = useState<SellDate[]>([]);
    const [screenWidth] = useState(Dimensions.get("window").width * 3);
    const [tableSell] = useState(['ngayTao, soTien']);
    const [nameSell] = useState(DATABASE.table.Sell.name)
    
    const handleError = notifiSlice.actions.handleError;

    const handleDataPointClick = useCallback((data : any) => {
        const { index, value } = data;
        if(dataBar) {
            Alert.alert(dataBar.labels[index], `Số tiền kiếm được: ${formatNumberWithDots(value)}₫`)
        }
        
    },[dataBar]);

    const handleYear = useCallback((
        date: string, 
        dataDate: SellDate[]
    ) : ChartData => {
        const year = new Date(date).getFullYear();

        const database  = dataDate.reduce((listData, item) => {
            if(item.ngayTao.getFullYear() === year) {
                listData.push({
                    month: item.ngayTao.getMonth() + 1,
                    money: item.soTien,
                })
            }   
            return listData;
        },[] as {month: number, money: number}[])
        
        const label = BAR_CHART.labels.year;
        const data = BAR_CHART.datas.year(database)
        return {
            labels: label,
            datasets: [
                {
                    data: data
                }
            ]
        }
    },[])
    
    const handleMonth = useCallback((
        dates: string, 
        dataDate: SellDate[]
    ) : ChartData => {
        const date = new Date(dates);
        const {month, year} = {month: date.getMonth(), year: date.getFullYear()};
        
        const database  = dataDate.reduce((listData, item) => {
            if(item.ngayTao.getFullYear() === year && item.ngayTao.getMonth() === month) {
                listData.push({
                    day: item.ngayTao.getDate(),
                    money: item.soTien,
                })
            }   
            return listData;
        },[] as {day: number, money: number}[])
        
        const label = BAR_CHART.labels.month(month, year);
        const data = BAR_CHART.datas.month( label, database);
        return {
            labels: label,
            datasets: [
                {
                    data: data
                }
            ]
        }
    },[])

    const handleDay = useCallback((
        dates: string, 
        dataDate: SellDate[]
    ) : ChartData => {

        const date = new Date(dates);
        const {day, month, year} = {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()};

        const database  = dataDate.reduce((listData, item) => {
            if(
            item.ngayTao.getFullYear() === year 
            && item.ngayTao.getMonth() === month 
            && item.ngayTao.getDate() === day
            ) {
                listData.push({
                    hours: item.ngayTao.getHours(),
                    money: item.soTien,
                })
            }   
            return listData;
        },[] as {hours: number, money: number}[])
        
        const label = BAR_CHART.labels.day;
        const data = BAR_CHART.datas.day(database);

        return {
            labels: label,
            datasets: [
                {
                    data: data
                }
            ]
        }
    },[])

    

    const listFocusDate = useMemo(() => [
        {
            name: 'Năm',
            setBar: () => setDataBar(handleYear(dailyDate, dataDate))
        },
        {
            name: 'Tháng',
            setBar: () => setDataBar(handleMonth(dailyDate, dataDate))
        },
        {
            name: 'Ngày',
            setBar: () => setDataBar(handleDay(dailyDate, dataDate))
        },
        
    ],[dailyDate, dataDate])

    useFocusEffect(
        useCallback(() => {
            db.getItem(tableSell, nameSell)
            .then((data : any) => {
                const item : SellDate[] = [];

                for(let index = 0; index < data.rows.length; index++) {
                    item.push({
                        ngayTao: new Date(data.rows.item(index).ngayTao),
                        soTien: data.rows.item(index).soTien,
                    })
                }

                setDataDate(item);
                setDataBar(handleYear(dailyDate, item));
            })
            .catch(() => {
                dispatch(handleError())
            })
        },[dailyDate])
    )

    return (
        <SafeAreaView style = {{ flex:1}}>
            <Title style = {styles.title}>Thống kê</Title>
            <View style = {{display: 'flex', flexDirection: "row"}}>
                <View style = {{ padding: 10, paddingBottom: 0}}>
                    <TouchableOpacity
                        onPress= {() => setOpenDate(true)}
                    >
                        <Text 
                            style = {{
                                borderTopRightRadius: 5,
                                borderTopLeftRadius: 5,
                                width: 150, 
                                textAlign: 'center',
                                backgroundColor: theme.colors.mainColor,
                                color: 'white'
                            }}
                        >
                            {dailyDate}
                        </Text>
                    </TouchableOpacity>
                    <ChartSelectDate
                        item={listFocusDate}
                        dailyDate= {dailyDate}
                    /> 
                </View>
            </View>
            <ScrollView horizontal style = {{marginLeft: 10}}>
                {dataBar && <LineChart
                    style={{backgroundColor: theme.colors.mainColor}}
                    data={dataBar}
                    width={screenWidth}
                    height={256}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    onDataPointClick={handleDataPointClick}
                    bezier
                />}
            </ScrollView>
            <DatePicker
                title= "Chọn ngày tháng năm"
                open = {openDate}
                setOpen= {setOpenDate}
                handleChange= {setDailyDate}
            />
        </SafeAreaView>
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
    title: {
        fontWeight: '500',
        padding: 20,
        paddingBottom: 0,
        paddingLeft: 10,
    },
});

export default memo(Chart);