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

import { saveSubRoutine } from '../../../store/actions/actionsReducer';


import { urlServer } from '../../../services/urlServer';

import * as Keychain from 'react-native-keychain';
//import { Colors } from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();


export default function SubCategories() {


  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarUser {...props} />}>
        <Drawer.Screen name="SubCategories" component={SubCategoriesScreen}/>
      </Drawer.Navigator>
    </>
  );
}



const SubCategoriesScreen = ({navigation, route}) => {


  //const trainerInformation = route.params.trainer;

  const serverUrl = urlServer.url;

  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  //const [userInformation, setUserInformation] = useState({});
  //const [userInformationLoaded, setUserInformationLoaded] = useState(false);
  //const [messagesLoaded, setMessagesLoaded] = useState(false);

  const [state, setState] = useState(false);

  const subCategorie = useSelector(state => state.subCategorie);
  const user = useSelector(state => state.user)




  const changeToSubRoutine = (categorie) => {

    console.log('user', user);
    if(user)
    {
      dispatch(saveSubRoutine(categorie));
      navigation.navigate('SubRoutines');
    }else{
      dispatch(saveSubRoutine(categorie));
      navigation.navigate('T_SubRoutines');
    }
  }


 

  return (
    <>
      <TopBar navigation={navigation} title={subCategorie.name} returnButton={true} />
      <View style={styles.containerScrollView}>
        <FlatList
          data={subCategorie.categories}
          renderItem= { (routine) =>               
              (
                <View style={styles.containerTouchableImage}>
                  <TouchableOpacity style={styles.touchableContainerImage}
                   onPress={() => changeToSubRoutine(routine.item)} >
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

