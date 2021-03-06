import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from '@react-navigation/stack';

const TempStack = createStackNavigator();

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
import BocatlaScreen from './Sauhai/BocatlaScreen';
import NhendoScreen from './Sauhai/NhendoScreen';
import BotriScreen from './Sauhai/BotriScreen';
import BonphanScreen from './BonphanScreen';
import BaotraiScreen from './BaotraiScreen';
import TuoinuocScreen from './TuoinuocScreen';
import ProfileScreen from './ProfileScreen';
import BenhHaiScreen from './BenhHaiScreen';
import CheckQrForBenh from './QR/CheckQrForBenh';
import ShowMapForBenh from './QR/ShowMapForBenh';
import * as actions from '../src/redux/actions/diary';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
const TempScreen = ({route, navigation}) => {
  // const dataQrDiary = useSelector(
  //   (state) => state.diaryReducer.dataScanQrdiary,
  // );
  /// const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(dataQrDiary);
  //   if (dataQrDiary !== null) {
  //     dispatch(actions.dataScanQr(null));
  //   }
  // });
  const {initialState, name} = route.params;
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
            name="CheckQR"
            component={DemoCheckScreenQR}
            initialParams={{initialState: initialState, name: name}}
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
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Show Map',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Bón phân"
            component={BonphanScreen}
            //initialParams={{initialState: initialState}}
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Bón phân',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{name: 'Home'}],
                    // });
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
        </TempStack.Navigator>
      );
      break;
    case 'Temp':
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
            name="Temp"
            component={ProfileScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Temp',
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
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Home'}],
                    });
                  }}></Icon.Button>
              ),
            }}
          />
        </TempStack.Navigator>
      );
      break;
    case 'Bao trái':
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
            name="CheckQR"
            component={DemoCheckScreenQR}
            initialParams={{initialState: initialState, name: name}}
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
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Show Map',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Bao trái"
            component={BaotraiScreen}
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Bao trái',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{name: 'Home'}],
                    // });
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
        </TempStack.Navigator>
      );
      break;
    case 'Tưới nước':
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
            name="CheckQR"
            component={DemoCheckScreenQR}
            initialParams={{initialState: initialState, name: name}}
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
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Show Map',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Tưới nước"
            component={TuoinuocScreen}
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Tưới nước',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{name: 'Home'}],
                    // });
                    navigation.navigate('CheckQR');
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
            name="CheckQR"
            component={DemoCheckScreenQR}
            initialParams={{initialState: initialState, name: name}}
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
                    //navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Show Map"
            component={ShowMap}
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Show Map',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Phun thuốc"
            component={PhunthuocScreen}
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Phun thuốc',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    //navigation.goBack();
                    navigation.navigate('CheckQR');
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
            name="CheckQR"
            component={DemoCheckScreenQR}
            initialParams={{initialState: initialState, name: name}}
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
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Show Map',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
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
                    //navigation.goBack();
                    navigation.navigate('CheckQR');
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
              title: 'Ruồi đục quả xoài',
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
            name="Bọ cắt lá"
            component={BocatlaScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Bọ cắt lá',
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
            name="Nhện đỏ"
            component={NhendoScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Nhện đỏ',
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
            name="Bọ trĩ"
            component={BotriScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Bọ trĩ',
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
    case 'Bệnh hại':
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
            name="CheckQR"
            component={DemoCheckScreenQR}
            initialParams={{initialState: initialState, name: name}}
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
                    //navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Show Map"
            component={ShowMap}
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Show Map',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Bệnh hại"
            component={BenhHaiScreen}
            initialParams={{initialState: initialState, name: name}}
            options={{
              title: 'Bệnh hại',
              headerLeft: () => (
                <Icon.Button
                  name="chevron-back-outline"
                  size={25}
                  backgroundColor="#009387"
                  onPress={() => {
                    //navigation.goBack();
                    navigation.navigate('CheckQR');
                  }}></Icon.Button>
              ),
            }}
          />
          <TempStack.Screen
            name="Xịt thuốc"
            component={BookmarkScreen}
            initialParams={{initialState: initialState}}
            options={{
              title: 'Hoàn tất ',
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
