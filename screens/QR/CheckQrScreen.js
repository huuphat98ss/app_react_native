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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import QRCodeScanner from 'react-native-qrcode-scanner';

const CheckQrScreen = ({navigation}) => {
  const [dataScan, handleData] = useState(0);
  const [choosenArray, handleChoosenArray] = useState([]);
  // const [isChoose , handleIsChoose] = useState(0);
  const [dataArray, renderArray] = useState(() => {
    let dataArray = [];
    let tempArray = [];
    let length = 50;
    let temp = 1;
    for (let i = 1; i <= length; i++) {
      if (temp <= 10) {
        tempArray.push(i);
        temp++;
      } else {
        dataArray.push(tempArray);
        temp = 1;
        tempArray = [];
        // tempArray.push(i%10);
        tempArray.push(i);
        temp++;
      }
    }
    dataArray.push(tempArray);
    dataArray.unshift([
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'H7',
      'H8',
      'H9',
      'H10',
    ]);
    return dataArray;
  });
  function ifScaned(e) {
    handleData(e.data);
    navigation.navigate('Choose QR');
    handleData(0);
  }
  console.log(dataArray);
  function handlePress(inData, index) {
    let tempArray = choosenArray;
    let column = inData % 10 === 0
    ? Math.floor(inData / 10)
    : Math.floor(inData / 10) + 1;
    let row = `${index + 1}`
    console.log(column, row);
    tempArray.push([column, row]);
    handleChoosenArray(tempArray);
  }

  function handlePress1(index) {
    let tempArr = choosenArray;
    tempArr.push([dataArray[index]])
    handleChoosenArray("tempArr"+tempArr);
  }

  let chooseButton = dataArray.map((data, index) => (
    <View key={index} style={styles.chonThua}>
      <TouchableOpacity
        key={index}
        onPress={() => handlePress1(index)}
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
            C{index}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      {data.map((inData, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {handlePress(inData, index), handleIsChoose(1)}}
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
              {inData % 10 == 0
                ? 10
                : typeof inData !== 'number'
                ? inData
                : inData % 10}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  ));

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
                    // this.onPressLink(this.state.linkInfor);
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
        <Animatable.View
          style={
            // chooseBy === 0
            //   ? [
            //       styles.container,
            //       {justifyContent: 'center', alignItems: 'center'},
            //     ]
            //   : 
              [
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
          {chooseButton}
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
