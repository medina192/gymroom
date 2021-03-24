import { NavigationHelpersContext } from '@react-navigation/core';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../../colors/colors';

const ListMessages = ({message, user}) => {

  console.log(message, user);

  return (
    <>
        <Text>Hola</Text>
    </>
  );
};

const styles = StyleSheet.create({
  topBar:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    backgroundColor: Colors.MainBlue,
  },
});

export default ListMessages;