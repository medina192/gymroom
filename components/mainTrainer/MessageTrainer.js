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

import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import TopBar from '../compartido/TopBar';

import { createDrawerNavigator } from '@react-navigation/drawer';


import BottomBar from '../compartido/BottomBar';


import Colors  from '../../colors/colors';

import { saveUser } from '../../store/actions/actionsReducer';

const Drawer = createDrawerNavigator();

/*
export default function MessageUser({navigation, route}) {


  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarUser {...props} />}>
        <Drawer.Screen name="MessageUser" component={(props) => <MessageUserScreen />} trainer={route.params.trainer}/>
      </Drawer.Navigator>
    </>
  );
}
*/

import { urlServer } from '../../services/urlServer';

import * as Keychain from 'react-native-keychain';
//import { Colors } from 'react-native/Libraries/NewAppScreen';

const MessageTrainer = ({navigation, route}) => {


  //const trainerInformation = route.params.trainer;

  const serverUrl = urlServer.url;

  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  //const [userInformation, setUserInformation] = useState({});
  //const [userInformationLoaded, setUserInformationLoaded] = useState(false);
  //const [messagesLoaded, setMessagesLoaded] = useState(false);
  const [listMessages, setListMessages] = useState({
    lengthOldMessages: 0, 
    messages: []
  });
  const [state, setState] = useState(false);

  const userInformation = useSelector(state => state.T_user);
  const trainerInformation = useSelector(state => state.T_trainer);
  const idRelation = useSelector(state => state.idRelation);

  const state1 = useSelector(state => state);


  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    sendMessage();
  }, [listMessages]);

  /*
  if(!userInformationLoaded)
  {
    const getDataUserIsLogged = async() => {

      try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const userJSON = JSON.parse(credentials.username);
          setUserInformationLoaded(true);
          setUserInformation(userJSON);
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
      //await Keychain.resetGenericPassword();
    }
  
    getDataUserIsLogged();
  }
*/


    const loadMessages = () => {
     setMessage('');
     axios({
        method: 'get',
        url: `${serverUrl}/userscreens/getmessages/${idRelation}`,
      })
      .then(function (response) {
        //console.log('resp messages',response);
        let obtainedMessages = response.data.resp;

        if(obtainedMessages.length === 0)
        {
          console.log('if');
        }
        else{
          const obtainedMessagesObject = JSON.parse(obtainedMessages[0].mensajes_string);
          setListMessages(obtainedMessagesObject);
        }

      })
      .catch(function (error) {
          console.log('error axios get messages',error);
      });
    }



  const saveInputMessage = (text) => {
    setMessage(text);
  }


  const addNewMessage = (newMessage, lengthOldListMessages) => {

    const user_message = {
      email_usuario: trainerInformation.email,
      message: newMessage
    }
    setListMessages({
      lengthOldMessages: lengthOldListMessages,
      messages: [...listMessages.messages, user_message]
    });
    
  }


  const changeState = () => {
 
  }

  const sendMessage = () => {

   if(message)
   {
    const objectMessages = JSON.stringify(listMessages);
    const bodyMessage = {
      id_relacion_entrenador_usuario: idRelation,
      idUsuario: userInformation.idUsuario,
      idEntrenador: trainerInformation.id,
      mensajes_string: objectMessages,
      lengthMessages: listMessages.lengthOldMessages
    }

    axios({
      method: 'put',
      url: `${serverUrl}/userscreens/usersendmessage`,
      data: bodyMessage
    })
    .then(function (response) {
      console.log('quiero',response.data.resp);
      loadMessages();
      //setMessagesLoaded(false);
    })
    .catch(function (error) {
        console.log('error axios',error);
    });
   }
  }


  const buttonSendMessage = () => {

    const lengthOldListMessages = listMessages.messages.length;
    
    if(message)
    {
      addNewMessage(message, lengthOldListMessages);
    }
    
  }



  const hideKeyBoard = () => {   // hides the keyboard when the user touches out of it
    Keyboard.dismiss();
  }



  return (
    <>
      <TouchableWithoutFeedback onPress={hideKeyBoard}>
        <View style={styles.containerListTrainers}>
          <TopBar navigation={navigation} title={userInformation.email_usuario} returnButton={true} />
              {
                !listMessages.messages.length === 0  ?
                (
                  <Text>there is no messages {`${listMessages}`}</Text>
                ):
                (
                  <View style={styles.containerScrollView}>
                    <FlatList
                      data={listMessages.messages}
                      renderItem= { (message) => 
                        {
                          return (() => {
                            //console.log('message1', message.item);
                            //console.log('messag2',message.item.email_usuario);
                            //console.log('message3',userInformation.email);
                            if(message.item.email_usuario == trainerInformation.email)
                            {
                              //console.log('if');
                              return(
                                <View style={styles.containerMessageUser}>
                                  <View style={styles.message}>
                                    <Text style={styles.textMessage}>{message.item.message}</Text>  
                                  </View>
                                </View>
                              );
                            }
                            else{
                              return(
                                <View style={styles.containerMessageTrainer}>
                                  <View style={styles.message}>
                                    <Text style={styles.textMessage}>{message.item.message}</Text>  
                                  </View>
                                </View>
                              );
                            }
                          })()
                        }
                       }
                      keyExtractor= { (item, key) => key}
                    />
                  </View>
                )
              }

            <TextInput style={styles.inputRegister}
                placeholder="Mensaje"
                multiline={true}
                onChangeText={ (text) => saveInputMessage(text) }
                value={message}
              />
            <TouchableOpacity style={styles.buttonSubscribe} onPress={ buttonSendMessage}>
              <Text style={styles.textButoonSubscribe}>Enviar mensaje</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSubscribe} onPress={changeState}>
              <Text style={styles.textButoonSubscribe}>Change state</Text>
            </TouchableOpacity>
          <BottomBar navigation={navigation}/>
        </View>
      </TouchableWithoutFeedback>
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
    alignItems: 'center',
  },

  // scrollView
  containerScrollView:{
    flex: 1,
    backgroundColor: Colors.LightBlue,
    width: '90%',
    paddingHorizontal:10,
    paddingVertical: 10,
    marginVertical: 12,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },

  //message
  containerMessageUser:{
    backgroundColor: Colors.LightBlue,
    marginBottom: 10,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  containerMessageTrainer:{
    backgroundColor: Colors.LightBlue,
    marginBottom: 10,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  message: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    maxWidth: '80%',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },  
  textMessage:{
    fontSize: 15
  },

  //input
  inputRegister:{
    backgroundColor: '#fff',
    width: '85%',
    fontSize: 18,
    height: 60,
    marginLeft: 5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },



     // button subscribe

    buttonSubscribe:{
      backgroundColor: Colors.Orange,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      paddingVertical: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '60%',
      marginVertical: 15
    },
    textButoonSubscribe:{
      color: '#fff',
      fontSize: 18,
      fontWeight: '700'
    },
});

export default MessageTrainer;