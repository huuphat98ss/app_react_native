import React from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';

const TempStack = createStackNavigator();

//import SupportScreen from './SupportScreen';
import BatdauvuScreen from './BatdauvuScreen';
import PhunthuocScreen from './PhunthuocScreen';
import BookmarkScreen from './BookmarkScreen';
import SauhaiScreen from './Sauhai/SauhaiScreen';
import PhunthuocsauScreen from './Sauhai/PhunthuocsauScreen';
import DietsauScreen from './Sauhai/DietsauScreen';
import DemoCheckScreenQR from './QR/DemoCheckScreenQR';
import SauductraiScreen from './Sauhai/SauductraiScreen';
import RaybongxoaiScreen from './Sauhai/RaybongxoaiScreen';
import RepsapScreen from './Sauhai/RepsapScreen';
import ShowMap from './QR/ShowMap';
import RuiducquaScreen from './Sauhai/RuiducquaScreen';

const TempScreen = ({route, navigation}) => {
  const {initialState, name} = route.params;
  console.log('navigation' + JSON.stringify(navigation));
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
            component={PhunthuocScreen}
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
            name="Check QR"
            component={DemoCheckScreenQR}
            initialParams={{initialState: initialState}}
            options={{
              title: 'CheckQR',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Home'}],
                    });
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Show Map"
            component={ShowMap}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Show Map',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('Check QR');
                  }}></Icon.Button>
              ),
            }}
          />
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
                    // navigation.goBack();
                    navigation.navigate('Check QR');
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
    case 'Sâu hại':
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
            name="Sâu hại"
            component={SauhaiScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Sâu hại',
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
            name="Sâu đục trái"
            component={SauductraiScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Sâu đục trái',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('Sâu hại');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Rầy bông xoài"
            component={RaybongxoaiScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Rầy bông xoài',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('Sâu hại');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Rệp sáp"
            component={RepsapScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Rệp sáp',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('Sâu hại');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Ruồi đục quả xoài"
            component={RuiducquaScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Rùi đục quả',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('Sâu hại');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Phun thuốc sâu"
            component={PhunthuocsauScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Phun thuốc sâu',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('Sâu hại');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Diệt sâu"
            component={DietsauScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Diệt sâu',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('Sâu hại');
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
