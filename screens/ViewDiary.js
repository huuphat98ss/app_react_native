import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
//import DropDownItem from 'react-native-drop-down-item';
//import {ListItem} from 'react-native-elements';
import {List} from 'react-native-paper';
// const IC_ARR_DOWN = require('../model/icons/down.png');
// const IC_ARR_UP = require('../model/icons/up.png');
//import {decode,encode} from 'base-64';
import base64 from 'react-native-base64';
import * as actions from '../src/redux/actions/diary';
import MonthPicker from 'react-native-month-year-picker';
import moment from 'moment';
const ViewDiary = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  // DATE PICKER
  const [date, setDate] = useState(new Date());
  const [dateShowEdit, setDateEdit] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [ShowView, setShowView] = useState(false);
  const [showDataDiray, setDataDiary] = useState([]);
  const [checkDelete, setDeleteCheck] = useState([]);
  //const [deleted, setDelete] = useState('');
  useEffect(() => {
    if (route.params.idDiaryss !== '' && route.params.idDiaryss !== undefined) {
      // setDelete(route.params.idDiaryss);
      console.log(route.params.idDiaryss);
      let data = route.params.idDiaryss.toString();
      setDeleteCheck((arr) => [...arr, data]);
      console.log('dasdsadasdsda');
      // return (route.params.idDiaryss = '');
      route.params.idDiaryss = '';
    }
    return;
  });
  console.log(checkDelete);
  // console.log(deleted);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    // console.log(
    //   'date convet ' + moment(currentDate, 'MM/YYYY').format('MM/YYYY'),
    // );
    //console.log('date is  ' + datev2);
    let dateReal = moment(currentDate, 'MM/YYYY').format('MM/YYYY');
    let data = {
      date: dateReal,
      idfarmer: route.params.idfarmer,
    };
    dispatch(actions.showDiary(data));
    //console.log(' show set date ' + currentDate);
    setDate(currentDate);
    // setDataDiary(dataView());
    setShowView(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  console.log('show ne');
  const ViewDiary = useSelector((state) => state.diaryReducer.arrayDiary);
  // const idDiaryDeleted = useSelector(
  //   (state) => state.diaryReducer.idDiaryDeleted,
  // );
  console.log('show ' + ViewDiary);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Xem thông tin nhật ký</Text>
        <Text style={[styles.text_header, {fontSize: 16, color: '#cf7a13'}]}>
          Nông dân: {route.params.username}
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          {show && (
            <MonthPicker
              //testID="dateTimePicker"
              value={date}
              //mode={mode}
              //is24Hour={true}
              //display="default"
              // locale="vn"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.action}>
          <Text
            style={
              (styles.textInput,
              [
                {
                  color: '#009387',
                  fontSize: 18,
                  marginBottom: 5,
                  // marginTop: 5,
                  fontWeight: 'bold',
                },
              ])
            }>
            chọn ngày ghi nhật ký
          </Text>
        </View>
        <View style={styles.action}>
          <Text
            style={{
              flex: 1,
              // paddingLeft: 10,
              color: '#01ab9d',
              fontSize: 16,
            }}>
            {/* {JSON.stringify(date).substring(1, 8)} */}
            {moment(date, 'MM-YYYY').format('MM-YYYY')}
          </Text>
          <TouchableOpacity onPress={showDatepicker}>
            <Feather name="clock" color="green" size={20} />
          </TouchableOpacity>
        </View>

        {/* <View style={{paddingVertical: 5}} /> */}
        {/* <Text>Chọn thông tin nhật ký</Text> */}
        <RNPickerSelect
          placeholder={{}}
          onValueChange={(value) => {
            console.log(value);
            setSelectedValue(value);
            setShowView(false);
          }}
          items={[
            {label: 'chon 1 tac vu', value: ''},
            {label: 'Bón phân', value: 'bonphan'},
            {label: 'tưới nước', value: 'tuoinuoc'},
            {label: 'Sâu hại', value: 'sauhai'},
            {label: 'Phun Thuốc', value: 'phunthuoc'},
            {label: 'Bao trái', value: 'Baotrai'},
            {label: 'Bệnh hại', value: 'benhhai'},
          ]}
          value={selectedValue}
        />
        <View style={{paddingVertical: 5}} />
        {ShowView ? (
          <View>
            <View>
              <Text style={styles.text_header}>kết quả tìm được</Text>
            </View>
            <View style={{height: 400}}>
              <ScrollView style={{alignSelf: 'stretch'}}>
                {showDataDiray.map((item, i) => {
                  let dataDele = '';
                  if (checkDelete.length !== 0) {
                    checkDelete.forEach((e) => {
                      if (e === item.id) {
                        dataDele = e;
                      }
                    });
                  }
                  return (
                    <View
                      key={i}
                      style={{
                        display: dataDele === item.id ? 'none' : 'flex',
                      }}>
                      <List.Item
                        title={item.title}
                        description={item.description}
                        right={(props) => (
                          <List.Icon {...props} icon="chevron-right" />
                        )}
                        onPress={() => {
                          console.log(item.id);
                          let array = ViewDiary.filter((ele) => {
                            if (ele._id === item.id) {
                              return ele;
                            }
                          });

                          let data = {
                            idDiary: array[0]._id,
                            idFarmer: route.params.idfarmer,
                            nodeStay: array[0].node,
                          };
                          dispatch(actions.getbatchStump(data));
                          navigation.navigate('ShowDiary', {
                            dataDiary: array[0],
                            date: item.title,
                          });
                        }}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.submit}>
            <TouchableOpacity
              style={styles.xitthuoc}
              onPress={() => {
                //    setDataDiary(dataView());
                const dates = (string) => {
                  var options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  };
                  return new Date(string).toLocaleDateString([], options);
                };
                if (ViewDiary === undefined) return;
                let dataShow = [];
                if (selectedValue === '') {
                  let array = ViewDiary.map((e) => {
                    let dataDay = dates(e.updateAt);
                    return {
                      title: dataDay,
                      description: e.work,
                      id: e._id,
                    };
                  });
                  dataShow = array;
                } else {
                  ViewDiary.forEach((e) => {
                    let dataDay = dates(e.updateAt);
                    if (selectedValue === e.work) {
                      dataShow.push({
                        title: dataDay,
                        description: e.work,
                        id: e._id,
                      });
                    }
                  });
                }

                setDataDiary(dataShow);
                setShowView(true);
                // setDeleteCheck(false);
              }}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.xitthuoc}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  xem nhật ký
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Modal
        isVisible={isModalVisible}
        style={{backgroundColor: 'white', borderRadius: 30, padding: 20}}>
        <View style={([styles.container], {borderRadius: 30})}>
          <Text style={styles.text_header}>thông tin</Text>
          <View
            style={[
              styles.button,
              {
                flexDirection: 'row',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 30,
                paddingRight: 30,
              },
            ]}>
            <TouchableOpacity onPress={toggleModal} style={styles.xitthuoc}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.xitthuoc}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Cập nhật
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewDiary;

const styles = StyleSheet.create({
  submit: {
    height: 50,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  header: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: '90%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    // paddingVertical: 30,
    alignContent: 'center',
  },
  picker: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    color: '#01ab9d',
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
  action: {
    flexDirection: 'row',
    // marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f1f1',
    justifyContent: 'space-between',
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
    marginTop: 50,
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
  xitthuoc: {
    flex: 1,
    alignSelf: 'stretch',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
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
  //drop down
  dropDownItem: {
    margin: 5,
    //paddingVertical: 1,
  },
});
