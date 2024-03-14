import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomePage from './HomePage';
import DrugPage from './DrugPage';
import SellPage from './SellPage';
import HistoryPage from './HistoryPage';
import NotifiPage from './NotifiPage';
import { useFocusEffect } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

function MainScreen() : React.JSX.Element {
    
    return (
        <Tab.Navigator
            initialRouteName='Trang chủ'
        >
            <Tab.Screen 
                name="Trang chủ" 
                component={HomePage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ), 
                    headerShown:false,
                }}
            />
            <Tab.Screen 
                name="Thuốc" 
                component={DrugPage}  
                options={{ 
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="medical-bag" color={color} size={size}/>
                    ), 
                    unmountOnBlur: true,
                    headerShown:false,
                }}
                
            />
            <Tab.Screen 
                name="Bán hàng" 
                component={SellPage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cash-register" color={color} size={size} />
                    ), 
                    headerShown:false,
                }}
            />
            <Tab.Screen 
                name="Lịch sử" 
                component={HistoryPage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="timer-outline" color={color} size={size} />
                    ), 
                    headerShown:false,
                }}
            />
            <Tab.Screen 
                name="Thông báo" 
                component={NotifiPage} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="bell-ring" color={color} size={size} />
                    ), 
                    headerShown:false,
                }}
            />
        </Tab.Navigator>
    );
}
export default MainScreen;