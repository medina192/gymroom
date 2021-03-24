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

import { urlServer } from '../../services/urlServer';

const Drawer = createDrawerNavigator();

export default function ListTrainers() {
  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarUser {...props} />}>
        <Drawer.Screen name="ListTrainers" component={ListTrainersScreen} />
      </Drawer.Navigator>
    </>
  );
}


const ListTrainersScreen = ({navigation}) => {

  console.log('url', urlServer.url);

  const serverUrl = urlServer.url;

  const [trainersLoaded, setTrainersLoaded] = useState(false);
  const [listTrainers, setlistTrainers] = useState([]);

  console.log('hola');

  if(!trainersLoaded)
  {
    axios({
      method: 'get',
      url: `${serverUrl}/userscreens/getlistgeneraltrainers`,
    })
    .then(function (response) {
  

      setlistTrainers(response.data.resp);
      setTrainersLoaded(true);
    })
    .catch(function (error) {
        console.log('error axios',error);
    });
  }



  return (
    <>
      <View style={styles.containerListTrainers}>
        <TopBar navigation={navigation} title={`Lista de entrenadores`} returnButton={true} />
        
        <View style={{ flex:1}}>
            {(() => { 

            if(trainersLoaded)
            {
              return(
                <View>
                  <FlatList
                    data={listTrainers}
                    renderItem= { (trainer) => (
                      <TrainerCard trainer={trainer} navigation={navigation}/>
                    ) }
                    keyExtractor= {(trainer, key) => key}
                  />
                </View>
                  );
                }
                else{
                  return(
                    <Text>There is no trainers</Text>
                  );
                }
              } )()}
        </View>
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
