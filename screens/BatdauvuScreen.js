import React, {useState} from 'react';
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
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector} from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BatdauvuScreen = ({navigation, route}) => {
  const album = route.params.initialState;
  // const menus = album.type.map((x, index) => (
  //   <Picker.Item key={index} label={x} value={x} />
  // ));
  // console.log(menus);

  // DATE PICKER
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  console.log(date);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // DATE PICKER
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  // SET HOOKS STATE
  const [state, setState] = useState(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tempKey');

      return jsonValue != null
        ? (setState(JSON.parse(jsonValue)),
          // setToggleXietNuoc(JSON.parse(jsonValue))
          setToggleXietNuoc(JSON.parse(jsonValue)['toggleXiecNuoc']),
          setToggleGaySoc(JSON.parse(jsonValue)['toggleGaySoc']),
          setToggleNhietDo(JSON.parse(jsonValue)['toggleNhietDo']),
          setToggleCatCanh(JSON.parse(jsonValue)['toggleCatCanh']),
          setToggleTiaCanh(JSON.parse(jsonValue)['toggleTiaCanh']),
          setTooglePaclo(JSON.parse(jsonValue)['togglePaclo']),
          setToggleBondam(JSON.parse(jsonValue)['toggleBondam']))
        : async () => {
            try {
              const jsonValue = JSON.stringify({
                toggleXiecNuoc: false,
                toggleGaySoc: false,
                toggleNhietDo: false,
                toggleCatCanh: false,
                toggleTiaCanh: false,
                togglePaclo: false,
                toggleBondam: false,
              });
              await AsyncStorage.setItem('tempKey', jsonValue);
            } catch (e) {
              // saving error
            }
          };
    } catch (e) {
      return null;
    }
  });

  const [toggleXiecNuoc, setToggleXietNuoc] = useState(false);
  const [toggleGaySoc, setToggleGaySoc] = useState(false);
  const [toggleNhietDo, setToggleNhietDo] = useState(false);
  const [toggleCatCanh, setToggleCatCanh] = useState(false);
  const [toggleTiaCanh, setToggleTiaCanh] = useState(false);
  const [togglePaclo, setTooglePaclo] = useState(false);
  const [toggleBondam, setToggleBondam] = useState(false);
  // STORE DATA
  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify({
        toggleXiecNuoc: toggleXiecNuoc,
        toggleGaySoc: toggleGaySoc,
        toggleNhietDo: toggleNhietDo,
        toggleCatCanh: toggleCatCanh,
        toggleTiaCanh: toggleTiaCanh,
        togglePaclo: togglePaclo,
        toggleBondam: toggleBondam,
      });
      await AsyncStorage.setItem('tempKey', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('tempKey');

      return jsonValue != null
        ? console.log(JSON.parse(jsonValue))
        : console.log('Nodata');
    } catch (e) {
      return null;
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('tempKey');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>
          Hợp tác xã: {currentUser.username}
        </Text>
        <Text style={[styles.text_header, {fontSize: 16, color: '#cf7a13'}]}>
          Nông dân: {currentUser.username}
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          <ScrollView>
            <View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
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
                Thời gian bắt đầu vụ
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
                {JSON.stringify(date).substring(1, 11)}
              </Text>
              <TouchableOpacity onPress={showDatepicker}>
                <Feather name="clock" color="green" size={20} />
              </TouchableOpacity>
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
                      fontWeight: 'bold',
                    },
                  ])
                }>
                Nhiệt độ
              </Text>
            </View>
            <View style={styles.action}>
              <Text
                style={
                  (styles.textInput,
                  [
                    {
                      color: '#009387',
                      fontSize: 16,
                      marginBottom: 5,
                      // marginTop: 5,
                    },
                  ])
                }>
                Từ 18 - 20
              </Text>
              <CheckBox
                disabled={false}
                value={toggleNhietDo}
                onValueChange={(newValue) => setToggleNhietDo(newValue)}
              />
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
                      fontWeight: 'bold',
                    },
                  ])
                }>
                Tạo khô hạn và ngập úng
              </Text>
            </View>
            <View style={styles.action}>
              <Text
                style={
                  (styles.textInput,
                  [
                    {
                      color: '#009387',
                      fontSize: 16,
                      marginBottom: 5,
                      // marginTop: 5,
                    },
                  ])
                }>
                Xiếc nước
              </Text>
              <CheckBox
                disabled={false}
                value={toggleXiecNuoc}
                onValueChange={(newValue) => setToggleXietNuoc(newValue)}
              />
            </View>
            <View style={styles.action}>
              <Text
                style={
                  (styles.textInput,
                  [
                    {
                      color: '#009387',
                      fontSize: 16,
                      marginBottom: 5,
                      // marginTop: 5,
                    },
                  ])
                }>
                Gây sốc
              </Text>
              <CheckBox
                disabled={false}
                value={toggleGaySoc}
                onValueChange={(newValue) => setToggleGaySoc(newValue)}
              />
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
                      fontWeight: 'bold',
                    },
                  ])
                }>
                Tuổi của cành
              </Text>
            </View>
            <View style={styles.action}>
              <Text
                style={
                  (styles.textInput,
                  [
                    {
                      color: '#009387',
                      fontSize: 16,
                      marginBottom: 5,
                      // marginTop: 5,
                    },
                  ])
                }>
                Cắt những cành có tuổi quá già
              </Text>
              <CheckBox
                disabled={false}
                value={toggleCatCanh}
                onValueChange={(newValue) => setToggleCatCanh(newValue)}
              />
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
                      fontWeight: 'bold',
                    },
                  ])
                }>
                Năng suất năm trước của cây
              </Text>
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
                      fontWeight: 'bold',
                    },
                  ])
                }>
                Những cây bị kiệt sức do cho quá nhiều trái
              </Text>
            </View>
            <View style={styles.action}>
              <Text
                style={
                  (styles.textInput,
                  [
                    {
                      color: '#009387',
                      fontSize: 16,
                      marginBottom: 5,
                      // marginTop: 5,
                    },
                  ])
                }>
                Tỉa cành, bón phân
              </Text>
              <CheckBox
                disabled={false}
                value={toggleTiaCanh}
                onValueChange={(newValue) => setToggleTiaCanh(newValue)}
              />
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
                      fontWeight: 'bold',
                    },
                  ])
                }>
                Cây ít trái
              </Text>
            </View>
            <View style={styles.action}>
              <Text
                style={
                  (styles.textInput,
                  [
                    {
                      color: '#009387',
                      fontSize: 16,
                      marginBottom: 5,
                      // marginTop: 5,
                    },
                  ])
                }>
                Hạn chế bón đạm
              </Text>
              <CheckBox
                disabled={false}
                value={toggleBondam}
                onValueChange={(newValue) => setToggleBondam(newValue)}
              />
            </View>
            <View style={styles.action}>
              <Text
                style={
                  (styles.textInput,
                  [
                    {
                      color: '#009387',
                      fontSize: 16,
                      marginBottom: 5,
                      // marginTop: 5,
                    },
                  ])
                }>
                Sử dụng Paclobutrazol
              </Text>
              <CheckBox
                disabled={false}
                value={togglePaclo}
                onValueChange={(newValue) => setTooglePaclo(newValue)}
              />
            </View>
            {/* <View style={styles.button}>
              <TouchableOpacity
                onPress={removeValue}
                // alert(typeThuoc)
                style={styles.xitthuoc}>
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
                    Hoàn tất nhật ký
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View> */}
            {toggleXiecNuoc &&
            toggleGaySoc &&
            toggleNhietDo &&
            toggleCatCanh &&
            toggleTiaCanh &&
            togglePaclo &&
            toggleBondam ? (
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  // alert(typeThuoc)
                  style={styles.xitthuoc}>
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
                      Hoàn tất nhật ký
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={storeData}
                  // alert(typeThuoc)
                  style={styles.xitthuoc}>
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
                      Lưu
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default BatdauvuScreen;

const styles = StyleSheet.create({
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
});
