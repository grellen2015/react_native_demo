import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNav from './TabNav';
import LoginScreen from './login';
import DetailScreen from './Details';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
const Stack = createStackNavigator();
import {AppState} from 'react-native';
import ShowH5Screen from './showH5Page';
import ShowWebPage from './ShowWebPage';
import ScanScreen from './ScanScreen';
import {useSelector} from 'react-redux';

export default function Navigation() {

  // Dynamic initial page
  const { initialPage} = useSelector(state => ({
    initialPage: state.SettingReducer.initialPage,
  }));

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialPage}>
        <Stack.Screen
          name="LoginScreen"

          component={LoginScreen}
          options={{title: '登录', headerShown: false}}
        />
        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{title: '首页', headerShown: false}}
        />

        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={({route, navigation}) => ({
            title: route.params.screenName,
          })}
        />

        <Stack.Screen
          name="showH5Page"
          component={ShowH5Screen}
          options={({route, navigation}) => ({
            title: 'h5Page',
          })}
        />

<Stack.Screen
          name="showWebPage"
          component={ShowWebPage}
          options={({route, navigation}) => ({
            title: 'webPage',
          })}
        />

        <Stack.Screen
          name="scanScreen"
          component={ScanScreen}
          options={({route, navigation}) => ({
            title: 'scan',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
