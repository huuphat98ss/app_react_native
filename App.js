/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import React, {useEffect} from 'react';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTabScreen from './screens/MainTabScreen';
const Drawer = createDrawerNavigator();

import {DrawerContent} from './screens/DrawerContent';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import CheckProduct from './screens/CheckProduct';
import RootStackScreen from './screens/RootStackScreen';
import {ActivityIndicator} from 'react-native-paper';

import {AuthContext} from './components/context';
//import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {checkLogin} from './src/redux/actions/auth';
class App extends Component {
  // state = {
  //   login: false,
  // };
  componentDidMount = () => {
    this.props.checkLogin();
  };

  render() {
    console.log('app ' + this.props.isLogin);
    // this.props.currentUser
    return (
      // <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {this.props.isLogin ? (
          <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={MainTabScreen} />
            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
            <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
            <Drawer.Screen name="CheckProduct" component={CheckProduct} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
      // </AuthContext.Provider>
    );
  }
}
const styles = StyleSheet.create({});

//export default App;
const mapStateToProps = (state) => {
  // console.log(state);
  // console.log(AsyncStorage.getItem('userToken'));
  return {
    currentUser: state.authReducer.currentUser,
    isLogin: state.authReducer.isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
