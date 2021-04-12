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
  const idRelation = useSelector(state => state.idRelation);
  const user = useSelector(state => state.T_user);


  const [checkboxValue, setCheckBoxValue] = useState(false);
  const [message, setMessage] = useState('');
  const [routineName, setRoutineName] = useState('');
  const [visible, setVisible] = useState(false);
  const [nameExists, setNameExists] = useState(false);

  const clearCheckBoxes = () => {

    for(let i = 0; i < routines.length; i++)
    {
      routines[i].selected = false;
    }
  }

  useEffect(() => {
    clearCheckBoxes();
  }, []);



  const [state, setState] = useState(false);
  const [routines, setRoutines] = useState(subRoutine.routines);

  //const userInformation = useSelector(state => state.user);
  //const trainerInformation = useSelector(state => state.trainer);


  const changeToRoutine = (routine) => {
 
  }

  const changeCheckbox = (item,index) => {
    

    routines[index].selected = !item;
    setRoutines(routines);
    setState(!state);
  }

    // begin  dialog error empty fields alert _________________________

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
  
    // end  dialog error empty fields alert _________________________
  
  
      // begin  dialog error name routine alert _________________________
  
      const showDialogName = () => setNameExists(true);
  
      const hideDialogName = () => setNameExists(false);
    
      // end  dialog error name routine alert _________________________

  const saveRoutine = () => {
    
    let verifyRoutinesExists = false;
    for(let i = 0; i< routines.length; i++)
    {
      if(routines[i].selected)
      {
        verifyRoutinesExists = true;
        break;
      }
    }

    if(verifyRoutinesExists)
    {
      if(routineName)
      {
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
          ejercicios: routinesString,
          id_relacion_entrenador_usuario: idRelation,
          idUsuario: user.idUsuario,
          tipo: subRoutine.name,
          nombre: routineName
        };
    
        axios({
          method: 'post',
          url: `${serverUrl}/relations/saveroutinebytrainer`,
          data: auxObject
        })
        .then(function (response) {
            
            clearCheckBoxes();
            navigation.navigate('ListUsers');
        })
        .catch(function (error) {
            console.log('error axios',error);
        });
      }
      else{
        showDialog();
      }
    }
    else{
      showDialogName();
    }
  }

  return (
    <>
      <TopBar navigation={navigation} title={'Seleccionar rutinas'} returnButton={true} />
        <View style={styles.containerScrollView}>
        <View style={styles.containerInput}>
              <View style={  styles.containerIconInput }>
                <TextInput style={styles.inputRegister}
                  placeholder="Nombre Rutina"
                  onChangeText={ (text) => setRoutineName(text) }
                />
              </View>
        </View>
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
                    <View>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>No hay rutinas seleccionadas</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>                    
                  <Button onPress={hideDialog}>Cerrar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
        </View>

        <View>
            <Portal>
              <Dialog visible={nameExists} onDismiss={hideDialogName}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Asigna un nombre a la rutina</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>                    
                  <Button onPress={hideDialogName}>Cerrar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
        </View>
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

      containerInput:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerIconInput:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        backgroundColor: '#fff',
        paddingVertical: 0,
        marginVertical: 10,
        //borderColor: '#FB5012',
        borderColor: Colors.MainBlue,
        borderBottomWidth: 2,
        paddingHorizontal: 0
      },
      inputRegister:{
        backgroundColor: '#fff',
        width: '97%',
        fontSize: 18,
        marginLeft: 5,
        //borderRightWidth: 1,
        //borderLeftWidth: 1,
        //borderTopWidth: 1,
        //borderBottomRightRadius: 3,
        //borderBottomLeftRadius: 3,
        //borderTopLeftRadius: 3,
        //borderTopRightRadius: 3
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
