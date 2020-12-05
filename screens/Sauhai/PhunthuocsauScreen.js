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
  Alert,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector} from 'react-redux';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

const PhunthuocsauScreen = ({navigation, route}) => {
  const [isValidUser, handleUser] = useState(false);
  const [image, setImage] = useState(0);
  const [validNumber, handleValidNumber] = useState(false);
  const [loaiThuocArray, handleLoaiThuocArray] = useState([
    {ten: '', loai: 0, soluong: 0, dungtich: 0, luongnuoc: 0, hinhanh: 0},
  ]);
  const album = route.params.initialState;
  console.log(route.params.stayhere);
  console.log(route.params.colhere);
  function handleValidUser(val) {
    console.log(val)
    if (val.trim().length >= 4) {
      handleUser(true);
    } else {
      handleUser(false);
    }
  }

  function checkValidNumber (val) {
    console.log("val"+val)
    // var reg = new RegExp('^[0-9]+$');
    // reg.test(val) ? handleValidNumber(true) : handleValidNumber(false) ;
    // console.log(reg.test(val) ? true : false);
  };

  // Bottom Sheet khai báo
  bs = React.createRef();
  fall = new Animated.Value(1);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 500,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 500,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const thuocArray = loaiThuocArray.map((element, index) => (
    <View key={index}>
      <Text style={{color: '#009387', fontSize: 16, marginBottom: 5}}>
        Tên thuốc
      </Text>
      <View style={styles.action}>
        {/* <FontAwesome name="lock" color="black" size={20} /> */}
        <TextInput
          placeholder="Tên thuốc"
          style={styles.textInput}
          autoCapitalize="none"
          // secureTextEntry={this.state.secureTextEntry ? true : false}
          onChangeText={(val) => handleValidUser(val)}
        />
        <TouchableOpacity onPress={() => {}}>
          {isValidUser ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : (
            <Feather name="slash" color="black" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          onPress={() => {
            element['loai'] == 'Chai'
              ? (element['loai'] = 0)
              : (element['loai'] = 'Chai');
            handleLoaiThuocArray((dataArr) => [...dataArr]);
          }}
          style={styles.signIn}>
          <LinearGradient
            colors={
              element['loai'] == 'Chai'
                ? ['#01ab9d', '#008075']
                : ['#08d4c4', '#01ab9d']
            }
            style={styles.signIn}>
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
            element['loai'] == 'Goi'
              ? (element['loai'] = 0)
              : (element['loai'] = 'Goi');
            handleLoaiThuocArray((dataArr) => [...dataArr]);
          }}
          style={styles.signIn}>
          <LinearGradient
            colors={
              element['loai'] == 'Goi'
                ? ['#01ab9d', '#008075']
                : ['#08d4c4', '#01ab9d']
            }
            style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
              Gói
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {element['loai'] != 0 ? (
        element['loai'] == 'Goi' ? (
          <View>
            <View style={styles.action}>
              <TextInput
                placeholder="Số lượng"
                style={styles.textInput}
                autoCapitalize="none"
                // secureTextEntry={this.state.secureTextEntry ? true : false}
                onChangeText={(val) => checkValidNumber(val)}
                // onEndEditing={(e) => this.handleValidPassword(e.nativeEvent.text)}
              />
              <TouchableOpacity onPress={() => {}}>
                <Text>Gói</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="Dung tích"
                style={styles.textInput}
                autoCapitalize="none"
                // secureTextEntry={this.state.secureTextEntry ? true : false}
                onChangeText={(val) => checkValidNumber(val)}
                // onEndEditing={(e) => this.handleValidPassword(e.nativeEvent.text)}
              />
              <Text>ml</Text>
            </View>
            <View style={styles.action}>
              {}
            </View>
          </View>
        ) : (
          <View style={styles.action}>
            <TextInput
              placeholder="Số lượng"
              style={styles.textInput}
              autoCapitalize="none"
              // secureTextEntry={this.state.secureTextEntry ? true : false}
              onChangeText={(val) => handleValidUser(val)}
              // onEndEditing={(e) => this.handleValidPassword(e.nativeEvent.text)}
            />
            <TouchableOpacity onPress={() => {}}>
              <Text style={{}}>Chai</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Dung tích"
              style={styles.textInput}
              autoCapitalize="none"
            />
            <Text>ml</Text>
          </View>
        )
      ) : null}
      {element['loai'] != 0 ? (
        <View>
          <View style={styles.action}>
            <TextInput
              placeholder="Lượng nước dùng để pha"
              style={styles.textInput}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => {}}>
              <Text style={{justifyContent: 'center'}}>Lít</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.action}>
            <Text
              style={{
                flex: 1,
                paddingLeft: 10,
                color: '#01ab9d',
                fontSize: 16,
              }}>
              Quay video quá trình pha thuốc
            </Text>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <Feather name="video" color="green" size={20} />
            </TouchableOpacity>
          </View>
          {image !== 0 ? (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ImageBackground
                    source={{
                      uri: image,
                    }}
                    style={{height: 100, width: 300}}
                    imageStyle={{borderRadius: 15}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  ));

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.pheader}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const currentUser = useSelector((state) => state.authReducer.currentUser);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          // margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
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
              <Text style={{color: '#009387', fontSize: 16, marginBottom: 5}}>
                Thuốc và sử dụng công cụ
              </Text>
              <Text style={styles.text_footer}>1. Chọn thuốc/công cụ</Text>
              {thuocArray}
              <View style={styles.action}>
                <TouchableOpacity
                  onPress={() =>
                    handleLoaiThuocArray((dataArr) => [
                      ...dataArr,
                      {
                        ten: '',
                        loai: 0,
                        soluong: 0,
                        dungtich: 0,
                        luongnuoc: 0,
                        hinhanh: 0,
                      },
                    ])
                  }>
                  <Feather
                    name="plus-circle"
                    color="green"
                    size={30}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>
                {loaiThuocArray.length > 1 ? <TouchableOpacity
                  onPress={() => {
                    loaiThuocArray.pop(),
                      handleLoaiThuocArray((dataArr) => [...dataArr]);
                  }}>
                  <Feather
                    name="minus-circle"
                    color="green"
                    size={30}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity> : <TouchableOpacity
                  onPress={() => {
                  }}>
                  <Feather
                    name="minus-circle"
                    color="gray"
                    size={30}
                    style={{alignSelf: 'center'}}
                  />
                </TouchableOpacity>}
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('BookmarkScreen')}
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
                      Xịt thuốc
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default PhunthuocsauScreen;

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
    justifyContent: 'center',
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
