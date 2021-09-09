import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ContactScreen from './Contacts';
import HomeScreen from './HomePage';
import MessageScreen from './Message';
import MineScreen from './Mine';
import AppList from './AppList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image} from 'react-native';
import px2dp from '../util/DisplayUtil';
import {Icon} from 'react-native-elements';
import AnimatedIcon from '../component/AnimatedIcon';
import {useSelector, useDispatch} from 'react-redux';
import {INITIAL_PAGE} from '../redux/action/settingActionTypes'
export default function Navigation({colorScheme}) {

  const dispatch = useDispatch();
  /**
   * Save user info and init route page.
   */
  useEffect(() => {
    dispatch({
      type: INITIAL_PAGE,
      initialPage: 'TabNav',
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'index') {
            let icon;
            icon = focused ? (
              <AnimatedIcon iconName={'home'} />
            ) : (
              <Icon size={25} name={'home'} color={'#AFB0B2'} />
            );
            return icon;
          } else if (route.name === 'contact') {
            let icon;
            icon = focused ? (
              <AnimatedIcon iconName={'face'} />
            ) : (
              <Icon size={25} name={'face'} color={'#AFB0B2'} />
            );
            return icon;
          } else if (route.name === 'message') {
            let icon;
            icon = focused ? (
              <AnimatedIcon iconName={'chat'} />
            ) : (
              <Icon size={25} name={'chat'} color={'#AFB0B2'} />
            );
            return icon;
          } else if (route.name === 'mine') {
            let icon;
            icon = focused ? (
              <AnimatedIcon iconName={'settings'} />
            ) : (
              <Icon size={25} name={'settings'} color={'#AFB0B2'} />
            );
            return icon;
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
        options={{title: '应用'}}
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
          headerTitle: '应用',
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
          headerTitle: '我是标题',
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
    </TabStack.Navigator>
  );
}
