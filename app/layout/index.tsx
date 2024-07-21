import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../src/screen/HomeScreen';
import StorageScreen from '../src/screen/StorageScreen';
import HistoryScreen from '../src/screen/HistoryScreen';
import SellScreen from '../src/screen/SellScreen';
import { ComponentJSX } from '../src/services/type';

const Tab = createBottomTabNavigator();

const Layout = () : ComponentJSX => {
    return (
        <Tab.Navigator
            initialRouteName='Trang chủ'
            screenOptions={() => ({
                headerShown: false,
                tabBarActiveTintColor: '#1294AB',
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
                component={StorageScreen}  
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
export default Layout;