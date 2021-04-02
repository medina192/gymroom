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

import SideBarTrainer from '../../compartido/SideBarTrainer';
import BottomBar from '../../compartido/BottomBar';

import Colors  from '../../../colors/colors';

import { saveCurrentRoutine } from '../../../store/actions/actionsReducer';

import CheckBox from '@react-native-community/checkbox';

import { urlServer } from '../../../services/urlServer';

import * as Keychain from 'react-native-keychain';
//import { Colors } from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();


export default function T_SubRoutines() {


  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarTrainer {...props} />}>
        <Drawer.Screen name="T_SubRoutines" component={T_SubRoutinesScreen}/>
      </Drawer.Navigator>
    </>
  );
}



const T_SubRoutinesScreen = ({navigation}) => {


  //const trainerInformation = route.params.trainer;

  const serverUrl = urlServer.url;

  const dispatch = useDispatch();
  const subRoutine = useSelector(state => state.subRoutine);
  const trainer = useSelector(state => state.T_trainer);
  const user = useSelector(state => state.T_user);

  const [checkboxValue, setCheckBoxValue] = useState(false);
  const [message, setMessage] = useState('');
  //const [arrayP, setarrayP] = useState([{s: false},{s:false}])
  //const [userInformation, setUserInformation] = useState({});
  //const [userInformationLoaded, setUserInformationLoaded] = useState(false);
  //const [messagesLoaded, setMessagesLoaded] = useState(false);

  const [state, setState] = useState(false);
  const [routines, setRoutines] = useState(subRoutine.routines);

  const userInformation = useSelector(state => state.user);
  const trainerInformation = useSelector(state => state.trainer);


  const changeToRoutine = (routine) => {
 
  }

  const changeCheckbox = (item,index) => {
    

    routines[index].selected = !item;
    setRoutines(routines);
    setState(!state);
  }

  const saveRoutine = () => {
    console.log('save', routines);
    let routinesSelected = [];
    for(let i = 0; i< routines.length; i++)
    {
      if(routines[i].selected)
      {
        routinesSelected.push(routines[i]);
      }
    }
    
    const routinesString = JSON.stringify(routinesSelected);

    const auxObject = {
      rutinas: routinesString,
      email_usuario: user.email_usuario,
      email_entrenador: user.email_entrenador
    };

    axios({
      method: 'post',
      url: `${serverUrl}/relations/saveroutinebytrainer`,
      data: auxObject
    })
    .then(function (response) {
        console.log('routine',response);
    })
    .catch(function (error) {
        console.log('error axios',error);
    });
  }

  return (
    <>
      <TopBar navigation={navigation} title={'Seleccionar rutinas'} returnButton={true} />
        <View style={styles.containerScrollView}>

            <FlatList
            data={routines}
            renderItem= { ({item, index}) =>               
                ( 
                  
                  () => {
                    return(
                      <>
                        <View style={styles.containerTouchableImage}>
                            <TouchableOpacity style={styles.touchableContainerImage}
                            onPress={() => changeToRoutine(index)} >
                                <Text style={styles.textImageButton}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerCheckBox1}>
                            <CheckBox
                              disabled={false}
                              value={item.selected}
                              onValueChange={() => changeCheckbox(item.selected,index)}
                            />
                        </View>
                    </> 
                    )
                  }
                )()
                }
            keyExtractor= { (item, index) => index}
                        />
          <View style={styles.containerSaveButton}>
            <TouchableOpacity style={styles.saveButton} onPress={saveRoutine}>
              <Text style={styles.textSaveButton}>Guardar Rutina</Text>
            </TouchableOpacity>
          </View>
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
        width: '40%',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 25,
        marginBottom: 0
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
      containerCheckbox:{
        marginTop: 10,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#123456'
      },
      containerCheckBox1:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginBottom: 20,
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

      // save button
      containerSaveButton:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: '#00000000'
      },
      saveButton:{
        width: '70%',
        backgroundColor: Colors.Orange,
        paddingVertical: 10
      },
      textSaveButton:{
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center'
      }
});
