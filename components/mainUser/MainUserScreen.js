import React, {useState, useEffect} from 'react';
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
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import axios from 'axios';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';

import ImageSlider from './ImageSlider';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import TopBar from '../compartido/TopBar';
import { NavigationContainer } from '@react-navigation/native';

import * as Keychain from 'react-native-keychain';

import Colors from '../../colors/colors';
import SideBarUser from '../compartido/SideBarUser';
import BottomBar from '../compartido/BottomBar';

import { saveUser } from '../../store/actions/actionsReducer';

import { urlServer } from '../../services/urlServer';

const Drawer = createDrawerNavigator();

export default function MainUserScreen({navigation}) {
  return (
    <>
      <Drawer.Navigator drawerContent={(navigation) => <SideBarUser {...navigation} />}>
        <Drawer.Screen name="UserScreen" component={UserScreen} />
      </Drawer.Navigator>
    </>
  );
}

const UserScreen = ({navigation}) => {

  const dispatch = useDispatch();


  console.log(new Date().getDate());

  useEffect(() => {
    //dispatch(saveUser({nombre: 'alejandro'}));
  }, []);

  const changeUserScreen = (newScreen) => {
    navigation.navigate(newScreen);
  }

  const openMenu = () => {
    navigation.openDrawer();
  }
  /*
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const c = new Date(year + 1, month, day) // PLUS 1 YEAR
  const d = new Date(year, month + 1, day) // PLUS 1 MONTH
  const f = new Date(year, month, day  + 8) // PLUS 1 DAY

  console.log('day', day);
  console.log('month', month);
  console.log('year', year);
  console.log('c', c);
  console.log('d', d);
  console.log('f', f);
  console.log('date', date);
  console.log('mysql date', f.toISOString());
  const a = f.toISOString();
  console.log('r', a.slice(0,10));
  console.log('to', Date('2020-02-01'));

  const date1 = new Date('2020-04-05');
  console.log(date1.getTime());
  const date2 = new Date('2020-02-05');
  console.log(date2.getTime());

  if(date1 > date2)
  {
    console.log('if');
  }
  else{
    console.log('else');
  }
*/

/*
  const proof = async() => {
    const username = 'zuck';
    const password = 'poniesRgr';
  
    // Store the credentials
    const p = await Keychain.setGenericPassword(username, password);

    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          ' Credentials successfully loaded for user ' + credentials.password
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
    await Keychain.resetGenericPassword();
  }

  proof();
*/


  return (
    <>
        <TopBar navigation={navigation} title={`Bienvenido Usuario`} returnButton={false} />
        <ScrollView style={styles.containerScrollView}>
          <ImageSlider />          

          <View style={styles.containerTextDescriptionButton}>
            <Text style={styles.textDescriptionButton}>Conitnua con tu rutina del d??a de hoy</Text>
            <Text style={styles.textDescriptionButtonSubtitle}>La disciplina es lo m??s importante</Text>
          </View>
          <View style={styles.containerTouchableImage}>
            <TouchableOpacity style={styles.touchableContainerImage}
              onPress={() => changeUserScreen('CustomPlan')} >
              <ImageBackground source={ require('../../assets/img/_3.jpg')} style={styles.imageButton}>
                <Text style={styles.textImageButton}>Plan personalizado</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
    
          <View style={styles.containerTextDescriptionButton}>
            <Text style={styles.textDescriptionButton}>Cada d??a se agregan nuevos entrenadores</Text>
            <Text style={styles.textDescriptionButtonSubtitle}>Conoce nuevos entrenadores</Text>
          </View>
          <View style={styles.containerTouchableImage}>
            <TouchableOpacity style={styles.touchableContainerImage}
              onPress={() => changeUserScreen('ListTrainers')} >
              <ImageBackground source={ require('../../assets/img/_1.jpg')} style={styles.imageButton}>
                <Text style={styles.textImageButton}>Entrenadores</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.containerTextDescriptionButton}>
            <Text style={styles.textDescriptionButton}>??Cuanto eh mejorado?</Text>
            <Text style={styles.textDescriptionButtonSubtitle}>Registra tu progreso</Text>
          </View>
          <View style={styles.containerTouchableImage}>
            <TouchableOpacity style={styles.touchableContainerImage}
              onPress={() => changeUserScreen('Statistics')} >
              <ImageBackground source={ require('../../assets/img/_4.jpg')} style={styles.imageButton}>
                <Text style={styles.textImageButton}>Estad??sticas</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.containerTextDescriptionButton}>
            <Text style={styles.textDescriptionButton}>Crear rutinas</Text>
          </View>
          <View style={styles.containerTouchableImage}>
            <TouchableOpacity style={styles.touchableContainerImage}
              onPress={() => changeUserScreen('Routines')} >
              <ImageBackground source={ require('../../assets/img/4.jpg')} style={styles.imageButton}>
                <Text style={styles.textImageButton}>Rutinas</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
    



          <View style={styles.containerButtonSubscribe}>
            <TouchableOpacity style={styles.buttonSubscribe} onPress={ () => navigation.navigate('MainTrainerScreen')}>
              <Text style={styles.textButoonSubscribe}>Pantalla Entrenador</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerButtonSubscribe}>
          <TouchableOpacity style={styles.buttonSubscribe} onPress={ () => navigation.navigate('Registro')}>
            <Text style={styles.textButoonSubscribe}>Pantalla Registro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerButtonSubscribe}>
          <TouchableOpacity style={styles.buttonSubscribe} onPress={ () => navigation.navigate('Login')}>
            <Text style={styles.textButoonSubscribe}>Pantalla Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerButtonSubscribe}>
          <TouchableOpacity style={styles.buttonSubscribe} onPress={ openMenu}>
            <Text style={styles.textButoonSubscribe}>drawer</Text>
          </TouchableOpacity>
        </View>

        </ScrollView>

        <BottomBar navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({
  containerScrollView:{
    flex: 1,
    backgroundColor: '#fff'
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



  containerButtonSubscribe:{
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 20
  },
  buttonSubscribe:{
    backgroundColor: '#f10265',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButoonSubscribe:{
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  },


  containerBottomBar:{
    width: '100%',
    height: 'auto',
    paddingVertical: 10,
    backgroundColor: Colors.MainBlue,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  iconBottomBar:{
    fontSize: 35,
    color: '#fff'
  }
});
