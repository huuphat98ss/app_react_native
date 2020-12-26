import React from 'react';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

//Render Tab Footer
const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // activeColor="#fff"
      tabBarOptions={{
        activeTintColor: '#009387',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="ios-home" color="#009387" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#009387',
          tabBarIcon: ({color}) => (
            <Icon name="ios-notifications" color="#009387" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

//Render tab header
const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => {
                navigation.openDrawer();
              }}></Icon.Button>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = ({navigation}) => {
  return (
    <NotificationStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <NotificationStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'Notification',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => {
                navigation.openDrawer();
              }}></Icon.Button>
          ),
        }}
      />
    </NotificationStack.Navigator>
  );
};

export default MainTabScreen;
