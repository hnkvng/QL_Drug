import {lazy, useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider, useDispatch } from 'react-redux';
import store from './app/src/redux/store';
import {RootStackParamList} from './app/src/services/stackNavigate'
import { ComponentJSX } from './app/src/services/type';
import { theme } from './app/src/services/theme';
import { PaperProvider, Text } from 'react-native-paper';
import Notification from './app/src/componentsSpecial/Notification';

import HomeScreen from './app/src/screen/HomeScreen';

const AddScreen = lazy(() =>  import('./app/src/screen/AddScreen'));
const UpdateScreen = lazy(() =>  import('./app/src/screen/UpdateScreen'));
const ScanBarCodeScreen = lazy(() => import( './app/src/screen/ScanBarScreen'));
const ImpactDrugScreen = lazy(() => import('./app/src/screen/ImpactDrugScreen'));
const SellScreen = lazy(() => import('./app/src/screen/SellScreen'));
const DrugScreen = lazy(() => import('./app/src/screen/DrugScreen'));
const DetailScreen = lazy(() => import('./app/src/screen/DetailScreen'));
const StorageScreen = lazy(() => import('./app/src/screen/StorageScreen'));
const AddOrReduceScreen = lazy(() => import('./app/src/screen/AddOrReduceScreen'));
// import { deleteDB, getDBConnection, getDrugItems } from './app/database/db-service';

import { deleteDB } from './app/src/services/db';
import { useNetInfo } from '@react-native-community/netinfo';
import notifiSlice from './app/src/componentsSpecial/Notification/slice';
import { Alert } from 'react-native';


const Stack = createStackNavigator<RootStackParamList>();

// deleteDB()

const App = () : ComponentJSX => {

  const netInfo = useNetInfo();
  const [connectInit, setConnetInit] = useState(netInfo.isConnected);
  const [info, setInfo] = useState('');
  
  useEffect(() => {
    if(netInfo.isConnected != null)
    if(netInfo.isConnected && connectInit != null) {
        setInfo('Đã có kết nối internet trở lại');
        setTimeout(() => setInfo(''),3000);
    } else if(!netInfo.isConnected) {
        console.warn('Không có kết nối internet');
        setConnetInit(false);
    }
  },[netInfo.isConnected]);

  return (
    <StoreProvider store={store} >
      <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName='homeScreen'
              screenOptions={{
                gestureDirection: 'horizontal',
                cardStyleInterpolator: ({ current, next, layouts }) => {
                  return {
                    cardStyle: {
                      transform: [
                        {
                          translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                          }),
                        },
                      ],
                    },
                  };
                }, 
              }}
            >
              <Stack.Screen options={{headerShown: false}} name='homeScreen' component={HomeScreen}/>
              <Stack.Screen options={{title: 'Thêm thuốc'}} name='addScreen' component={AddScreen}/>
              <Stack.Screen options={{title: 'Thay đổi'}} name= 'updateScreen' component={UpdateScreen}/>
              <Stack.Screen options={{title: 'Xóa/Thay đổi'}} name='impactScreen' component={ImpactDrugScreen}/>
              <Stack.Screen options={{title: 'Kho Thuốc'}} name='storageScreen' component={StorageScreen}/>
              <Stack.Screen options={{title: 'Thêm/Bớt'}} name='addOrReduceScreen' component={AddOrReduceScreen}/>
              <Stack.Screen options={{title: 'Bán Thuốc'}} name='sellScreen' component={SellScreen}/>
              <Stack.Screen options={{title: 'Thuốc'}} name='drugScreen' component={DrugScreen}/>
              <Stack.Screen options={{title: 'Chi tiết'}} name='detailScreen' component={DetailScreen}/>
              <Stack.Screen options={{title: 'Scan'}} name='scanScreen' component={ScanBarCodeScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
          <Notification/>
          {info && <Text style = {{backgroundColor: 'green', color: 'white', textAlign: 'center'}}>{info}</Text>}
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
