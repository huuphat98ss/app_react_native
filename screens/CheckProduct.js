import React, {Component} from 'react';

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import QRCodeScanner from 'react-native-qrcode-scanner';

const localhost = '192.168.1.4';

class CheckProduct1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkInfor: '',
      showData: false,
      count: 1,
      resdata: 'not',
      nameOfCooperative: null,
      farmOwner: null,
      // data: [],
      // isLoading: true,
    };
  }

  componentDidMount = () => {
    fetch(`http://${localhost}:3456/search`)
      .then((response) => response.json())
      .then((json) => {
        console.log('a b c :' + json);
        this.setState({resdata: 'ok'});
      })
      .catch((error) => console.error(error));
  };

  changeShowData = () => {
    this.setState({showData: true});
  };
  changeCountLink = (data) => {
    if (this.state.linkInfor === data) {
      return this.setState({count: this.state.count + 1});
    } else {
      return this.setState({count: 1});
    }
  };
  ifScaned = (e) => {
    this.changeShowData();
    this.changeCountLink(e.data);
    this.setState({linkInfor: e.data});
    fetch(`http://${localhost}:3456/search/${e.data}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          nameOfCooperative: data[0].nameOfCooperative,
          farmOwner: data[1].farmOwner,
        }),
      );
  };
  onPressLink = async (data) => {
    console.log(data);
    Linking.openURL(`http://${localhost}:4345/search/${data}`).catch((err) =>
      Alert.alert('QR convert', data),
    );
    this.setState({
      nameOfCooperative: null,
      farmOwner: null,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <QRCodeScanner
            containerStyle={{
              backgroundColor: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onRead={this.ifScaned}
            reactivate={true} // first time true
            permissionDialogMessage="need premission to Access Camera"
            reactivateTimeout={2000}
            showMarker={true}
            markerStyle={{borderColor: '#FFF', borderRadius: 10}}
          />
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          {this.state.nameOfCooperative !== null ? (
            <Animatable.View animation="fadeInLeft">
              <Text style={styles.title}>Kết quả tìm được</Text>
              <Text style={styles.text}>
                {'Hợp tác xã: ' + this.state.nameOfCooperative}
              </Text>
              <Text style={styles.text}>
                {'Nông dân: ' + this.state.farmOwner}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    this.onPressLink(this.state.linkInfor);
                  }}>
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}>
                    <Text style={styles.textSign}>Xem Thêm</Text>
                    <MaterialIcons
                      name="navigate-next"
                      color="#fff"
                      size={20}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          ) : (
            <View>
              <Text style={styles.title}>Searching...</Text>
            </View>
          )}
        </Animatable.View>
      </View>
    );
  }
}

export default CheckProduct1;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
    fontSize: 18,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
