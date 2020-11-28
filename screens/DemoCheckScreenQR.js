import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import QRCodeScanner from 'react-native-qrcode-scanner';

const DemoCheckScreenQR = ({navigation, route}) => {
  const [dataScan, handleData] = useState(0);
  const [chooseBy, handleChoose] = useState(0);
  console.log('press ' + route.params.data);
  console.log('get data tem ' + route.params.initialState);
  function ifScaned(e) {
    handleData(e.data);
  }

  const applyArray = [
    'tất cả các lô',
    'hết lô này',
    'theo thửa',
    'chi tiết trong thửa',
  ];
  let applyArrayRender = applyArray.map((arr, index) => (
    <View key={index} style={styles.button}>
      <TouchableOpacity
        onPress={() => {
          handleData(0);
          navigation.navigate('Show Map');
          handleChoose(arr);
        }}
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
      <StatusBar backgroundColor="#009387" barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <QRCodeScanner
            containerStyle={{
              backgroundColor: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onRead={ifScaned}
            reactivate={true} // first time true
            permissionDialogMessage="need premission to Access Camera"
            reactivateTimeout={2000}
            showMarker={true}
            markerStyle={{borderColor: '#FFF', borderRadius: 10}}
          />
        </View>
        {dataScan !== 0 ? (
          <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <Animatable.View animation="fadeInLeft" style={{height: 300}}>
              <View>
                <Text>Thông tin thưa check</Text>
              </View>
              <ScrollView>{applyArrayRender}</ScrollView>
            </Animatable.View>
          </Animatable.View>
        ) : null}
      </View>
    </View>
  );
};

export default DemoCheckScreenQR;

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
    // alignItems: 'flex-end',
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    padding: 15,
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
    width: 55,
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
    marginTop: -20,
    marginBottom: 5,
    alignSelf: 'stretch',
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 1,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
