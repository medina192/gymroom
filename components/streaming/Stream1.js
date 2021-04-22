import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';

import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import RtcEngine from "react-native-agora";

import axios from 'axios';








const Stream1 = ({navigation}) => {

    const createLive = () => navigation.navigate("Live", { type: "create", channel: uuid() });

    const joinLive = () => navigation.navigate("Live", { type: "join", channel: joinChannel });

  return (
    <>  
        <Text>streame</Text>
    </>
  );
};

const styles = StyleSheet.create({
  containerInputs:{
    flex: 1,
    width: '100%',
    backgroundColor: '#4b4b4b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Stream1;