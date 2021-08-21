/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNav from './app/pages/TabNav';
import LoginScreen from './app/pages/login';
import DetailScreen from './app/pages/Details';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
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
    </Stack.Navigator>
    </NavigationContainer>
    );
}

export default App;