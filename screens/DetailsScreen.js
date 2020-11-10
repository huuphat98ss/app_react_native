import React from 'react';

import {View, Text, Button, StyleSheet, StatusBar} from 'react-native';
const DetailsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <StatusBar backgroundColor="#1f65ff" barStyle="light-content" /> */}
      <Text>Details Screen</Text>
      <Button
        title="Go to home"
        onPress={() => navigation.navigate('Home')}></Button>
      <Button title="Go to back" onPress={() => navigation.goBack()}></Button>
      <Button
        title="Go to first screen"
        onPress={() => navigation.popToTop()}></Button>
    </View>
  );
};

export default DetailsScreen;
