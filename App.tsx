import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';
import store from './app/redux/store';
import MainScreen from './app/src/screen/MainScreen';
import SearchScreen from './app/src/screen/SearchDrugScreen';
import AddScreen from './app/src/screen/AddDrugScreen';
import ScanBanerCodeScreen from './app/src/screen/ScanBarCodeScreen';
import { RealmProvider } from '@realm/react';
import TrashScreen from './app/src/screen/TrushDrugScreen';
import LoadingNotifi from './app/src/Component/Loading';
import Notification from './app/src/Component/Notifi';
import { RootStackParamList } from './app/navigation/stack/rootStackParamlist';
import DetailDrugScreen from './app/src/screen/DetailDrugScreen';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    bottom: 'white',
    primary: 'blue',
    secondary: 'yellow',
    error: 'red',
  },
};



const Stack = createStackNavigator<RootStackParamList>();

// import Realm from 'realm';
// import { configDrug } from './app/models';

// Realm.deleteFile(configDrug)


function App(): React.JSX.Element {
  return (
    <StoreProvider store={store} >
      <LoadingNotifi/>
      <Notification/>
      <PaperProvider theme={theme}>
        <RealmProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='mainScreen'>
              <Stack.Screen options={{headerShown:false}} name='mainScreen' component={MainScreen}/>
              <Stack.Screen options={{ title: 'Tìm kiếm thuốc' }} name='searchScreen' component={SearchScreen}/>
              <Stack.Screen options={{ title: 'Thêm thuốc'}} name='addScreen' component={AddScreen}/>
              <Stack.Screen options={{ title: 'Thùng rác' }} name='trashScreen' component={TrashScreen}/>
              <Stack.Screen options={{ title: 'Scan'}} name='scanScreen' component={ScanBanerCodeScreen}/>
              <Stack.Screen options={{ title: 'Chi tiết sản phẩm'}} name='detailScreen' component={DetailDrugScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </RealmProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;