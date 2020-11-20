import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';

const TempStack = createStackNavigator();

import SupportScreen from './SupportScreen';
import BatdauvuScreen from './BatdauvuScreen';
import PhunthuocScreen from './PhunthuocScreen';
import BookmarkScreen from './BookmarkScreen';


const TempScreen = ({route, navigation}) => {
  const {initialState, name} = route.params;
  console.log(name);
  let navTo = null;
  switch (name) {
    case 'Bón phân':
      navTo = (
        <TempStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <TempStack.Screen
            name="Support"
            component={SupportScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Bón phân',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.goBack();
                  }}></Icon.Button>
              ),
            }}
          />
        </TempStack.Navigator>
      );
      break;
    case 'Bắt đầu vụ':
      navTo = (
        <TempStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <TempStack.Screen
            name="Bắt đầu vụ"
            component={BatdauvuScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Bắt đầu vụ',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.goBack();
                  }}></Icon.Button>
              ),
            }}
          />
        </TempStack.Navigator>
      );
      break;
    case 'Phun thuốc':
      navTo = (
        <TempStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <TempStack.Screen
            name="Chuẩn bị thuốc"
            component={PhunthuocScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Chuẩn bị thuốc',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.goBack();
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Xịt thuốc"
            component={BookmarkScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Xịt thuốc',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('Chuẩn bị thuốc');
                  }}></Icon.Button>
              ),
            }}
          />
        </TempStack.Navigator>
      );
      break;
    default:
      navTo = null;
      break;
  }
  console.log('navTo' + navTo);
  return navTo;
};
export default TempScreen;

// const styles = StyleSheet.create({
//   container: {
//     //flexDirection: 'column',
//     //justifyContent: 'space-between',
//     // flex: 1,
//     alignItems: 'center',
//     //justifyContent: 'center',
//   },
// });
