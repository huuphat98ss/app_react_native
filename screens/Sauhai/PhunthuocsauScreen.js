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
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector} from 'react-redux';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import * as actions from '../../src/redux/actions/diary';
const PhunthuocsauScreen = ({navigation, route}) => {
  const [isValidUser, handleUser] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState(0);
  const [isValidThuoc, handleIsValidThuoc] = useState(true);
  const [isValidLoai, handleIsValidLoai] = useState(true);
  const [isValidSoluong, handleIsValidSoluong] = useState(true);
  const [isValidDungtich, handleIsValidDungtich] = useState(true);
  const [isValidLuongnuoc, handleIsValidLuongnuoc] = useState(true);
  const [loaithuocArray, handleloaithuocArray] = useState([
    {thuoc: '', loai: 0, soluong: 0, dungtich: 0, luongnuoc: 0},
  ]);
  const album = route.params.initialState;
  const [dataSendServer, dataSend] = useState({});
  // console.log('albums' + JSON.stringify(album));
  // console.log('alo');
  // console.log(route.params.stayhere);
  // console.log(route.params.colhere);
  console.log(route.params);

  function checkNumber(val) {
    var reg = new RegExp('^[0-9]+$');
    // pass a function to map
    return reg.test(val);
  }

  // HANDLE
  function handleValidUser(val, titlebutton) {
    // console.log('handle ' + titlebutton + val);
    // if (val.trim().length >= 4) {
    //   handleUser(true);
    // } else {
    //   handleUser(false);
    // }
    switch (titlebutton) {
      case 'thuoc':
        // dataSend((prevKeyMap) => ({...prevKeyMap, thuoc: val}));
        console.log('thuoc' + val);
        break;
      case 'loai':
        // dataSend((prevKeyMap) => ({...prevKeyMap, thuoc: val}));
        console.log('loai' + val);
        break;
      case 'soluong':
        // dataSend((prevKeyMap) => ({...prevKeyMap, soluong: val}));
        handleIsValidSoluong(checkNumber(val));
        break;
      case 'dungtich':
        // dataSend((prevKeyMap) => ({...prevKeyMap, dungtich: val}));
        handleIsValidDungtich(checkNumber(val));
        break;
      case 'luongnuoc':
        // dataSend((prevKeyMap) => ({...prevKeyMap, luongnuoc: val}));
        handleIsValidLuongnuoc(checkNumber(val));
        console.log('luongnuoc' + val);
        break;
      default:
        break;
    }
  }

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

  let thuocArray = loaithuocArray.map((element, index) => (
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
          // onChangeText={(val) => handleValidUser(val, 'thuoc')}
          onChangeText={(val) => {
            element['thuoc'] = val;
            handleloaithuocArray((dataArr) => [...dataArr]);
          }}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text, 'thuoc')}
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
            element['loai'] === 'Chai'
              ? (element['loai'] = 0)
              : (element['loai'] = 'Chai');
            handleloaithuocArray((dataArr) => [...dataArr]);
            handleValidUser(element['loai'], 'loai');
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
            element['loai'] === 'Goi'
              ? (element['loai'] = 0)
              : (element['loai'] = 'Goi');
            handleloaithuocArray((dataArr) => [...dataArr]);
            handleValidUser(element['loai'], 'loai');
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
      {element['loai'] !== 0 ? (
        element['loai'] === 'Goi' ? (
          <View>
            <View style={styles.action}>
              <TextInput
                placeholder="Số lượng"
                style={isValidSoluong ? styles.textInput : styles.textInput}
                autoCapitalize="none"
                // secureTextEntry={this.state.secureTextEntry ? true : false}
                onChangeText={(val) =>
                  // handleValidUser(val, 'luongnuoc')
                  {
                    element['soluong'] = val;
                    handleloaithuocArray((dataArr) => [...dataArr]);
                  }
                }
                onEndEditing={(e) =>
                  handleValidUser(e.nativeEvent.text, 'soluong')
                }
              />

              <TouchableOpacity onPress={() => {}}>
                <Text>Gói</Text>
              </TouchableOpacity>
              <TextInput
                placeholder="Dung tích"
                style={styles.textInput}
                autoCapitalize="none"
                // secureTextEntry={this.state.secureTextEntry ? true : false}
                onChangeText={(val) =>
                  // handleValidUser(val, 'luongnuoc')
                  {
                    element['dungtich'] = val;
                    handleloaithuocArray((dataArr) => [...dataArr]);
                    console.log(loaithuocArray);
                  }
                }
                onEndEditing={(e) =>
                  handleValidUser(e.nativeEvent.text, 'dungtich')
                }
              />
              <Text>ml</Text>
            </View>
            {isValidSoluong && isValidDungtich ? null : (
              <View
                style={[
                  styles.action,
                  {
                    justifyContent: 'space-around',
                    alignItems: 'stretch',
                    flexDirection: 'row',
                    marginBottom: 10,
                    marginLeft: 10,
                    marginTop: 0,
                  },
                ]}>
                {isValidSoluong ? (
                  <Text></Text>
                ) : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Must be number</Text>
                  </Animatable.View>
                )}
                {isValidDungtich ? (
                  <Text></Text>
                ) : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Must be number</Text>
                  </Animatable.View>
                )}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.action}>
            <TextInput
              placeholder="Số lượng"
              style={styles.textInput}
              autoCapitalize="none"
              // secureTextEntry={this.state.secureTextEntry ? true : false}
              // onChangeText={(val) => handleValidUser(val, 'soluong')}
              onChangeText={(val) =>
                // handleValidUser(val, 'luongnuoc')
                {
                  element['soluong'] = val;
                  handleloaithuocArray((dataArr) => [...dataArr]);
                }
              }
              onEndEditing={(e) =>
                handleValidUser(e.nativeEvent.text, 'soluong')
              }
            />
            <TouchableOpacity onPress={() => {}}>
              <Text style={{}}>Chai</Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Dung tích"
              style={styles.textInput}
              autoCapitalize="none"
              // onChangeText={(val) => handleValidUser(val, 'dungdich')}
              onChangeText={(val) =>
                // handleValidUser(val, 'luongnuoc')
                {
                  element['dungtich'] = val;
                  handleloaithuocArray((dataArr) => [...dataArr]);
                }
              }
              onEndEditing={(e) =>
                handleValidUser(e.nativeEvent.text, 'dungtich')
              }
            />
            <Text>ml</Text>
          </View>
        )
      ) : null}
      {element['loai'] !== 0 ? (
        <View>
          <View style={styles.action}>
            <TextInput
              placeholder="Lượng nước dùng để pha"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) =>
                // handleValidUser(val, 'luongnuoc')
                {
                  element['luongnuoc'] = val;
                  handleloaithuocArray((dataArr) => [...dataArr]);
                }
              }
              onEndEditing={(e) =>
                handleValidUser(e.nativeEvent.text, 'luongnuoc')
              }
            />
            <TouchableOpacity onPress={() => {}}>
              <Text style={{justifyContent: 'center'}}>Lít</Text>
            </TouchableOpacity>
          </View>
          {isValidLuongnuoc ? null : <View style={[
                  styles.action,
                  {
                    justifyContent: 'space-around',
                    alignItems: 'stretch',
                    flexDirection: 'row',
                    marginBottom: 10,
                    marginLeft: 10,
                    marginTop: 0,
                  },
                ]}>
            <Text
              style={styles.errorMsg}>
              Must be number
            </Text>
          </View> }
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
                    handleloaithuocArray((dataArr) => [
                      ...dataArr,
                      {
                        thuoc: '',
                        loai: 0,
                        soluong: 0,
                        dungtich: 0,
                        luongnuoc: 0,
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
                {loaithuocArray.length > 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      loaithuocArray.pop(),
                        handleloaithuocArray((dataArr) => [...dataArr]);
                    }}>
                    <Feather
                      name="minus-circle"
                      color="green"
                      size={30}
                      style={{alignSelf: 'center'}}
                    />
                  </TouchableOpacity>
                ) : (
                  <Feather
                    name="minus-circle"
                    color="gray"
                    size={30}
                    style={{alignSelf: 'center'}}
                  />
                )}
              </View>
              {/* <Temp /> */}
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={
                    () =>
                      //navigation.navigate('BookmarkScreen')
                      {
                        //console.log(route.params);
                        // console.log(dataSendServer);
                        //let dataSendServer = {
                        // dataSendServer.cachtri = route.params.cachtri;
                        // };
                        // let dataSendServer = dataSendServer
                        let postDataServer = {
                          work: 'sauhai',
                          title: route.params.title,
                          //isBatch:route.params.idBatch,
                          isFarmer: currentUser.data._id,
                          cachtri: route.params.cachtri,
                          // de y khuc nay'
                          deTailVal: loaithuocArray,
                          imageData: route.params.imageSend,
                        };
                        console.log(postDataServer);
                        switch (route.params.title) {
                          case 'allbatch':
                            dispatch(actions.pushDiaryToServer(postDataServer));
                            //dispatch(actions.pushDiaryToServer(imageSend));
                            break;
                          case 'allStumpinBatch':
                            postDataServer.isBatch = route.params.idBatch;
                            console.log(route.params.idBatch);
                            dispatch(actions.pushDiaryToServer(postDataServer));
                            break;
                          case 'Stumps':
                            postDataServer.arrayStumps =
                              route.params.arrayStumps;
                            postDataServer.isBatch = route.params.idBatch;
                            dispatch(actions.pushDiaryToServer(postDataServer));
                            break;
                          case 'detailStump':
                            postDataServer.arrayChecked =
                              route.params.arrayChecked;
                            postDataServer.isBatch = route.params.idBatch;
                            postDataServer.isStump = route.params.isStump;
                            dispatch(actions.pushDiaryToServer(postDataServer));
                            break;
                          default:
                            break;
                        }
                        // navigation.navigate('Home');
                      }
                    // alert(typeThuoc)
                  }
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
  textWrong: {
    color: 'red',
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
  textInputWrong: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -14,
    paddingLeft: 10,
    color: 'red',
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
