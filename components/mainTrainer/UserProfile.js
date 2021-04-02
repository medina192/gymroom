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
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';

import Colors from '../../colors/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';

import SideBarTrainer from '../compartido/SideBarTrainer';

import { createDrawerNavigator } from '@react-navigation/drawer';
import TopBar from '../compartido/TopBar';
import BottomBar from '../compartido/BottomBar';

import { urlServer } from '../../services/urlServer';

const Drawer = createDrawerNavigator();

export default function UserProfile() {
  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarTrainer {...props} />}>
        <Drawer.Screen name="UserProfileScreen" component={UserProfileScreen} />
      </Drawer.Navigator>
    </>
  );
}

const UserProfileScreen = ({navigation}) => {

  const serverUrl = urlServer.url;

  const [userSubscribed, setUserSubscribed] = useState({
    state_subscription: 0,
    userSubscribedStatus: false
  });  

  const trainer = useSelector(state => state.T_trainer);
  const user = useSelector(state => state.T_user);
  const state = useSelector(state => state);

  useEffect(() => {
    verifyRelation();
    getRoutines();
  }, []);

  const getRoutines = () => {
    
    axios({
      method: 'get',
      url: `${serverUrl}/relations/getroutines/email_usuario=${user.email_usuario}`,
    })
    .then(function (response) {
        console.log('routine',response);
    })
    .catch(function (error) {
        console.log('errorget routines  axios',error);
    });
  }

  const verifyRelation = () => {
    axios({
      method: 'get',
      url: `${serverUrl}/relations/getrelation/${user.email}${trainer.email}`,
    })
    .then(function (response) {

      if(response.data.resp.length > 0)
      {
        const statusSubscription =  response.data.resp[0].estado_subscripcion;
        setUserSubscribed({
          state_subscription: statusSubscription,
          userSubscribedStatus: true
        });
      }
    })
    .catch(function (error) {
        console.log('error verify relation axios',error);
    });
  }

  const dispatch = useDispatch();



  const subscribe = () => {
    const dateSubscription = new Date();
    const dateShortFormat = dateSubscription.toISOString();
    const dateMysqlFormat = dateShortFormat.slice(0,10);

    axios({
      method: 'post',
      url: `${serverUrl}/relations/registerRelation`,
      data: {
        email_usuario: user.email,
        email_entrenador: trainer.email,
        email_usuario_entrenador: `${user.email+trainer.email}`,
        fecha_subscripcion: dateMysqlFormat,
        estado_subscripcion: 1
      }
    })
    .then(function (response) {
      //console.log('response', response.data);
      verifyRelation();
      /*
      setUserSubscribed({
        state_subscription: 0,
        userSubscribedStatus: true
      });
      */
    })
    .catch(function (error) {
        console.log('error subscribe axios',error);
    });
  }

  const sendMessage = () => {
    navigation.navigate('MessageUser');
  }

  const createNewRoutine = () => {
    navigation.navigate('Routines');
  } 

  return (
    <>
       <TopBar navigation={navigation} title={'user profile'} returnButton={true}/>
       <View style={styles.containerTrainerCard}>
          <View style={styles.trainerCard}>
            <View style={styles.containerImage_Name}>
                <Icon name="user-o" size={24} style={styles.iconImage} color="#fff" />
              <Text style={styles.trainerName}>{user.email_usuario}</Text>
            </View>
            <View style={styles.containerDescription}>

            </View>
            <View style={styles.containerContactInformation}>
                <Icon name="envelope" size={24} style={styles.iconContact} color="#fff" />
                <Icon name="instagram" size={24} style={styles.iconContact} color="#fff" />
                <Icon name="facebook-square" size={24} style={styles.iconContact} color="#fff" />
                <Icon name="twitter-square" size={24} style={styles.iconContact} color="#fff" />
            </View>
          </View>
          
              <View style={styles.containerButtonSubscribe}>
                <ScrollView>
                  {

                  }
                  <TouchableOpacity style={styles.buttonSubscribe} onPress={ sendMessage }>
                    <Text style={styles.textButoonSubscribe}>Enviar Mensaje</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              <View style={styles.containerRoutines}>
                <View style={styles.containerButtonSubscribe}>
                  <TouchableOpacity style={styles.buttonSubscribe} onPress={ createNewRoutine }>
                    <Text style={styles.textButoonSubscribe}>Crear nueva rutina</Text>
                  </TouchableOpacity>
                </View>
              </View>




        </View>
        <BottomBar navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({
    containerTrainerCard:{
        paddingHorizontal: 15,
        paddingVertical: 20,
        flex: 1
      },
      trainerCard:{
        backgroundColor: "#244EABa0",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      containerImage_Name:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15
      },
      iconImage:{
        fontSize: 80,
        color: '#fff'
      },
      trainerName:{
        fontSize: 22,
        fontWeight: '700',
        color: '#fff'
      },  
      containerDescription:{
        paddingHorizontal: 15,
        paddingVertical: 15
      },
      description:{
        fontSize: 18
      },
      containerContactInformation:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
      },
      iconContact:{
        fontSize: 24,
        color: '#fff'
      },

    // routines
    containerRoutines:{
      flex: 1,
    },  

    // button subscribe
  containerButtonSubscribe:{
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 20
  },
  buttonSubscribe:{
    backgroundColor: Colors.Orange,
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
});

