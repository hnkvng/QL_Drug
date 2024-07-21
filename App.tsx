import {lazy} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Provider as StoreProvider } from 'react-redux';
// import store from './app/redux/store';
import {RootStackParamList} from './app/src/services/stackNavigate'
import Layout from './app/layout';
import { ComponentJSX } from './app/src/services/type';
import { theme } from './app/src/services/theme';
import { PaperProvider } from 'react-native-paper';

const AddScreen = lazy(() =>  import( './app/src/screen/AddScreen'));
const ScanBarCodeScreen = lazy(() => import( './app/src/screen/ScanBarScreen'));
// const SearchDrugScreen = lazy(() => import( './app/src/screen/SearchDrugScreen'));
// import { deleteDB, getDBConnection, getDrugItems } from './app/database/db-service';

import { connectToDevTools } from "react-devtools-core";
// import { deleteDB } from './app/src/services/db';

if (__DEV__) {
  connectToDevTools({
    host: "localhost",
    port: 8081,
  });
}

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
    // <StoreProvider store={store} >
      <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName='layout'
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
              <Stack.Screen options={{headerShown:false}} name='layout' component={Layout}/>
              <Stack.Screen options={{title: 'Thêm thuốc'}} name='addScreen' component={AddScreen}/>
              {/* <Stack.Screen options={{title: 'Tìm kiếm thuốc'}}name='searchScreen' component={SearchDrugScreen}/> */}
              <Stack.Screen options={{title: 'Scan'}} name='scanScreen' component={ScanBarCodeScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
      </PaperProvider>
    // </StoreProvider>
  );
}

export default App;