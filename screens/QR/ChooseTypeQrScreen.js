import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-naưtive-animatable';

const ChooseTypeQrScreen = () => {
  const [chooseBy, handleChoose] = useState(0);
  const applyArray = ['Cả thửa', 'Chọn theo luống', 'Chọn theo cây'];
  let applyArrayRender = applyArray.map((arr, index) => (
    <View
      key={index}
      style={[styles.button, {flexDirection: 'row', padding: 30}]}>
      <TouchableOpacity
        onPress={() => handleChoose(arr)}
        style={styles.xitthuoc}>
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.xitthuoc}>
          <Text
            style={[
              styles.textSign,
              {
                color: '#fff',
              },
            ]}>
            {arr}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  ));
  return (
    <View style={styles.container}>
      <Animatable.View
        style={
          chooseBy === 0
            ? [
                styles.container,
                {justifyContent: 'center', alignItems: 'center'},
              ]
            : [
                styles.container,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                },
              ]
        }
        animation="fadeInUpBig">
        {/* {chooseButton} */}
        {/* {chooseBy === 0 ?  */}
        {applyArrayRender}
        {/*  : chooseButton}*/}
      </Animatable.View>
    </View>
  );
};

export default ChooseTypeQrScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    fontSize: 18,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  chonThua: {
    flexDirection: 'column',
    marginBottom: 5,
    marginTop: 5,
    // borderBottomWidth: 0.5,
    borderBottomColor: '#f1f1f1',
    justifyContent: 'center',
  },
  chonThuaItem: {
    flex: 1,
    alignSelf: 'stretch',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  xitthuoc: {
    flex: 1,
    alignSelf: 'stretch',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 10,
  },
});
