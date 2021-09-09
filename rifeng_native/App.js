/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { View, Text } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNav from './app/pages/TabNav';
import LoginScreen from './app/pages/login';
import DetailScreen from './app/pages/Details';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const Stack = createStackNavigator();
import { AppState } from "react-native";
import configureStore from "./app/redux/store/store";
import ShowH5Screen from './app/pages/showH5Page'
import ScanScreen from './app/pages/ScanScreen';
import { useSelector } from "react-redux";
import Navigation from './app/pages/Navigation'
// 引入 redux 及 redux-persist 配置后的变量供使用
const { store, persist } = configureStore();

function App() {

    // Dynamic initial page
   
    useEffect(() => {
        // 监听app状态：后台挂起，杀死或者活动
        AppState.addEventListener("change", _handleAppStateChange);
      }, []);
      function _handleAppStateChange(nextAppState) {
        if (nextAppState == "inactive") {
          console.log("挂起");
        } else if (nextAppState == "active") {
          console.log("进入");
        } else {
          console.log("app杀死");
        }
      }
  

    return (
         // 外层需 Provider 包裹， PersistGate 中的 loading 需为一个组件，否则在启动页后会有短暂黑屏
    <Provider store={store}>
         <PersistGate loading={null} persistor={persist}>
            <Navigation />
         </PersistGate>
    </Provider>
    );
}

export default App;