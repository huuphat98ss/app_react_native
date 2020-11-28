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
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector} from 'react-redux';

const SupportScreen = ({navigation, route}) => {
  const [language, setLanguage] = useState('java');
  const album = route.params.initialState;
  console.log('album' + JSON.stringify(album));
  console.log(album.type);
  console.log(language);
  const menus = album.type.map((x, index) => (
    <Picker.Item key={index} label={x} value={x} />
  ));
  // console.log(menus);

  const currentUser = useSelector((state) => state.authReducer.currentUser);
  return (
    // <View>
    //   <Header
    //     leftComponent={
    //       <Icon
    //         name="chevron-back-outline"
    //         color="#fff"
    //         size={26}
    //         onPress={() => navigation.goBack()}
    //       />
    //     }
    //     centerComponent={{text: 'SUPPORT', style: {color: '#fff'}}}
    //     // rightComponent={{icon: 'home', color: '#fff'}}
    //     containerStyle={{
    //       backgroundColor: '#009387',
    //       // justifyContent: 'space-around',
    //     }}
    //   />
    //   <View style={styles.container}>
    //     <Text>Support Screen</Text>
    //     <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    //     <View>
    //       <Text>lo</Text>
    //     </View>
    //     <View>
    //       <Text>Thua</Text>
    //     </View>
    //     <View>
    //       <Text>vi tri trong thua</Text>

    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>
          Hợp tác xã: {currentUser.username}
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          <ScrollView>
            <View style={styles.action}>
              <FontAwesome name="lock" color="black" size={20} />
              <TextInput
                placeholder="Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                // secureTextEntry={this.state.secureTextEntry ? true : false}
                // onChangeText={(val) => this.handlePasswordChange(val)}
                // onEndEditing={(e) => this.handleValidPassword(e.nativeEvent.text)}
              />
              <TouchableOpacity onPress={() => {}}>
                <Feather name="eye-off" color="black" size={20} />
                {/* {this.state.secureTextEntry ? (
                <Feather name="eye-off" color="black" size={20} />
              ) : (
                <Feather name="eye" color="#403d3d" size={20} />
              )} */}
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={language}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}>
              {menus}
            </Picker>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  () => navigation.goBack();
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
                    Click Here
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

export default SupportScreen;

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
    paddingVertical: 30,
    alignContent: 'center',
  },
  picker: {height: 100, alignSelf: 'stretch', flexDirection: 'row'},
  text_header: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  text_footer: {
    // color: '#05375a',
    color: '#0a0909',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
