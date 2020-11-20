import React, {useState} from 'react';

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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import QRCodeScanner from 'react-native-qrcode-scanner';

const CheckQrScreen = ({navigation}) => {
  const [dataScan, handleData] = useState(0);
  const [dataArray, renderArray] = useState(() => {
    let dataArray = [];
    for (let i = 1; i <= 5; i++) {
      dataArray.push(i);
    }
    return dataArray;
  });
  function ifScaned(e) {
    handleData(e.data);
  }
  console.log('dataArray: ' + typeof dataArray);
  //   const temp = () => {
  //     for (i = 1; i <= 50; i++) {
  //       <TouchableOpacity
  //         onPress={() => {
  //         }}
  //         style={styles.chonThuaItem}>
  //         <LinearGradient
  //           colors={
  //             ['#08d4c4', '#01ab9d']
  //           }
  //           style={styles.chonThuaItem}>
  //           <Text
  //             style={[
  //               styles.textSign,
  //               {
  //                 color: '#fff',
  //               },
  //             ]}>
  //             {i}
  //           </Text>
  //         </LinearGradient>
  //       </TouchableOpacity>;
  //     }
  //   };
  console.log('dataScan' + dataScan);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {dataScan === 0 ? (
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
          <Animatable.View style={styles.footer} animation="fadeInUpBig">
            {/* {this.state.nameOfCooperative !== null ? ( */}
            <Animatable.View animation="fadeInLeft">
              <Text style={styles.title}>Kết quả tìm được</Text>
              <Text style={styles.text}>
                {/* {'Hợp tác xã: ' + this.state.nameOfCooperative} */}
                Huy
              </Text>
              <Text style={styles.text}>
                {/* {'Nông dân: ' + this.state.farmOwner} */}
                Huy
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    //   this.onPressLink(this.state.linkInfor);
                  }}>
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}>
                    <Text style={styles.textSign}>Xem Thêm</Text>
                    <MaterialIcons
                      name="navigate-next"
                      color="#fff"
                      size={20}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
            {/* ) : (
        <View>
          <Text style={styles.title}>Searching...</Text>
        </View>
      )} */}
          </Animatable.View>
        </View>
      ) : (
        <Animatable.View style={styles.container} animation="fadeInUpBig">
          <View style={styles.chonThua}>
            {dataArray.map((index, data) => 
              <TouchableOpacity
                onPress={() => {
                  // typeThuoc === 'Chai' ? handleType(0) : handleType('Chai');
                }}
                style={styles.chonThuaItem}
                key={index}>
                <LinearGradient
                  colors={
                    //   typeThuoc == 'Chai'
                    //     ? ['#01ab9d', '#008075']
                    // :
                    ['#08d4c4', '#01ab9d']
                  }
                  style={styles.chonThuaItem}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    {data}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity
              onPress={() => {
                // typeThuoc === 'Chai' ? handleType(0) : handleType('Chai');
              }}
              style={styles.chonThuaItem}>
              <LinearGradient
                colors={
                  //   typeThuoc == 'Chai'
                  //     ? ['#01ab9d', '#008075']
                  // :
                  ['#08d4c4', '#01ab9d']
                }
                style={styles.chonThuaItem}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Chai
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // typeThuoc === 'Chai' ? handleType(0) : handleType('Chai');
              }}
              style={styles.chonThuaItem}>
              <LinearGradient
                colors={
                  //   typeThuoc == 'Chai'
                  //     ? ['#01ab9d', '#008075']
                  // :
                  ['#08d4c4', '#01ab9d']
                }
                style={styles.chonThuaItem}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Chai
                </Text>
              </LinearGradient>
            </TouchableOpacity> */}
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

export default CheckQrScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
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
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f1f1',
    justifyContent: 'center',
  },
  chonThuaItem: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
