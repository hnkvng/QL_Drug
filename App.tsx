import React from 'react';
import 'react-native-gesture-handler';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as StoreProvider } from 'react-redux';
import store from './app/redux/store';
import { RootStackParamList } from './app/src/navigation/rootStack';
import Main from './app/src/layout/main';
import AddDrugScreen from './app/src/screen/AddDrugScreen';
import ScanBarCodeScreen from './app/src/screen/ScanBarCodeSreen';
import { deleteDB, getDBConnection, getDrugItems } from './app/database/db-service';


export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    mainColor: '#1294AB',
    bottom: 'white',
    primary: 'blue',
    secondary: 'yellow',
    error: 'red',
  },
};

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

function App(): React.JSX.Element {
  
  return (
    <StoreProvider store={store} >
      <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='main'>
              <Stack.Screen options={{headerShown:false}} name='main' component={Main}/>
              <Stack.Screen options={{title: 'Thêm thuốc'}}name='addScreen' component={AddDrugScreen}/>
              <Stack.Screen options={{title: 'Scan'}}name='scanScreen' component={ScanBarCodeScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
