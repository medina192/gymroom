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

import TopBar from '../../compartido/TopBar';

import { createDrawerNavigator } from '@react-navigation/drawer';

import SideBarUser from '../../compartido/SideBarUser';
import BottomBar from '../../compartido/BottomBar';

import Colors  from '../../../colors/colors';

import { saveCurrentRoutine } from '../../../store/actions/actionsReducer';


import { urlServer } from '../../../services/urlServer';

import * as Keychain from 'react-native-keychain';
//import { Colors } from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();


export default function CurrentRoutine() {


  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarUser {...props} />}>
        <Drawer.Screen name="CurrentRoutine" component={CurrentRoutineScreen }/>
      </Drawer.Navigator>
    </>
  );
}



const CurrentRoutineScreen = ({navigation}) => {


  //const trainerInformation = route.params.trainer;

  const serverUrl = urlServer.url;


  const userInformation = useSelector(state => state.user);
  const trainerInformation = useSelector(state => state.trainer);


  const currentExercise = useSelector(state => state.currentExercise);

  const [time, setTime] = useState(0.00);
  const [pause, setPause] = useState(true);

 
  const playCronometer = () => {
    setPause(false);
    setTime(time + 0.01);
  }

  const pauseCronometer = () => {
    setPause(true);
  }
 


  useEffect(() => {
    setTimeout(() => {

      if(pause)
      {
        console.log(pause);
      }
      else{
        let auxTime = time;
        auxTime = time + 0.01;
        setTime(auxTime);
        console.log(time);
      }


    }, 1000);

  }, [time])

  
  return (
    <>
      <TopBar navigation={navigation} title={currentExercise.name} returnButton={true} />
        <View style={styles.mainContainer}>
            <View style={styles.container}>

              {
                (
                  () => {

                    const integer = Math.trunc(time);
                    

                    const t = time.toString();
                    console.log('ti', t);
                    if(t === '0')
                    {
                      console.log('if');
                      return(
                        <Text style={styles.textCronometer}>0:00</Text>
                      )
                    }
                    else{
                      console.log('else');
                      const decimal = t.split(".")[1];
                      const decimalPart = decimal[0]+decimal[1];
                      return(
                        <Text style={styles.textCronometer}>{integer}:{decimalPart}</Text>
                      )
                    }
                    //const decimal = t.split(".")[1];
                    //const decimalPart = decimal[0]+decimal[1];
                    /*
                    return(
                      <Text style={styles.textCronometer}>{integer}:{decimalPart}</Text>
                    )
                    */
                  }
                )()
              }

              <View style={styles.containerPlayButtons}>
              {
                pause ? 
                (
                  <TouchableOpacity onPress={playCronometer}>
                    <Icon name="play" size={24} style={styles.iconImage} color="#fff" />
                  </TouchableOpacity>

                )
                :
                (
                  <TouchableOpacity onPress={pauseCronometer}>
                    <Icon name="pause" size={24} style={styles.iconImage} color="#fff" />
                  </TouchableOpacity>
                )
              }
              </View>
            </View>
        </View>
      <BottomBar navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10
      },
    container:{
      backgroundColor: '#000',
      paddingVertical: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    textCronometer:{
      color: '#fff',
      fontSize: 26,
      fontWeight: '700',
      textAlign: 'center'
    },
    containerPlayButtons:{
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },  
});
