import React from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Container = styled.View``;
const AlbumArt = styled.Image`
  margin-top: 16px;
  width: 160px;
  height: 160px;
  border-radius: 16px;
  margin-bottom: 16px;
`;
const Name = styled.Text`
  color: black;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
`;
const Caption = styled.Text`
  font-size: 14px;
  padding: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CaptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HomeScreenComponent = ({album, name, caption, likes}) => {
  const navigation = useNavigation();
  //console.log('album' + album);
  return (
    <Animatable.View
      animation="fadeInUpBig"
      // options={{
      //   title: 'Details',
      //   headerLeft: () => (
      //     <Icon.Button
      //       name="ios-menu"
      //       size={25}
      //       backgroundColor="#1f65ff"
      //       onPress={() => {
      //         navigation.openDrawer();
      //       }}></Icon.Button>
      //   ),
      // }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')}>
        <Container>
          <AlbumArt
            source={{uri: album}}
            // {require('../asset/fertilizer.png')}
          ></AlbumArt>
          <Name>{name}</Name>
          {/* <Row>
            <CaptionContainer>
              <Icon name="heart-outline" />
              <Caption>{likes}</Caption>
            </CaptionContainer>
            <CaptionContainer>
              <Icon name="airplane-outline" />
              <Caption>{caption}</Caption>
            </CaptionContainer>
          </Row> */}
        </Container>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreenComponent;
