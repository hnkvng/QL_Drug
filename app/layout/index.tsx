import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../src/screen/HomeScreen';
import DrugScreen from '../src/screen/DrugScreen';
import HistoryScreen from '../src/screen/HistoryScreen';
import SellScreen from '../src/screen/SellScreen';
import { ComponentJSX } from '../src/services/type';
import { Text } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { theme } from '../src/services/theme';
import ScanBarCodeScreen from '../src/screen/ScanBarScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderTitle from './HeaderTitle';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        style = {{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            borderRadius: 35,
            
        }}
        onPress={onPress}
    >
        <View
            style = {{
                width: 60,
                height: 60,
                borderRadius: 35,
                backgroundColor: theme.colors.mainColor,
                ...styles.shadow,
            }}
        >
            {children}
        </View>
    </TouchableOpacity>
)

const Layout = () : ComponentJSX => {
    return (
        <SafeAreaView style = {{flex: 1}}>
            <Tab.Navigator
                initialRouteName='Trang chủ'
                screenOptions={() => ({
                    tabBarShowLabel: false,
                    unmountOnBlur: true,
                    lazy: true,
                    headerTitleStyle: {
                        color: 'white'
                    },
                    headerTitleContainerStyle: {
                        width: "100%",
                        height: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    headerStyle: {
                        height: 100,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: theme.colors.mainColor,
                        shadowColor: '#000',
                        elevation: 25,
                    },
                    tabBarActiveTintColor: '#1294AB',
                    tabBarStyle: {
                        right: 20,
                        height: 80,
                        ...styles.shadow,
                    },
                })}
            >
                <Tab.Screen 
                    name="Trang chủ" 
                    component={HomeScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <>
                                <Icon name="home" color={color} size={size} />
                                <Text style = {{fontSize: 12}}>Trang chủ</Text>
                            </>
                            
                        ),  
                    }}
                />
                <Tab.Screen 
                    name="Sản phẩm" 
                    component={DrugScreen}  
                    options={{ 
                        tabBarIcon: ({ color, size }) => (
                            <>
                                <Icon name="store" color={color} size={size} />
                                <Text style = {{fontSize: 12}}>Sản phẩm</Text>
                            </>
                        ), 
                    }}
                    
                />
                {/* <Tab.Screen 
                    name="barCode" 
                    component={ScanBarCodeScreen}  
                    options={{ 
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon name="barcode-scan" color={'white'} size={35} />
                        ), 
                        tabBarButton: ({children, onPress}) => (
                            <CustomTabBarButton children={children} onPress={onPress}/>
                        ),
                        
                        tabBarStyle: {
                            display: 'none',
                        },
                        headerShown:false,
                    }}
                    
                /> */}
                <Tab.Screen 
                    name="Lịch sử" 
                    component={SellScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <>
                                <Icon name="history" color={color} size={size} />
                                <Text style = {{fontSize: 12}}>Lịch sứ</Text>
                            </>
                        ), 
                    }}
                />
                <Tab.Screen 
                    name="Bán hàng" 
                    component={HistoryScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <>
                                <Icon name="cash-register"  color={color} size={size} />
                                <Text style = {{fontSize: 12}}>Bán hàng</Text>
                            </>
                            
                        ), 
                    }}
                />
                
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3.5,
        elevation: 5
    }
})


export default Layout;