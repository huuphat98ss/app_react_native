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
  textAlign: center;
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

const HomeScreenComponent = ({
  navigation,
  album,
  name,
  caption,
  likes,
}) => {
  console.log("album" + album);
  return (
    <Animatable.View animation="fadeInUpBig">
      <TouchableOpacity onPress={() => navigation.navigate('SupportScreen')}>
        <Container>
          <AlbumArt source=
          {{uri: album }} 
          // {require(album)}
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
