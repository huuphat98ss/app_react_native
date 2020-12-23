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
import * as actionTypes from '../../src/redux/actions/types';
//import {useNavigation} from '@react-navigation/native';
const localhost = actionTypes.LOCALHOST;
//const localhost = '192.168.0.153';
class UpdateQrSold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      dataSendServer: [],
    };
  }

  ifScaned = (event) => {
    //console.log(event.data);
    let check = true;
    let length = this.state.dataSendServer.length;
    if (this.state.dataSendServer.length !== 0) {
      this.state.dataSendServer.forEach((element) => {
        if (element === event.data) {
          return (check = false);
        }
      });
    }
    if (check) {
      this.setState((prevState) => ({
        dataSendServer: [...prevState.dataSendServer, event.data],
      }));
      this.setState({
        count: length + 1,
      });
    }
  };
  sendDataUpdateToServer = () => {
    data = this.state.dataSendServer;
    if (data.length === 0) return;
    fetch(`http://${localhost}:3456/updateqrsold`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //  'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('update qr success');
        this.setState({
          dataSendServer: [],
          count: 0,
        });
      })
      .catch((error) => {
        console.log('update qr failer');
        console.error(error);
      });
  };

  render() {
    // const navigation = useNavigation();
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
          <Animatable.View animation="fadeInLeft">
            <Text style={styles.title}>
              Cập nhật sô QR là :
              <Text
                style={{
                  fontSize: 25,
                  color: this.state.count === 1 ? '#05375a' : 'red',
                }}>
                {this.state.count}
              </Text>
            </Text>

            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  this.sendDataUpdateToServer(this.state.linkInfor);
                  this.props.navigation.navigate('Home');
                }}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}>
                  <Text style={styles.textSign}>Hoàng tất</Text>
                  <MaterialIcons color="#fff" size={20} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </Animatable.View>
      </View>
    );
  }
}

export default UpdateQrSold;

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
    alignItems: 'center',
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
