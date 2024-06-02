import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screen/HomeScreen';
import StorgeScreen from '../screen/StorgeScreen';
import HistoryScreen from '../screen/HistoryScreen';
import SellScreen from '../screen/SellScreen';
import { theme } from '../../../App';
const Tab = createBottomTabNavigator();

function Main() : React.JSX.Element {
    return (
        <Tab.Navigator
            initialRouteName='Trang chủ'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: theme.colors.mainColor,
                tabBarItemStyle: {
                    marginTop:10,
                },
                tabBarStyle: {
                  height: 70,
                  paddingHorizontal: 5,
                  paddingTop: 0,
                  borderTopWidth: 0,
                },
            })}
        >
            <Tab.Screen 
                name="Trang chủ" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ), 
                    headerShown:false,
                }}
            />
            <Tab.Screen 
                name="Kho" 
                component={StorgeScreen}  
                options={{ 
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="store" color={color} size={size}/>
                    ), 
                    unmountOnBlur: true,
                    headerShown:false,
                }}
                
            />
            <Tab.Screen 
                name="Lịch sử" 
                component={SellScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="history" color={color} size={size} />
                    ), 
                    headerShown:false,
                }}
            />
            <Tab.Screen 
                name="Bán hàng" 
                component={HistoryScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="cash-register" color={color} size={size} />
                    ), 
                    headerShown:false,
                }}
            />
            
        </Tab.Navigator>
    );
}
export default Main;