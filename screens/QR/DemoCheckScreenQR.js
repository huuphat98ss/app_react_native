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
  Modal,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useSelector} from 'react-redux';

const DemoCheckScreenQR = ({navigation, route}) => {
  const arrayMapFarmer = useSelector((state) => state.authReducer.arrayMap);

  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const [dataScan, handleData] = useState(0);
  const [chooseBy, handleChoose] = useState(0);
  const [showModal, handleModal] = useState(false);
  const [arrayMapQR, handleMap] = useState([]);
  // array chon theo thua
  const [arrayStumps, handleStump] = useState([]);
  // getdataStumps
  const [getarrayStump, getStump] = useState([]);
  //console.log(arrayMapFarmer);
  //console.log('get data tem ' + route.params.initialState);
  function ifScaned(e) {
    //console.log('alalalalsdld ldlds');
    console.log(e.data);
    let arrayString = e.data.split('.');
    console.log(arrayString);
    handleMap(arrayString);
    if (arrayString[0] !== currentUser.data._id) {
      alert('QR ko dung');
      return;
    }

    handleData(e.data);
    console.log('goi array stumps tu server');
    arrayMapFarmer.filter((ele) => {
      if (arrayString[1] === ele._id) {
        return getStump(ele.stumps);
      }
    });
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
          // if (index === 3) {
          //   handleData(0);
          //   navigation.navigate('Show Map');
          handleChoose(arr);
          // }
          switch (index) {
            case 3:
              handleData(0);
              let dataStumpMap = getarrayStump.filter((ele) => {
                if (arrayMapQR[2] == ele.numberStumps) {
                  return ele;
                }
              });
              // console.log('33333');
              // console.log(dataStumpMap);
              navigation.navigate('Show Map', {
                dataStumpMap: dataStumpMap,
                arrayMapQR: arrayMapQR,
              });
              //handleChoose(arr);
              break;
            case 2:
              // handleChoose(arr);
              handleModal(true);
              break;
            case 1:
              // handleChoose(arr);
              console.log('call batch ' + arrayMapQR[1]);
              handleData(0);
              navigation.navigate(route.params.name, {
                title: 'allStumpinBatch',
                idBatch: arrayMapQR[1],
              });
              break;
            default:
              handleData(0);
              navigation.navigate(route.params.name, {title: 'allbatch'});
              break;
          }
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

  //let arrayStump = [1, 2, 3, 4, 5, 6, 7, 8];
  // let arrayStump = arrayMapFarmer.filter((ele) => {
  //   if (arrayMapQR[1] === ele._id) {
  //     return ele.stumps;
  //   }
  // });
  // console.log('chon thua');
  // console.log(getarrayStump);
  // button chon thua
  let SettingStump = getarrayStump.map((ele, index) => {
    return (
      //<View style={{flexDirection: 'column'}}>
      <View key={index} style={styles.modalText}>
        <TouchableOpacity
          onPress={() => {
            //handleSendScreen();
            if (arrayStumps.length !== 0) {
              let check = false;
              handleStump(
                arrayStumps.filter((e, index) => {
                  if (e.numberStumps === ele.numberStumps) {
                    check = true;
                  }
                  if (e.numberStumps !== ele.numberStumps) {
                    return e;
                  }
                }),
              );
              if (check) return;
            }
            handleStump((dataArray) => [
              ...dataArray,
              {numberStumps: ele.numberStumps},
            ]);
          }}>
          <LinearGradient
            //colors={['#08d4c4', '#01ab9d']}
            colors={
              checkPresskey(ele.numberStumps)
                ? ['#01ab9d', '#008075']
                : ['#08d4c4', '#01ab9d']
            }
            style={{borderRadius: 10, padding: 10}}>
            <Text style={styles.textStyle}>Thửa {ele.numberStumps}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      //</View>
    );
  });
  // event check stump
  function checkPresskey(data) {
    // console.log(checkPress);
    let check = false;
    arrayStumps.forEach((e) => {
      if (data === e.numberStumps) {
        check = true;
      }
    });
    return check;
  }

  // show model chon theo lo
  let modalConform = (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* <Text style={styles.modalText}>Hello World!</Text> */}
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {SettingStump}
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: '#2196F3',
              }}
              onPress={() => {
                handleModal(false);
              }}>
              <Text style={styles.textStyle}>hủy</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{...styles.openButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                if (arrayStumps.length !== 0) {
                  handleModal(false);
                  //console.log(arrayStumps);
                  navigation.navigate(route.params.name, {
                    arrayStumps: arrayStumps,
                    title: 'Stumps',
                    idBatch: arrayMapQR[1],
                  });
                }
                //console.log(arrayStumps);
              }}>
              <Text style={styles.textStyle}>tiếp</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          {showModal ? null : (
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
          )}
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
      {modalConform}
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
    padding: 25,
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
  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 10,
    textAlign: 'center',
  },
});
