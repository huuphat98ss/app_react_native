import React, {Component} from 'react';

import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

// const HomeScreen = ({navigation}) => {
class HomeScreen extends Component {
  componentDidMount = () => {
    try {
      let jsonValue = AsyncStorage.getItem('userToken');
      if (jsonValue !== null) {
        console.log('home' + JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log('read home error');
    }
  };
  render() {
    //const {navigation} = this.props;
    return (
      <Animatable.View
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        animation="fadeInUpBig">
        {/* <StatusBar backgroundColor="#009387" barStyle="light-content" /> */}
        <Text>Home Screen </Text>
        <Text>{this.props.currentUser.username}</Text>
        <Button
          title="Go to details screen"
          onPress={() => {
            this.props.navigation.navigate('Details');
          }}></Button>
      </Animatable.View>
    );
  }
}

//export default HomeScreen;
const mapStateToProps = (state) => {
  // console.log(state);
  // console.log(AsyncStorage.getItem('userToken'));
  return {
    currentUser: state.authReducer.currentUser,
    isLogin: state.authReducer.isLogin,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     checkLogin: () => dispatch(checkLogin()),
//   };
// };

export default connect(mapStateToProps, null)(HomeScreen);
