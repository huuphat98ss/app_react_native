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
// import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import * as actions from '../../src/redux/actions/diary';
const BocatlaScreen = ({navigation, route}) => {
  //console.log(route.params);
  const {info, loaisau, cachtri} = route.params;
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageArr, setImage] = useState([]);
  // const [loaithuocArray, handleloaithuocArray] = useState([
  //   {thuoc: '', loai: 0, soluong: 0, dungtich: 0, luongnuoc: 0},
  // ]);
  const dispatch = useDispatch();
  // data image send server
  const [imageSend, setImageSend] = useState([]);

  const [img, chosenImage] = useState(0);
  console.log('img' + img);

  // Usestate
  // Sâu đục trái

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
      let found = imageArr.find((element) => element == img);
      let found1 = found === undefined ? false : true;
      console.log(found1);
      let tempData = [];
      imageArr.forEach((element) => {
        element === img ? (element = image.path) : null, tempData.push(element);
      });
      {
        found1 === false
          ? setImage((dataArr) => [...dataArr, image.path])
          : setImage(tempData);
      }

      const imgs = {
        uri: image.path,
        type: image.mime,
        name: image.path.substr(image.path.lastIndexOf('/') + 1),
      };
      // console.log(img);
      //setImageSend(img);
      if (imageSend.length !== 0) {
        let check = false;
        imageSend.forEach((ele) => {
          if (ele.uri === image.path) {
            check = true;
          }
        });
        if (!check) {
          setImageSend((dataArr) => [...dataArr, imgs]);
        }
      } else {
        setImageSend((dataArr) => [...dataArr, imgs]);
      }

      bs.current.snapTo(1);
    });
  };
  //console.log(imageArr);
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 500,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      let found = imageArr.find((element) => element == img);
      let found1 = found === undefined ? false : true;
      console.log(found1);
      let tempData = [];
      imageArr.forEach((element) => {
        element === img ? (element = image.path) : null, tempData.push(element);
      });
      {
        found1 === false
          ? setImage((dataArr) => [...dataArr, image.path])
          : setImage(tempData);
      }

      const img = {
        uri: image.path,
        type: image.mime,
        name: image.path.substr(image.path.lastIndexOf('/') + 1),
      };
      // console.log(img);
      //setImageSend(img);
      if (imageSend.length !== 0) {
        let check = false;
        imageSend.forEach((ele) => {
          if (ele.uri === image.path) {
            check = true;
          }
        });
        if (!check) {
          setImageSend((dataArr) => [...dataArr, img]);
        }
      } else {
        setImageSend((dataArr) => [...dataArr, img]);
      }

      bs.current.snapTo(1);
    });
  };
  console.log(imageSend);

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => takePhotoFromCamera()}>
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

  function OpenCam(props) {
    let image = props.image;
    return (
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={(e) => {
            bs.current.snapTo(0);
            chosenImage(image);
            e.persist();
          }}>
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
    );
  }

  let phuongphaptri = null;
  switch (loaisau) {
    case 'Bọ cắt lá':
      phuongphaptri = (
        <View>
          <View style={styles.action}>
            <Text
              style={{
                flex: 1,
                // paddingLeft: 10,
                color: '#01ab9d',
                fontSize: 16,
              }}>
              {cachtri[0]}
            </Text>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <Feather name="camera" color="green" size={20} />
            </TouchableOpacity>
          </View>
          {imageArr[1] ? <OpenCam image={imageArr[1]} /> : null}
          <View style={styles.action}>
            <Text
              style={{
                flex: 1,
                // paddingLeft: 10,
                color: '#01ab9d',
                fontSize: 16,
              }}>
              {cachtri[1]}
            </Text>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <Feather name="camera" color="green" size={20} />
            </TouchableOpacity>
          </View>
          {imageArr[2] ? <OpenCam image={imageArr[2]} /> : null}
        </View>
      );
      break;
    // case y:
    //   // code block
    //   break;
    default:
      console.log('default');
  }

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        style={{backgroundColor: 'white', borderRadius: 30, padding: 20}}>
        <View style={([styles.container], {borderRadius: 30})}>
          <Text style={styles.text_header}>{info}</Text>
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
                  Ok
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={(image) => renderInner(image)}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      {/* <Animated.View
        style={{
          // margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}> */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Nông hộ</Text>
        <Text style={[styles.text_header, {fontSize: 16, color: '#cf7a13'}]}>
          {currentUser.data.username}
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          <ScrollView>
            <View style={styles.action}>
              {/* <FontAwesome name="lock" color="black" size={20} /> */}
              <Text
                style={
                  (styles.textInput,
                  [
                    {
                      color: '#009387',
                      fontSize: 18,
                      marginBottom: 5,
                      marginTop: 5,
                    },
                  ])
                }>
                Loại sâu: {loaisau}
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'column', alignItems: 'center'}}
                onPress={toggleModal}>
                {/* {isValidUser ? (
                  <Feather name="check-circle" color="green" size={20} />
                ) : (
                  <Feather name="slash" color="black" size={20} />
                )} */}
                <Text>Thông tin bệnh</Text>
                <Feather name="plus-circle" color="black" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.action}>
              <Text
                style={{
                  flex: 1,
                  // paddingLeft: 10,
                  color: '#01ab9d',
                  fontSize: 16,
                }}>
                Chụp ảnh bệnh
              </Text>
              <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <Feather name="camera" color="green" size={20} />
              </TouchableOpacity>
            </View>
            {imageArr[0] ? <OpenCam image={imageArr[0]} /> : null}
            <View style={styles.action}>
              <Text style={{color: 'red', fontSize: 18, flex: 1}}>
                *Cách phòng trị
              </Text>
            </View>
            {phuongphaptri}
            <View style={styles.button}>
              <TouchableOpacity
                onPress={
                  () =>
                    //navigation.navigate('BookmarkScreen')
                    {
                      console.log(route.params);
                      // console.log(dataSendServer);
                      // let dataSendServer = {
                      //   cachtri: cachtri,
                      // };
                      let postDataServer = {
                        work: 'sauhai',
                        title: route.params.title,
                        //loaisau: loaisau,
                        isFarmer: currentUser.data._id,
                        // cachtri: cachtri,
                        sau: {
                          type: loaisau,
                          theCure: cachtri[0] + ',' + cachtri[1],
                        },
                        //deTailVal: dataSendServer,
                        imageData: imageSend,
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
                          postDataServer.arrayStumps = route.params.arrayStumps;
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
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}],
                      });
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
                    hoàng tất nhật ký
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default BocatlaScreen;

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
