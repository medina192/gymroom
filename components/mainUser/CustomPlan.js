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
  ScrollView
} from 'react-native';

import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import TopBar from '../compartido/TopBar';


import { createDrawerNavigator } from '@react-navigation/drawer';

import SideBarUser from '../compartido/SideBarUser';

const Drawer = createDrawerNavigator();

export default function CustomPlan() {
  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarUser {...props} />}>
        <Drawer.Screen name="CustomPlan" component={CustomPlanScreen} />
      </Drawer.Navigator>
    </>
  );
}



const CustomPlanScreen = ({navigation}) => {

  /*
  useEffect(() => {
    
    getRoutines();
  }, []);

  const getRoutines = () => {

    axios({
      method: 'get',
      url: `${serverUrl}/relations/getroutines/${idRelation}`,
    })
    .then(function (response) {
        console.log('routine',response.data.resp);
        
        if(response.data.resp.length > 0)
        {
          const routinesString = response.data.resp;
          
          let r = JSON.parse(response.data.resp[0].rutinas);
          console.log('ey',r[0]);
          setRoutines(routinesString);
        }

    })
    .catch(function (error) {
        console.log('error get routines  axios',error);
    });
  }
*/
  return (
    <>
      <TopBar navigation={navigation} title={`Mi plan personalizado`} returnButton={true} />
      <ScrollView>
        <Text style={{fontSize: 30}}>Plan personalizado trabajando</Text>
      </ScrollView>
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
