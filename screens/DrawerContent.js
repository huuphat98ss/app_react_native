import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Paragraph,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../components/context';
import {useSelector} from 'react-redux';

import {useDispatch} from 'react-redux';
import * as actions from '../src/redux/actions/auth';
import * as actionDiary from '../src/redux/actions/diary';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
export function DrawerContent(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  console.log('Drawer say');
  // console.log(currentUser);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
              }}>
              <Avatar.Image
                source={{
                  uri:
                    'https://cdn1.iconfinder.com/data/icons/profession-avatar-flat/64/Avatar-farmer-peasant-breeder-512.png',
                }}
                size={50}
                backgroundColor="#009387"
              />
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'column',
                  // paddingTop: 0,
                }}>
                <Title style={styles.title}>{currentUser.data.username}</Title>
                <Caption style={styles.caption}>Nông dân</Caption>
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View> */}
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Trang chủ"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Thông tin cá nhân"
              onPress={() => {
                console.log('press here');
                console.log(currentUser);
                console.log('press heres');
                dispatch(actionDiary.getDataFarmer(currentUser.data._id));
                props.navigation.navigate('ProfileFarmer', {
                  username: currentUser.data.username,
                });
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="calendar-month-outline" color={color} size={size} />
              )}
              label="Xem nhật ký"
              onPress={() => {
                let dateReal = moment(new Date(), 'MM/YYYY').format('MM/YYYY');
                console.log('drawer ' + dateReal);
                let data = {
                  date: dateReal,
                  idfarmer: currentUser.data._id,
                };
                dispatch(actionDiary.showDiary(data));

                props.navigation.navigate('ViewDiary', {
                  idfarmer: currentUser.data._id,
                  username: currentUser.data.username,
                });
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Update Qr Sold"
              onPress={() => {
                props.navigation.navigate('UpdateQrSold');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label="Đăng xuất"
          onPress={() => {
            console.log('logout');
            AsyncStorage.clear();
            //  AsyncStorage.removeItem('userToken');
            // dispatch({type: 'LOGOUT_USER'});
            dispatch(actions.logout());
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
