import React, {Component} from 'react';

import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../model/Menu';
import styled from 'styled-components/native';
import HomeScreenComponent from './HomeScreenComponent';

// const HomeScreen = ({navigation}) => {
class HomeScreen extends Component {
  state = {
    name: '',
  };

  componentDidMount = async () => {
    console.log('is home');
    try {
      let jsonValue = await AsyncStorage.getItem('userToken');
      // let user = await AsyncStorage.getItem('userToken');
      console.log(jsonValue);
      console.log(typeof jsonValue);
      if (jsonValue !== null) {
        //  console.log('home say' + JSON.parse(jsonValue));
        console.log('home at ne');
        console.log(typeof jsonValue);
        let object = JSON.parse(jsonValue);
        console.log('dua ve object ');
        console.log(object.username);
        this.setState({
          name: object.username,
        });
      }
    } catch (error) {
      console.log('read home error');
    }
  };
  render() {
    //
    const VerticalScrollView = styled.ScrollView``;
    const HorizontalRow = styled.View`
      flex-direction: row;
      justify-content: space-evenly;
    `;

    let menuArray = [];
    let tempArray = [];
    let length = Menu.length;
    let temp = 0;
    for (let i = 0; i < length; i++) {
      if (temp <= 1) {
        tempArray.push(Menu[i]);
        temp++;
      } else {
        menuArray.push(tempArray);
        temp = 0;
        tempArray = [];
        tempArray.push(Menu[i]);
        temp++;
      }
    }
    menuArray.push(tempArray);

    let menus = menuArray.map((a, index) => (
      <HorizontalRow key={index}>
        {a.map((album) => (
          <HomeScreenComponent
            key={album.id}
            name={album.name}
            caption={album.caption}
            album={album.album}
            likes={album.likes}
            //navigation={navigation}
          />
        ))}
      </HorizontalRow>
    ));
    console.log('menus' + menus);
    //
    if (this.props.loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      // <Animatable.View
      //   style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      //   animation="fadeInUpBig">
      //   {/* <StatusBar backgroundColor="#009387" barStyle="light-content" /> */}
      //   <Text>Home Screen </Text>
      //   <Text>{'data redux ' + this.props.currentUser.username}</Text>
      //   <Text>{'data usertoken ' + this.state.name}</Text>
      //   <Button
      //     title="Go to details screen"
      //     onPress={async () => {
      //       // this.props.navigation.navigate('Details');
      //       try {
      //         await AsyncStorage.clear();
      //       } catch (e) {
      //         console.log('logout wtf');
      //       }
      //       console.log('logout at home');
      //     }}></Button>
      // </Animatable.View>
      <Animatable.View
        // style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        animation="fadeInUpBig">
        <VerticalScrollView>{menus}</VerticalScrollView>
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
    loading: state.authReducer.loading,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     checkLogin: () => dispatch(checkLogin()),
//   };
// };

export default connect(mapStateToProps, null)(HomeScreen);
