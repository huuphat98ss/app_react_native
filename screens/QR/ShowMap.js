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

const ShowMap = ({navigation, route}) => {
  console.log('alo');
  console.log(route.params.dataStumpMap);
  const dataMap = route.params.dataStumpMap[0];
  console.log(dataMap);
  // const row = dataMap.row;
  // const col =dataMap.col;
  // const total = dataMap.totalTree;
  const [dataArray, renderArray] = useState(() => {
    let dataArray = [];
    let tempArray = [];
    let length = dataMap.totalTree;
    let temp = 1;
    for (let i = 1; i <= length; i++) {
      if (temp <= dataMap.row) {
        tempArray.push(temp);
        temp++;
      } else {
        dataArray.push(tempArray);
        temp = 1;
        tempArray = [];
        tempArray.push(i % dataMap.row);
        temp++;
      }
    }
    dataArray.push(tempArray);
    let dataH = [];
    for (let i = 1; i <= dataMap.row; i++) {
      let dataIndex = 'H' + i;
      dataH.push(dataIndex);
    }
    dataArray.unshift(dataH);
    // dataArray.unshift([
    //   'H1',
    //   'H2',
    //   'H3',
    //   'H4',
    //   'H5',
    //   'H6',
    //   'H7',
    //   'H8',
    //   'H9',
    //   'H10',
    // ]);
    return dataArray;
  });
  //const [chooseBy, handleChoose] = useState(0);
  const [checkPress, handleCheck] = useState([]);
  // useEffect(() => {
  //   renderArray(dataMap.row, dataMap.col, dataMap.totalTree);
  // });
  // one press
  function handlePress(stay, col) {
    console.log('press stt ' + stay + ' + cot ' + col);
    console.log(typeof (stay + col.toString() + stay));
    console.log(checkPress);
    if (checkPress.length !== 0) {
      console.log('alo');
      let check = false;
      let datarefresh = [];
      if (col === 0) {
        const res = parseInt(stay.slice(1));
        //  console.log(res);
        let newarray = checkPress.filter((item) => {
          if (item.default == stay + col.toString() + stay) {
            check = true;
          }
          if (item.default != stay + col.toString() + stay) {
            return item;
          }
        });
        checkPress.forEach((e, index) => {
          newarray = newarray.filter((item) => {
            if (item.default != res + (index + 1).toString() + res) {
              //console.log(item);
              return item;
            }
          });
        });
        datarefresh = newarray;
      } else {
        datarefresh = checkPress.filter((item) => {
          if (item.default == stay + col.toString() + stay) {
            check = true;
          }
          if (item.default != stay + col.toString() + stay) {
            return item;
          }
        });
      }
      console.log(datarefresh);
      handleCheck(datarefresh);
      if (check) return;
    }

    console.log('end ');
    // console.log(checkPress);
    if (col === 0) {
      const res = parseInt(stay.slice(1));
      dataArray.forEach((e, index) => {
        e.map((ele) => {
          if (ele === res) {
            console.log(ele + ' + ' + index);
            handleCheck((oldArray) => [
              ...oldArray,
              {
                row: ele,
                col: index,
                stt: ele,
                default: ele + index.toString() + ele,
              },
            ]);
          }
        });
      });
    }

    handleCheck((oldArray) => [
      ...oldArray,
      {row: stay, col: col, stt: stay, default: stay + col.toString() + stay},
    ]);
    //console.log(checkPress);
    // navigation.navigate('Chuẩn bị thuốc', {stayhere: stay, colhere: col});
  }
  // all press col
  function handlePressAllCol(col) {
    console.log('press cot ' + col);
    if (checkPress.length !== 0) {
      console.log('alo');
      let check = false;
      dataArray.forEach((e, index) => {
        if (index === col) {
          let arraydata = checkPress;
          e.forEach((ele) => {
            arraydata = arraydata.filter((item) => {
              if (item.default === ele + col.toString() + ele) {
                check = true;
              }
              if (item.default !== ele + col.toString() + ele) {
                return item;
              }
            });
          });
          handleCheck(arraydata);
        }
      });
      if (check) {
        return;
      }
    }
    dataArray.forEach((e, index) => {
      if (index === col) {
        e.map((ele) => {
          handleCheck((oldArray) => [
            ...oldArray,
            {row: ele, col: col, stt: ele, default: ele + col.toString() + ele},
          ]);
        });
      }
    });
    // handleCheck((oldArray) => [...oldArray, data]);
    // navigation.navigate('Chuẩn bị thuốc', {stayhere: stay, colhere: col});
  }
  //check press
  function checkPresskey(data) {
    // console.log(checkPress);
    let check = false;
    checkPress.forEach((e) => {
      if (e.row === data.row && e.col === data.col) {
        check = true;
      }
    });
    return check;
  }
  function handleSendScreen() {
    console.log('submit');
    const newArray = checkPress.filter((item, index) => {
      if (item.col !== 0) {
        //console.log(item);
        return item;
      }
    });
    const seen = new Set();
    const LastArray = newArray.filter((el) => {
      const duplicate = seen.has(el.default);
      seen.add(el.default);
      return !duplicate;
    });
    const dataRusult = LastArray.filter((ele) => {
      delete ele.default;
      return ele;
    });
    console.log(LastArray);
    navigation.navigate(route.params.name, {
      arrayChecked: dataRusult,
      title: 'detailStump',
      idBatch: route.params.arrayMapQR[1],
      isStump: route.params.arrayMapQR[2],
    });
  }
  console.log('data create');
  console.log(checkPress);
  let chooseButton = dataArray.map((data, inx) => (
    <View key={inx} style={styles.chonThua}>
      <TouchableOpacity
        key={inx}
        onPress={() => {
          // typeThuoc === 'Chai' ? handleType(0) : handleType('Chai');
          if (inx !== 0) {
            handlePressAllCol(inx);
          }
        }}
        style={styles.chonThuaItem}>
        <LinearGradient
          colors={
            // checkPresskey({row: data.length, col: inx, stt: data.length})
            //   ? ['#01ab9d', '#008075']
            //   : ['#08d4c4', '#01ab9d']
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
            C{inx}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      {data.map((inData, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(inData, inx)}
          style={styles.chonThuaItem}>
          <LinearGradient
            colors={
              checkPresskey({row: inData, col: inx, stt: inData})
                ? ['#01ab9d', '#008075']
                : ['#08d4c4', '#01ab9d']
            }
            style={styles.chonThuaItem}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
              {inData}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  ));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <ScrollView>
        <View
          style={
            // (styles.container,
            {
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }
            //)
          }>
          {chooseButton}
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              handleSendScreen();
            }}
            style={styles.signIn}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Next
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShowMap;
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
