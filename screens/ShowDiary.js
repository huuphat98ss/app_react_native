import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
// import {showDiary} from '../src/redux/actions/diary';
import * as actions from '../src/redux/actions/diary';
import base64 from 'react-native-base64';
import ImageModal from 'react-native-image-modal';
import moment from 'moment';
const ShowDiary = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [ShowImages, setImage] = useState(null);
  console.log('showDiary');

  //console.log(route.params.dataDiary);
  let data = route.params.dataDiary;
  const dataStayDiary = useSelector(
    (state) => state.diaryReducer.dataStayDiary,
  );

  console.log('data stay');
  // console.log(route.params.date);
  // console.log(moment(new Date()).format('MM/DD/YY'));
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  let ShowModalImage = (i) => {
    console.log(i);
    dataFile = null;
    if (data.files.length === 0) return;
    data.files.forEach((e, index) => {
      if (index === i) {
        dataFile = e;
      }
    });
    function bufferToBase64(buffer) {
      let base = base64.encodeFromByteArray(buffer);
      return base;
    }
    let imageConvert = '';
    if (dataFile !== null) {
      imageConvert = `data:${dataFile.contentType};base64,${bufferToBase64(
        dataFile.data.data,
      )}`;
    }
    let image = (
      <View
        style={{
          height: 300,
          width: 300,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={{uri: imageConvert}}
          style={{height: 270, width: 320}}
          imageStyle={{borderRadius: 15}}></ImageBackground>
      </View>
    );
    setImage(image);
  };
  let Tacvu = () => {
    if (data.work === 'phunthuoc') return 'Phun Thuốc';
    if (data.work === 'bonphan') return 'Bón Phân';
    if (data.work === 'sauhai') return 'Sâu Hại';
    if (data.work === 'Baotrai') return 'Bao trái';
    if (data.work === 'tuoinuoc') return 'Tưới nước';
    if (data.work === 'benhhai') return 'Bệnh hại';
  };
  let ViewBenhHai = () => {
    let views = data.preparation.map((e, i) => {
      return (
        <View
          style={[
            styles.action,
            {flex: 1, flexDirection: 'column', justifyContent: 'space-between'},
          ]}
          key={i}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              //justifyContent: 'space-between',
            }}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              Tên thuốc: {e.thuoc}, loại: {e.loai}, số lượng: {e.soluong}, dung
              tích: {e.dungtich} ml, lượng nước: {e.luongnuoc} lit
            </Text>
            <TouchableOpacity
              // style={{flex: 1}}
              onPress={() => {
                ShowModalImage(i);
              }}>
              <Feather name="aperture" color="#01ab9d" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
    let vitri = '';
    if (data.node.length !== 0) {
      vitri = data.node.map((e) => {
        let stay = dataStayDiary.map((element, i) => {
          return (
            <View style={styles.action} key={i}>
              <Text
                style={{
                  flex: 1,
                  color: '#090a0a',
                  fontSize: 14,
                }}>
                tại Lô {element.batch}, Thửa {element.stump}, hàng {e.row}, stt{' '}
                {e.col}
              </Text>
            </View>
          );
        });
        return stay;
      });
    } else {
      vitri = dataStayDiary.map((element, i) => {
        return (
          <View style={styles.action} key={i}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              tại Lô {element.batch},
              {element.stump === 'all'
                ? ' các thửa trong lô' + element.batch
                : 'Thửa ' + element.stump}
              , áp dụng cho các cây trong thửa
            </Text>
          </View>
        );
      });
    }

    return (
      <View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 2,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Danh sách thuốc đã dùng
          </Text>
          <TouchableOpacity
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            {/* <Feather name="edit-3" color="#01ab9d" size={20} /> */}
          </TouchableOpacity>
        </View>
        {views}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
          }}>
          {ShowImages}
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Vị trí thực hành
          </Text>
          <TouchableOpacity
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            {/* <Feather name="edit-3" color="#01ab9d" size={20} /> */}
          </TouchableOpacity>
        </View>
        <ScrollView style={{height: 200}}>{vitri}</ScrollView>
      </View>
    );
  };
  let ViewPhunThuoc = () => {
    let views = data.preparation.map((e, i) => {
      return (
        <View
          style={[
            styles.action,
            {flex: 1, flexDirection: 'column', justifyContent: 'space-between'},
          ]}
          key={i}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              //justifyContent: 'space-between',
            }}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              Tên thuốc: {e.thuoc}, loại: {e.loai}, số lượng: {e.soluong}, dung
              tích: {e.dungtich} ml, lượng nước: {e.luongnuoc} lit
            </Text>
            <TouchableOpacity
              // style={{flex: 1}}
              onPress={() => {
                ShowModalImage(i);
              }}>
              <Feather name="aperture" color="#01ab9d" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
    let vitri = '';
    if (data.node.length !== 0) {
      vitri = data.node.map((e) => {
        let stay = dataStayDiary.map((element, i) => {
          return (
            <View style={styles.action} key={i}>
              <Text
                style={{
                  flex: 1,
                  color: '#090a0a',
                  fontSize: 14,
                }}>
                tại Lô {element.batch}, Thửa {element.stump}, hàng {e.row}, stt{' '}
                {e.col}
              </Text>
            </View>
          );
        });
        return stay;
      });
    } else {
      vitri = dataStayDiary.map((element, i) => {
        return (
          <View style={styles.action} key={i}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              tại Lô {element.batch},
              {element.stump === 'all'
                ? ' các thửa trong lô' + element.batch
                : 'Thửa ' + element.stump}
              , áp dụng cho các cây trong thửa
            </Text>
          </View>
        );
      });
    }

    return (
      <View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 2,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Danh sách thuốc đã dùng
          </Text>
          <TouchableOpacity
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            {/* <Feather name="edit-3" color="#01ab9d" size={20} /> */}
          </TouchableOpacity>
        </View>
        {views}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
          }}>
          {ShowImages}
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Vị trí thực hành
          </Text>
          <TouchableOpacity
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            {/* <Feather name="edit-3" color="#01ab9d" size={20} /> */}
          </TouchableOpacity>
        </View>
        <ScrollView style={{height: 200}}>{vitri}</ScrollView>
      </View>
    );
  };
  let ViewBonPhan = () => {
    // let views = 'Bon phan';
    let imageShow = null;
    function bufferToBase64(buffer) {
      let base = base64.encodeFromByteArray(buffer);
      return base;
    }

    if (data.files.length === 0) {
      imageShow = (
        <View>
          <Text>Không có hình</Text>
        </View>
      );
    } else {
      let imageConvert = '';
      if (data.files[0] !== null) {
        imageConvert = `data:${
          data.files[0].contentType
        };base64,${bufferToBase64(data.files[0].data.data)}`;
      }
      imageShow = (
        <View
          style={{
            height: 300,
            width: 300,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={{uri: imageConvert}}
            style={{height: 270, width: 320}}
            imageStyle={{borderRadius: 15}}></ImageBackground>
        </View>
      );
    }

    let vitri = '';
    if (data.node.length !== 0) {
      vitri = data.node.map((e) => {
        let stay = dataStayDiary.map((element, i) => {
          return (
            <View style={styles.action} key={i}>
              <Text
                style={{
                  flex: 1,
                  color: '#090a0a',
                  fontSize: 14,
                }}>
                tại Lô {element.batch}, Thửa {element.stump}, hàng {e.row}, stt{' '}
                {e.col}
              </Text>
            </View>
          );
        });
        return stay;
      });
    } else {
      vitri = dataStayDiary.map((element, i) => {
        return (
          <View style={styles.action} key={i}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              tại Lô {element.batch},
              {element.stump === 'all'
                ? ' các thửa trong lô' + element.batch
                : 'Thửa ' + element.stump}
              , áp dụng cho các cây trong thửa
            </Text>
          </View>
        );
      });
    }

    return (
      <View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 2,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Hình ảnh phân bón
          </Text>
        </View>
        <Text>tên phân bón{' ' + data.ferTiLizer}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
          }}>
          {imageShow}
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Vị trí thực hành
          </Text>
        </View>
        <ScrollView style={{height: 400}}>{vitri}</ScrollView>
      </View>
    );
  };
  let ViewBaoTrai = () => {
    // let views = 'Bon phan';
    let imageShow = null;
    function bufferToBase64(buffer) {
      let base = base64.encodeFromByteArray(buffer);
      return base;
    }

    if (data.files.length === 0) {
      imageShow = (
        <View>
          <Text>Không có hình</Text>
        </View>
      );
    } else {
      let imageConvert = '';
      if (data.files[0] !== null) {
        imageConvert = `data:${
          data.files[0].contentType
        };base64,${bufferToBase64(data.files[0].data.data)}`;
      }
      imageShow = (
        <View
          style={{
            height: 300,
            width: 300,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={{uri: imageConvert}}
            style={{height: 270, width: 320}}
            imageStyle={{borderRadius: 15}}></ImageBackground>
        </View>
      );
    }

    let vitri = '';
    if (data.node.length !== 0) {
      vitri = data.node.map((e) => {
        let stay = dataStayDiary.map((element, i) => {
          return (
            <View style={styles.action} key={i}>
              <Text
                style={{
                  flex: 1,
                  color: '#090a0a',
                  fontSize: 14,
                }}>
                tại Lô {element.batch}, Thửa {element.stump}, hàng {e.row}, stt{' '}
                {e.col}
              </Text>
            </View>
          );
        });
        return stay;
      });
    } else {
      vitri = dataStayDiary.map((element, i) => {
        return (
          <View style={styles.action} key={i}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              tại Lô {element.batch},
              {element.stump === 'all'
                ? ' các thửa trong lô' + element.batch
                : 'Thửa ' + element.stump}
              , áp dụng cho các cây trong thửa
            </Text>
          </View>
        );
      });
    }

    return (
      <View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 2,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Hình ảnh Bao trái
          </Text>
        </View>
        {/* <Text>{views}</Text> */}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
          }}>
          {imageShow}
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Vị trí thực hành
          </Text>
        </View>
        <ScrollView style={{height: 200}}>{vitri}</ScrollView>
      </View>
    );
  };
  let ViewTuoiNuoc = () => {
    let vitri = '';
    if (data.node.length !== 0) {
      vitri = data.node.map((e) => {
        let stay = dataStayDiary.map((element, i) => {
          return (
            <View style={styles.action} key={i}>
              <Text
                style={{
                  flex: 1,
                  color: '#090a0a',
                  fontSize: 14,
                }}>
                tại Lô {element.batch}, Thửa {element.stump}, hàng {e.row}, stt{' '}
                {e.col}
              </Text>
            </View>
          );
        });
        return stay;
      });
    } else {
      vitri = dataStayDiary.map((element, i) => {
        return (
          <View style={styles.action} key={i}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              tại Lô {element.batch},
              {element.stump === 'all'
                ? ' các thửa trong lô' + element.batch
                : 'Thửa ' + element.stump}
              , áp dụng cho các cây trong thửa
            </Text>
          </View>
        );
      });
    }
    return (
      <View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Vị trí thực hành
          </Text>
        </View>
        <ScrollView style={{height: 200}}>{vitri}</ScrollView>
      </View>
    );
  };

  let ViewSauHai = () => {
    let imageShow = [];
    function bufferToBase64(buffer) {
      let base = base64.encodeFromByteArray(buffer);
      return base;
    }

    if (data.files.length === 0) {
      imageShow.push(
        <View>
          <Text>Không có hình</Text>
        </View>,
      );
    } else {
      let array = data.files.map((e) => {
        return `data:${e.contentType};base64,${bufferToBase64(e.data.data)}`;
      });

      array.forEach((ele, i) => {
        imageShow.push(
          <View
            style={{
              height: 350,
              width: 300,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={i}>
            <Text
              style={{
                color: '#01ab9d',
                fontSize: 17,
                fontWeight: 'bold',
                // textAlign: 'left',
                // backgroundColor: '#000000a0',
              }}>
              {i === 0 ? 'Ảnh bênh' : 'Cách trị'}
            </Text>
            <Text
              style={{
                color: '#01ab9d',
                fontSize: 14,
                //  fontWeight: 'bold',
                // textAlign: 'left',
                // backgroundColor: '#000000a0',
              }}>
              {i !== 0 ? data.worm.theCure : null}
            </Text>
            <ImageBackground
              source={{uri: ele}}
              style={{height: 270, width: 320}}
              imageStyle={{borderRadius: 15}}></ImageBackground>
          </View>,
        );
      });
    }

    let views = data.preparation.map((e, i) => {
      return (
        <View
          style={[
            styles.action,
            {flex: 1, flexDirection: 'column', justifyContent: 'space-between'},
          ]}
          key={i}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              //justifyContent: 'space-between',
            }}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              Tên thuốc: {e.thuoc}, loại: {e.loai}, số lượng: {e.soluong}, dung
              tích: {e.dungtich} ml, lượng nước: {e.luongnuoc} lit
            </Text>
            {/* <TouchableOpacity
              // style={{flex: 1}}
              onPress={() => {
                ShowModalImage(i);
              }}>
              <Feather name="aperture" color="#01ab9d" size={20} />
            </TouchableOpacity> */}
          </View>
        </View>
      );
    });

    let vitri = '';
    if (data.node.length !== 0) {
      vitri = data.node.map((e) => {
        let stay = dataStayDiary.map((element, i) => {
          return (
            <View style={styles.action} key={i}>
              <Text
                style={{
                  flex: 1,
                  color: '#090a0a',
                  fontSize: 14,
                }}>
                tại Lô {element.batch}, Thửa {element.stump}, hàng {e.row}, stt{' '}
                {e.col}
              </Text>
            </View>
          );
        });
        return stay;
      });
    } else {
      vitri = dataStayDiary.map((element, i) => {
        return (
          <View style={styles.action} key={i}>
            <Text
              style={{
                flex: 1,
                color: '#090a0a',
                fontSize: 14,
              }}>
              tại Lô {element.batch},
              {element.stump === 'all'
                ? ' các thửa trong lô' + element.batch
                : 'Thửa ' + element.stump}
              , áp dụng cho các cây trong thửa
            </Text>
          </View>
        );
      });
    }

    return (
      <View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 2,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Thông tin Bệnh :{' ' + data.worm.type}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
          }}>
          {imageShow}
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 2,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Danh sách thuốc đã dùng
          </Text>
        </View>
        {views}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 10,
          }}>
          {ShowImages}
        </View>
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            Vị trí thực hành
          </Text>
          {/* <TouchableOpacity
            style={{
              flex: 1,
              color: '#01ab9d',
              fontSize: 16,
              paddingTop: 10,
            }}>
            <Feather name="edit-3" color="#01ab9d" size={20} />
          </TouchableOpacity> */}
        </View>
        <ScrollView style={{height: 200}}>{vitri}</ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>
          Xem nhật ký : {route.params.date}{' '}
        </Text>
        <Text style={[styles.text_header, {fontSize: 16, color: '#cf7a13'}]}>
          Nông dân: {currentUser.data.username}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.footer}>
          <View style={styles.action}>
            <Text
              style={{
                flex: 1,
                // paddingLeft: 10,
                color: '#01ab9d',
                fontSize: 16,
              }}>
              Tác Vụ
            </Text>
            <Text
              style={{
                flex: 1,
                // paddingLeft: 10,
                color: '#090a0a',
                fontSize: 16,
              }}>
              {Tacvu()}
            </Text>
          </View>
          {data.work === 'phunthuoc'
            ? ViewPhunThuoc()
            : data.work === 'bonphan'
            ? ViewBonPhan()
            : data.work === 'Baotrai'
            ? ViewBaoTrai()
            : data.work === 'tuoinuoc'
            ? ViewTuoiNuoc()
            : data.work === 'sauhai'
            ? ViewSauHai()
            : data.work === 'benhhai'
            ? ViewBenhHai()
            : null}
          <View
            style={[
              styles.button,
              {
                display:
                  route.params.date === moment(new Date()).format('MM/DD/YY')
                    ? 'flex'
                    : 'none',
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setImage(null);
                //  navigation.goBack();
                Alert.alert(
                  'Xác nhận xóa',
                  'xóa nhật ký này',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        console.log('OK Pressed');
                        // console.log(route.params.dataDiary);
                        let dateReal = moment(
                          route.params.date,
                          'MM/YYYY',
                        ).format('MM/YYYY');
                        let dataSendDelete = {
                          idDiary: data._id,
                          idFarmer: data.idFarmer,
                          // date: dateReal,
                        };
                        // console.log(dataSendDelete);
                        dispatch(actions.deleteDiary(dataSendDelete));
                        //dispatch(actions.showDiary(dataSendDelete));
                        //  navigation.goBack({idDiary: data._id});

                        navigation.navigate('ViewDiary', {idDiaryss: data._id});
                      },
                    },
                  ],
                  {cancelable: false},
                );
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
                  Xóa nhật ký
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShowDiary;

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
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignContent: 'center',
  },
  picker: {height: 100, alignSelf: 'stretch', flexDirection: 'row'},
  text_header: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
    //flex: 1,
    //flexDirection: 'row',
  },
  text_footer: {
    // color: '#05375a',
    color: '#0a0909',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.5,
    // borderBottomColor: '#f2f2f2',
    paddingBottom: 3,
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
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
    width: '100%',
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
