import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Menu from '../model/Menu';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import * as actions from '../src/redux/actions/diary';
import * as Animatable from 'react-native-animatable';

const NotificationScreen = ({route}) => {
  // const currentUser = useSelector((state) => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const dataCheckNotifi = useSelector(
    (state) => state.authReducer.dataCheckNotifi,
  );
  const idSeason = useSelector((state) => state.authReducer.idSeason);
  //console.log(Menu[5]);
  console.log('screen notifi');
  // console.log(dataCheckNotifi);
  let startDate = '2020-12-01';
  let newD = moment(startDate, 'YYYY-MM-DD');
  newD.add(10, 'days');
  // console.log(newD.format('YYYY-MM-DD'));
  const navigation = useNavigation();
  const giaodoan = [
    {
      name: 'Giai đoạn 7-10 NSKĐT',
      // date: {from: 7, to: 10},
      screen: 'Bón phân',
      position: 1,
      type: ['NPK (16-16-8)', 'NPK (20-20-15)', 'Đạm', 'Lân', 'Kali', 'Canxi'],
      //  w: 'bonphan',
    },
    {
      name: 'Giai đoạn 30 NSKĐT',
      // date: {from: 30, to: 35},
      position: 5,
      screen: 'Phun thuốc',
      //  w: 'phunthuoc',
    },
    {
      name: 'Giai đoạn 30-45 NSKĐT',
      //  date: {from: 30, to: 45},
      screen: 'Bao trái',
      position: 7,
      //   w: 'Baotrai',
    },
    {
      name: 'Giai đoạn 45 NSKĐT',
      //  date: {from: 45, to: 50},
      position: 1,
      screen: 'Bón phân',
      // w: 'bonphan',
    },
    {
      name: 'Giai đoạn 45 NSKĐT',
      //   date: {from: 45, to: 50},
      position: 5,
      screen: 'Phun thuốc',
      //  w: 'phunthuoc',
    },
    {
      name: 'Giai đoạn 60 NSKĐT',
      //   date: {from: 60, to: 65},
      screen: 'Bón phân',
      position: 1,
      //  w: 'bonphan',
    },
    {
      name: 'Giai đoạn 70-80 NSKĐT',
      //  date: {from: 70, to: 80},
      screen: 'Phun thuốc',
      position: 5,
      //  w: 'phunthuoc',
    },
  ];
  const giaidoan = giaodoan.map((e, index) => {
    dataCheckNotifi.map((ele, inx) => {
      if (index === inx) {
        e.bool = ele.bool;
        e.w = ele.w;
        e.dateFrom = ele.dateFrom;
        e.dateTo = ele.dateTo;
        e.late = ele.late;
      }
    });
    return e;
  });
  //Sẽ có 1 biến thời gian trừ lại từ ngày bắt đầu vụ
  let menus = giaidoan.map((element, index) => (
    <View key={index} style={styles.button}>
      <TouchableOpacity
        onPress={() => {
          console.log(element.screen + ' + ' + element.bool);
          if (element.bool) {
            console.log('da lam roi');
            return;
          }
          navigation.navigate('TempScreen', {
            initialState: Menu[element.position],
            name: element.screen,
          });
        }}
        // alert(typeThuoc)
        style={styles.xitthuoc}>
        <LinearGradient colors={['#fff', '#fff']} style={styles.xitthuoc1}>
          <View style={styles.action}>
            <ImageBackground
              source={{uri: Menu[element.position].album}}
              style={{
                marginRight: 30,
                height: 70,
                width: 70,
                alignContent: 'flex-start',
                flexDirection: 'column',
              }}></ImageBackground>
            <View style={{flexDirection: 'column'}}>
              {element.bool ? (
                <Text
                  style={{
                    width: 18,
                    borderRadius: 100,
                    backgroundColor: '#01ab9d',
                  }}>
                  <Feather name="check-circle" color="#ffffff" size={18} />
                </Text>
              ) : (
                <Text
                  style={{
                    width: 18,
                    borderRadius: 100,
                    backgroundColor:
                      new Date(element.dateFrom).getTime() >
                      new Date().getTime()
                        ? '#c9c6bd'
                        : '#f73123',
                  }}>
                  <Feather name="alert-circle" color="#ffffff" size={18} />
                </Text>
              )}
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#01ab9d',
                  },
                ]}>
                {element.name}
              </Text>
              <Text
                style={[
                  styles.textDuDoan,
                  {
                    color: '#01ab9d',
                  },
                ]}>
                {/* Ngày thực hiện từ{' '}
                {moment(startDate, 'YYYY-MM-DD')
                  .add(element.date.from, 'days')
                  .format('YYYY-MM-DD')}{' '}
                đến{' '}
                {moment(startDate, 'YYYY-MM-DD')
                  .add(element.date.to, 'days')
                  .format('YYYY-MM-DD')} */}
                Ngày thực hiện {element.dateFrom + ' đến ' + element.dateTo}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {idSeason === '' ? (
        <View style={styles.header}>
          <Animatable.Image
            source={require('../assets/vietGAP.png')}
            style={styles.logo}
            resizeMode="stretch"
            animation="bounceIn"
            duration={1500}
          />
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            //  style={styles.button}
          > */}
          {/* <LinearGradient
              colors={['#fff', '#fff']}
              // style={{
              //   // flex: 1,
              //   alignSelf: 'stretch',
              //   height: 50,
              //   width: 300,
              //   justifyContent: 'center',
              //   alignItems: 'center',
              //   padding: 1,
              //   borderRadius: 10,
              //   borderColor: '#01ab9d',
              //   borderWidth: 3,
              // }}
            > */}
          <View
            style={{
              // flex: 1,
              alignSelf: 'center',
              height: 50,
              width: 350,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
              borderRadius: 10,
              borderColor: '#01ab9d',
              borderWidth: 3,
            }}>
            <View>
              <Text
                style={[
                  styles.textSigns,
                  {
                    color: '#01ab9d',
                    // paddingTop: 10,
                  },
                ]}>
                Bạn chưa có vụ mùa mới hãi vào phần Bắc đầu vụ để tạo 1 vụ mùa
                mới
              </Text>
            </View>
          </View>
          {/* </LinearGradient> */}
          {/* </TouchableOpacity> */}
        </View>
      ) : (
        <ScrollView>
          <View style={styles.footer}>
            <View>
              {/* <ScrollView>{menus}</ScrollView> */}
              {menus}
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Xác nhận kết thúc mùa vụ',
                      'bạn có chắc muốn kết thúc vụ mùa này ?',
                      [
                        {
                          text: 'không',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'không',
                        },
                        {
                          text: 'có',
                          onPress: () => {
                            console.log('OK Pressed');
                            console.log(idSeason);
                            dispatch(actions.updateSeasonEnd(idSeason));
                            navigation.navigate('Home');
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}
                  // alert(typeThuoc)
                  style={styles.xitthuoc}>
                  <LinearGradient
                    colors={['#fff', '#fff']}
                    style={styles.xitthuoc1}>
                    <View style={styles.action}>
                      {/* <ImageBackground
                      // source={{uri: Menu[element.position].album}}
                      style={{
                        marginRight: 30,
                        height: 70,
                        width: 70,
                        alignContent: 'flex-start',
                        flexDirection: 'column',
                      }}></ImageBackground> */}
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          style={[
                            styles.textSign,
                            {
                              color: '#01ab9d',
                              // paddingTop: 10,
                            },
                          ]}>
                          {/* {element.name} */}
                          kết thúc vụ
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationScreen;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  header: {
    //height: '50%',
    // width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignContent: 'center',
  },
  picker: {
    height: 100,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  text_header: {
    color: '#008040',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text_footer: {
    color: '#cf7a13',
    fontSize: 16,
    marginBottom: 10,
  },
  textDuDoan: {
    fontSize: 10,
  },
  action: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    alignContent: 'space-between',
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -14,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 16,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 10,
  },
  signIns: {
    flex: 1,
    alignSelf: 'stretch',
    //height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 10,
  },
  xitthuoc: {
    flex: 1,
    alignSelf: 'stretch',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 10,
    borderColor: '#01ab9d',
    borderWidth: 3,
  },
  xitthuoc1: {
    flex: 1,
    alignSelf: 'stretch',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    // paddingTop: 20,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  pheader: {
    backgroundColor: '#f2f2f2',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#01ab9d',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
