import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from './Contacts';
import HomeScreen from './HomePage';
import MessageScreen from './Message';
import MineScreen from './Mine';
import AppList from './AppList'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native';
import px2dp from '../util/DisplayUtil';

export default function Navigation({colorScheme}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'index') {
            let icon;
            icon = focused ? (
              <Image
                source={require('../resource/images/home_select.png')}
                style={{width: px2dp(30), height: px2dp(30)}}
              />
            ) : (
              <Image
                source={require('../resource/images/home_unselect.png')}
                style={{width: px2dp(30), height: px2dp(30)}}
              />
            );
            return icon;
          } else if (route.name === 'contact') {
            return <AntDesign name="cloudo" size={size} color={color} />;
          } else if (route.name === 'message') {
            return <AntDesign name="mail" size={size} color={color} />;
          } else if (route.name === 'mine') {
            return <AntDesign name="setting" size={size} color={color} />;
          }
        },
      })}>
      <Tab.Screen
        name="index"
        component={HomeScreen}
        options={{title: '首页', headerMode: 'none'}}
      />
      <Tab.Screen
        name="contact"
        component={ContactScreen}
        options={{title: 'Contact'}}
      />
      <Tab.Screen
        name="message"
        component={AppListNavigator}
        options={{title: '消息'}}
      />

      <Tab.Screen
        name="mine"
        component={MineNavigator}
        options={{title: '设置'}}
      />
    </Tab.Navigator>
  );
}
const Tab = createBottomTabNavigator();
const TabStack = createStackNavigator();


function HomeNavigator() {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerTitle: '首页',
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
    </TabStack.Navigator>
  );
}

function AppListNavigator() {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="appList"
        component={AppList}
        options={{
          headerTitle: '应用列表',
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
    </TabStack.Navigator>
  );
}

function ContactNavigator() {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="contact"
        component={ContactScreen}
        options={{
          headerTitle: 'contact',
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
    </TabStack.Navigator>
  );
}

function MessageNavigator() {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="message"
        component={MessageScreen}
        options={{
          headerTitle: '消息',
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
    </TabStack.Navigator>
  );
}

function MineNavigator() {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="mine"
        component={MineScreen}
        options={{
          headerTitle: '我是设置标题',
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
    </TabStack.Navigator>
  );
}
