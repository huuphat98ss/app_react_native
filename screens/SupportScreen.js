import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

//import {createStackNavigator} from '@react-navigation/stack';
import {Header} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';

import {useNavigation} from '@react-navigation/native';
const SupportScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header
        leftComponent={
          <Icon
            name="chevron-back-outline"
            color="#fff"
            size={26}
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={{text: 'SUPPORT', style: {color: '#fff'}}}
        // rightComponent={{icon: 'home', color: '#fff'}}
        containerStyle={{
          backgroundColor: '#009387',
          // justifyContent: 'space-around',
        }}
      />
      <View style={styles.container}>
        <Text>Support Screen</Text>
        <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    //flexDirection: 'column',
    //justifyContent: 'space-between',
    // flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
});
