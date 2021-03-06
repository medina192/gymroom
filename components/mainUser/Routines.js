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
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';

import TopBar from '../compartido/TopBar';

import { createDrawerNavigator } from '@react-navigation/drawer';

import SideBarUser from '../compartido/SideBarUser';

import BottomBar from '../compartido/BottomBar';

import { routines } from '../../services/routines';

import { saveSubCategorie } from '../../store/actions/actionsReducer';

const Drawer = createDrawerNavigator();

export default function Routines() {
  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarUser {...props} />}>
        <Drawer.Screen name="Routines" component={RoutinesScreen} />
      </Drawer.Navigator>
    </>
  );
}


const RoutinesScreen = ({navigation}) => {
  
  const dispatch = useDispatch();

  const changeToSubCategorie = (name) => {
    dispatch(saveSubCategorie(name));
    navigation.navigate('SubCategories');
  }
  
  return (
    <>
      <TopBar navigation={navigation} title={`Rutinas`} returnButton={true} />
 
      <View style={styles.containerScrollView}>
        <FlatList
          data={routines}
          renderItem= { (routine) =>               
              (
                <View style={styles.containerTouchableImage}>
                  <TouchableOpacity style={styles.touchableContainerImage}
                   onPress={() => changeToSubCategorie(routine.item)} >
                      <Text style={styles.textImageButton}>{routine.item.name}</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          keyExtractor= { (item, key) => key}
                    />
      </View>
      <BottomBar navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({
  containerScrollView:{
    flex: 1
  },
  containerTouchableImage:{
    height: 150,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 25,
    marginBottom: 10
  },
  touchableContainerImage:{
    height: '100%',
    width: '100%',
    backgroundColor: '#123456',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden', 
  },
  imageButton: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  textImageButton:{
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#244EABa0"
  },  
  containerTextDescriptionButton:{
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
  },
  textDescriptionButton:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700'
  },
  textDescriptionButtonSubtitle:{
    fontSize: 14,
    marginTop: 5
  },
});
