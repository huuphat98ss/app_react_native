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

import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
const ProfileFarmer = ({navigation, route}) => {
  // const dispatch = useDispatch();
  let dataProfile = useSelector((state) => state.diaryReducer.dataProfile);
  console.log('profile');
  console.log(dataProfile);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>
          Hợp tác xã:{dataProfile.nameCooperaTion}
        </Text>
        <Text style={[styles.text_header, {fontSize: 16, color: '#cf7a13'}]}>
          Nông dân:{route.params.username}
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          <ScrollView>
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
                Địa chỉ nông hộ
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
                {dataProfile.address}
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
                Diện tích
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
                {dataProfile.landArea}
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
                Giống Cây
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
                {dataProfile.typeOfTree}
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
                Số góc cây
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
                {dataProfile.totalTrees}
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
                Sô QR cho nông hộ
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
                {dataProfile.totalNumberQR}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ProfileFarmer;

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
