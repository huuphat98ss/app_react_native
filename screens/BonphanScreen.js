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
  ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';

const BonphanScreen = ({navigation, route}) => {
  const [typeFer, setFer] = useState(0);
  const [imageArr, setImage] = useState([]);
  const album = route.params.initialState;
  console.log('album' + JSON.stringify(album));
  console.log(album.type);
  const menus = album.type.map((x, index) => (
    <Picker.Item key={index} label={x} value={x} />
  ));

  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const [img, chosenImage] = useState(0);
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
      console.log("img"+imgs);
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
  
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 500,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      let found = imageArr.find((element) => element == img);
      let found1 = found === undefined ? false : true;
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
      // console.log("img"+imgs);
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
  return (
    <View style={styles.container}>
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
              Loại phân
            </Text>
            <Picker
              selectedValue={typeFer}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setFer(itemValue)}>
              {menus}
            </Picker>
            <View style={styles.action}>
              <Text
                style={{
                  flex: 1,
                  // paddingLeft: 10,
                  color: '#008040',
                  fontSize: 16,
                }}>
                Chụp ảnh bón phân
              </Text>
              <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                <Feather name="camera" color="green" size={20} />
              </TouchableOpacity>
            </View>
            {imageArr[0] ? <OpenCam image={imageArr[0]} /> : null}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default BonphanScreen;

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
