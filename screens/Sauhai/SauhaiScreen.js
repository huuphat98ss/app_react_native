import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SauhaiScreen = ({navigation, route}) => {
  const album = route.params.initialState;
  // console.log(route.params);
  let loaiSauArray = [];
  let nguyennhanArray = [];
  let cachtriArray = [];
  for (const [key, value] of Object.entries(album.type)) {
    loaiSauArray.push(key);
    nguyennhanArray.push(value[0]);
    cachtriArray.push(value[1]);
  }
  console.log(loaiSauArray);
  let applyArrayRender = loaiSauArray.map((arr, index) => (
    <View
      key={index}
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(arr, {
            info: nguyennhanArray[index],
            loaisau: arr,
            cachtri: cachtriArray[index],
            title: route.params.title,
            idBatch: route.params.idBatch,
            arrayStumps: route.params.arrayStumps,
            isStump: route.params.isStump,
            arrayChecked: route.params.arrayChecked,
          })
        }
        style={styles.xitthuoc}>
        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.xitthuoc}>
          <Text
            style={[
              styles.textSign,
              {
                color: '#fff',
              },
            ]}>
            {arr}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  ));

  return (
    <View style={styles.container}>
      {/* <Text>SauhaiScreen</Text>
      <Button
        title="Click Here"
        onPress={() => alert("Huy")}
      /> */}
      {applyArrayRender}
    </View>
  );
};

export default SauhaiScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  chonThua: {
    flexDirection: 'column',
    marginBottom: 5,
    marginTop: 5,
    // borderBottomWidth: 0.5,
    borderBottomColor: '#f1f1f1',
    justifyContent: 'center',
  },
  chonThuaItem: {
    flex: 1,
    alignSelf: 'stretch',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
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
});
