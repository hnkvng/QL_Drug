import {lazy} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';
import store from './app/src/redux/store';
import {RootStackParamList} from './app/src/services/stackNavigate'
import { ComponentJSX } from './app/src/services/type';
import { theme } from './app/src/services/theme';
import { PaperProvider } from 'react-native-paper';
import Notification from './app/src/componentsSpecial/Notification';

import HomeScreen from './app/src/screen/HomeScreen';

const AddScreen = lazy(() =>  import( './app/src/screen/AddScreen'));
const ScanBarCodeScreen = lazy(() => import( './app/src/screen/ScanBarScreen'));
const ImpactDrugScreen = lazy(() => import('./app/src/screen/ImpactDrugScreen'));
const SellScreen = lazy(() => import('./app/src/screen/SellScreen'));
const DrugScreen = lazy(() => import('./app/src/screen/DrugScreen'));
const DetailScreen = lazy(() => import('./app/src/screen/DetailScreen'));
// import { deleteDB, getDBConnection, getDrugItems } from './app/database/db-service';

import { deleteDB } from './app/src/services/db';




const Stack = createStackNavigator<RootStackParamList>();

// deleteDB()

// getDBConnection().then((db) => {
//   getDrugItems(db).then((data) => {
//     console.log(data);
//   })
// })
// .catch(() => {
//   console.log("Connecting Fail!");
// })

const App = () : ComponentJSX => {
  
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
              <Stack.Screen options={{title: 'Thêm thuốc', headerShown: false}} name='addScreen' component={AddScreen}/>
              <Stack.Screen options={{title: 'Xóa/Thay đổi'}} name='impactScreen' component={ImpactDrugScreen}/>
              <Stack.Screen options={{title: 'Bán Thuốc'}} name='sellScreen' component={SellScreen}/>
              <Stack.Screen options={{title: 'Thuốc'}} name='drugScreen' component={DrugScreen}/>
              <Stack.Screen options={{title: 'Chi tiết'}} name='detailScreen' component={DetailScreen}/>
              <Stack.Screen options={{title: 'Scan'}} name='scanScreen' component={ScanBarCodeScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
          <Notification/>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
