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
} from 'react-native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../model/Menu';
import {useNavigation} from '@react-navigation/native';

const NotificationScreen = ({route}) => {
  // const currentUser = useSelector((state) => state.authReducer.currentUser);
  console.log(Menu[5]);
  const navigation = useNavigation();
  const giaodoan = [
    {
      name: 'Giai đoạn 7-10 NSKĐT',
      date: '7-10',
      screen: 'Bón phân',
      position: 1,
      type: ['NPK (16-16-8)', 'NPK (20-20-15)', 'Đạm', 'Lân', 'Kali', 'Canxi'],
    },
    {name: 'Giai đoạn 30 NSKĐT', date: '30',position: 5, screen: 'Phun thuốc'},
    {
      name: 'Giai đoạn 45 NSKĐT',
      date: '45',
      position: 5,
      screen: ['Bón phân', 'Phun thuốc'],
    },
    {name: 'Giai đoạn 60 NSKĐT', date: '60', screen: 'Bón phân', position: 1},
    {name: 'Giai đoạn 70-80 NSKĐT', date: '70-80', screen: 'Phun thuốc', position: 5},
    {name: 'Giai đoạn 30-45 NSKĐT', date: '30-45', screen: 'Bao trái', position: 7},
  ];
  //Sẽ có 1 biến thời gian trừ lại từ ngày bắt đầu vụ
  let menus = giaodoan.map((element, index) => (
    <View key={index} style={styles.button}>
      <TouchableOpacity
        onPress={() => navigation.navigate('TempScreen', {
          initialState: Menu[element.position],
          name: element.screen,
        })}
        // alert(typeThuoc)
        style={styles.xitthuoc}>
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.xitthuoc}>
          <Text
            style={[
              styles.textSign,
              {
                color: '#fff',
              },
            ]}>
            {element.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.footer}>
        <View>
          <ScrollView>{menus}</ScrollView>
        </View>
      </View>
    </View>
  );
};

export default NotificationScreen;

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
  action: {
    flexDirection: 'row',
    marginBottom: 10,
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
  xitthuoc: {
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
