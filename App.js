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
import SignInScreen from './screens/SignInScreen';
import {ActivityIndicator} from 'react-native-paper';
//import Login from './screens/Login';
import {AuthContext} from './components/context';
//import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {checkLogin, setloading} from './src/redux/actions/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {
  componentDidMount = async () => {
    //let {dispatch} = this.props;
    console.log('didmount');
    // await this.props.checkLogin();
    //   console.log(AsyncStorage.getItem('userToken'));
    let data = await AsyncStorage.getItem('userToken');
    if (data !== null) {
      console.log('login did');
      this.props.checkLogin(data);
      // dispatch(checkLogin(data));
    }
  };
  setreloading = () => {
    return this.props.setloading();
  };
  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      // remove error
    }
    console.log('Done.');
  };

  storeData = async () => {
    await AsyncStorage.setItem('userToken', 'phat');
  };

  getData = async () => {
    const data = await AsyncStorage.getItem('userToken');
    return data;
  };

  render() {
    console.log('app ' + this.props.isLogin);
    console.log(' login adtion ' + this.props.currentUser);
    console.log(' user name ' + this.props.loading);
    if (this.props.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <NavigationContainer>
        {/* { this.props.isLogin ? ( */}
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
          <SignInScreen />
        )}
      </NavigationContainer>
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
    loading: state.authReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (data) => dispatch(checkLogin(data)),
    setloading: () => dispatch(setloading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
