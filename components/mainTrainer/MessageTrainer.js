import React, {useState} from 'react';
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
  FlatList,
} from 'react-native';

import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import TopBar from '../compartido/TopBar';

import { createDrawerNavigator } from '@react-navigation/drawer';

import SideBarUser from '../compartido/SideBarUser';
import TrainerCard from './listTrainersComponents/TrainerCard';
import BottomBar from '../compartido/BottomBar';

const Drawer = createDrawerNavigator();

export default function MessageTrainer() {
  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarUser {...props} />}>
        <Drawer.Screen name="MessageTrainer" component={MessageTrainerScreen} />
      </Drawer.Navigator>
    </>
  );
}


const MessageTrainerScreen = ({navigation}) => {

  const serverUrl = 'http://192.168.1.77:3001';



  return (
    <>
      <View style={styles.containerListTrainers}>
        <TopBar navigation={navigation} title={`Lista de entrenadores`} returnButton={true} />
        
        <BottomBar navigation={navigation}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerListTrainers:{
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
