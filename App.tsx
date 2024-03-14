import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';
import store from './app/redux/store';
import MainScreen from './app/src/MainScreen';
import SearchScreen from './app/src/SearchDrugScreen';
import AddScreen from './app/src/AddDrugScreen';
import ScanBanerCodeScreen from './app/src/ScanBarCodeScreen';
import { RealmProvider } from '@realm/react';
import TrashScreen from './app/src/TrushDrugScreen';
import LoadingNotifi from './app/modal/Loading';
import Notification from './app/modal/Notifi';


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

export type RootStackParamList = {
    mainScreen: undefined,
    searchScreen: undefined,
    addScreen: undefined,
    trashScreen: undefined,
    scanScreen: undefined,
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
            </Stack.Navigator>
          </NavigationContainer>
        </RealmProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;