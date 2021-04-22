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

import CheckBox from '@react-native-community/checkbox';

import Colors  from '../../../colors/colors';

import { saveCurrentRoutine } from '../../../store/actions/actionsReducer';


import { urlServer } from '../../../services/urlServer';

import * as Keychain from 'react-native-keychain';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import Picker from '@gregfrench/react-native-wheel-picker'
var PickerItem = Picker.Item;




const Drawer = createDrawerNavigator();


export default function SubRoutines() {


  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <SideBarUser {...props} />}>
        <Drawer.Screen name="SubRoutines" component={SubRoutinesScreen}/>
      </Drawer.Navigator>
    </>
  );
}



const SubRoutinesScreen = ({navigation}) => {

  const [selectedItem, setSelectedItem ] = useState(3);
  const [itemList , setItemList ] = useState(['Apple', 'Orange', 'Peach', 'Strawberries', 'Pineapple']);



  //const trainerInformation = route.params.trainer;

  const serverUrl = urlServer.url;

  const dispatch = useDispatch();


  const [routineName, setRoutineName] = useState('');
  const subRoutine = useSelector(state => state.subRoutine);
  const userInformation = useSelector(state => state.user);
  const trainerInformation = useSelector(state => state.trainer);


  
  const [state, setState] = useState(false);
  const [routines, setRoutines] = useState(subRoutine.routines);
  const [visible, setVisible] = useState(false);
  const [visibleRoutines, setVisibleRoutines] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  const [inputValues, setInputValues] = useState();


  const clearCheckBoxes = () => {

    for(let i = 0; i < routines.length; i++)
    {
      routines[i].selected = false;
    }
  }

  useEffect(() => {
    clearCheckBoxes();
    return () => {
      clearCheckBoxes();
    }
  }, []);

  

  // begin  dialog error empty fields alert _________________________

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  // end  dialog error empty fields alert _________________________


  
  // begin  dialog error empty fields alert _________________________

  const showDialogName = () => setNameExists(true);

  const hideDialogName = () => setNameExists(false);

  // end  dialog error empty fields alert _________________________


    // begin  dialog error name routine alert _________________________

    const showDialogRoutine = () => setVisibleRoutines(true);

    const hideDialogRoutine = () => setVisibleRoutines(false);
  
    // end  dialog error name routine alert _________________________


    // begin  dialog error time alert _________________________

    const showDialogTime = () => setVisibleTime(true);

    const hideDialogTime = () => setVisibleTime(false);
  
    // end  dialog error time alert _________________________



 

  const changeCheckbox = (item,index) => {
    
    routines[index].selected = !item;
    setRoutines(routines);
    setState(!state);
  }

  const changeToRoutine = (routine) => {
    dispatch(saveCurrentRoutine(routine));
    navigation.navigate('CurrentRoutine');
  }



  
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
        
        let auxRoutinesRepetitions = true;
        let auxTimeRoutines = true;
        for(let i = 0; i < routinesSelected.length; i++)
        {
          if(routinesSelected[i].repetitions == '0' || routinesSelected[i].repetitions == '' )
          {
            auxRoutinesRepetitions = false;
            break;
          }

          if((routinesSelected[i].time_minutes == '0' && routinesSelected[i].time_seconds == '0')
           || routinesSelected[i].time_minutes == '' || routinesSelected[i].time_seconds == '')
          {
            auxTimeRoutines = false;
            break;
          }
        }


        if(auxRoutinesRepetitions)
        {

          if(auxTimeRoutines)
          {
           
            const routinesString = JSON.stringify(routinesSelected);
            console.log('o', userInformation);
            const auxObject = {
              ejercicios: routinesString,
              idUsuario: userInformation.idusuario,
              tipo: subRoutine.name,
              nombre: routineName
            };                  
            axios({
              method: 'post',
              url: `${serverUrl}/relations/saveroutinebytrainer`,
              data: auxObject
            })
            .then(function (response) {
                console.log('routine',response.data.resp);
                clearCheckBoxes();
                navigation.navigate('MainUserScreen');
            })
            .catch(function (error) {
                console.log('error axios',error);
            });
            
          }
          else{
            showDialogTime();
          }
        }
        else{
          showDialogRoutine();
        }
      }
      else{
        showDialogName();
      }
     
    }
    else{
      console.log('there is no routines');
      showDialog();
    }    
  }
  



  const setValuesInputs = (text, index, type) => {

    switch (type) {
      case 'routines':
        routines[index].repetitions = text; 
        setRoutines(routines);
        setState(!state);
        break;
      case 'minutes':
        routines[index].time_minutes = text; 
        setRoutines(routines);
        setState(!state);
        break;
      case 'seconds':
        routines[index].time_seconds = text; 
        setRoutines(routines);
        setState(!state);
        break;
    
      default:
        break;
    }
  }

console.log('sub', subRoutine.routines);
  return (
    <>
      <TopBar navigation={navigation} title={subRoutine.name} returnButton={true} />
      {
        /*
                <Picker style={{width: 150, height: 180}}
          lineColor="#000000"
          lineGradientColorFrom="#008000" 
          lineGradientColorTo="#FF5733" 
          selectedValue={selectedItem}
          itemStyle={{color:"#000", fontSize:26}}
          onValueChange={(index) => setSelectedItem(index) }>
          {itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={i} />
          ))}
        </Picker>
        */
      }

        {
          /*
        <View style={styles.containerScrollView}>
        <FlatList
        data={subRoutine.routines}
        renderItem= { (routine) =>               
            (
                <View style={styles.containerTouchableImage}>
                    <TouchableOpacity style={styles.touchableContainerImage}
                    onPress={() => changeToRoutine(routine.item)} >
                        <Text style={styles.textImageButton}>{routine.item.name}</Text>
                    </TouchableOpacity>
                </View>
            )
            }
        keyExtractor= { (item, key) => key}
                    />
    </View>*/
        }

        <View style={styles.containerScrollView}>
          <ScrollView>
            <View style={styles.containerInput}>
              <View style={  styles.containerIconInput }>
                <TextInput style={styles.inputRegister}
                  placeholder="Nombre Rutina"
                  onChangeText={ (text) => setRoutineName(text) }
                />
              </View>
            </View>

            <View>

                {
                    subRoutine.routines.map((routine, index) => (
     
                        <View key={index}>
                        <View style={styles.containerTouchableImage}>
                          <TouchableOpacity style={styles.touchableContainerImage}
                            onPress={() => changeToRoutine(routine)} >
                              <Text style={styles.textImageButton}>{routine.name}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.containerCheckBox1}>
                            <CheckBox
                                disabled={false}
                                value={routine.selected}
                                onValueChange={() => changeCheckbox(routine.selected,index)}
                            />
                            {
                              routine.selected ?
                              (
                                <>
                                  <View style={styles.containerInputs}>
                                  <View style={styles.containerNumberRoutineInput}>
                                      <Text style={styles.textNumberRoutine}>Número de repeticiones</Text>
                                      <TextInput style={styles.inputNumberRoutine}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        onChangeText={ (text) => setValuesInputs(text, index, 'routines') }
                                      />
                                    </View>
                                    <View style={styles.containerInputTime}>
                                      <Text style={styles.textTime}>Minutos</Text>
                                      <TextInput style={styles.inputRegister}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        onChangeText={ (text) => setValuesInputs(text, index, 'minutes') }
                                      />
                                    </View>
                                    <View style={styles.containerInputTime}>
                                      <Text style={styles.textTime}>Segundos</Text>
                                      <TextInput style={styles.inputRegister}
                                        placeholder="0"
                                        keyboardType="numeric"
                                        onChangeText={ (text) => setValuesInputs(text, index, 'seconds') }
                                      />
                                    </View>
                                  </View>
                                </>
                              )
                              :
                              (
                                <>
                                <Text>hola</Text>
                                </>
                              )
                            }
                          </View>
                        </View>
                      
                    ))
                  }
            </View>
          </ScrollView>
        </View>

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

        <View>
            <Portal>
              <Dialog visible={visibleRoutines} onDismiss={hideDialogRoutine}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Debes asignar mínimo una repetición</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>                    
                  <Button onPress={hideDialogRoutine}>Cerrar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
        </View>

        <View>
            <Portal>
              <Dialog visible={visibleTime} onDismiss={hideDialogTime}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Una ejercicio no puede tener tiempo 0</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>                    
                  <Button onPress={hideDialogTime}>Cerrar</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
        </View>

        <View style={styles.containerSaveButton}>
            <TouchableOpacity style={styles.saveButton} onPress={saveRoutine}>
              <Text style={styles.textSaveButton}>Guardar Rutina</Text>
            </TouchableOpacity>
        </View>
      <BottomBar navigation={navigation}/>
    </>
  );
};


/*
                                    <View style={styles.containerNumberRoutineInput}>
                                      <Text style={styles.textNumberRoutine}>Número de repeticiones</Text>
                                      <TextInput style={styles.inputNumberRoutine}
                                        placeholder="0"
                                        defaultValue="0"
                                        keyboardType="numeric"
                                        onChangeText={ (text) => setValuesInputs(text, index, 'routines') }
                                      />
                                    </View>

                                    <View style={styles.containerInputTime}>
                                      <Text style={styles.textTime}>Minutos</Text>
                                      <TextInput style={styles.inputRegister}
                                        placeholder="0"
                                        defaultValue="0"
                                        keyboardType="numeric"
                                        onChangeText={ (text) => setValuesInputs(text, index, 'minutes') }
                                      />
                                    </View>
                                    <View style={styles.containerInputTime}>
                                      <Text style={styles.textTime}>Segundos</Text>
                                      <TextInput style={styles.inputRegister}
                                        placeholder="0"
                                        defaultValue="0"
                                        keyboardType="numeric"
                                        onChangeText={ (text) => setValuesInputs(text, index, 'seconds') }
                                      />
                                    </View>
*/

const styles = StyleSheet.create({
    containerScrollView:{
        flex: 1,
      },
      containerInput:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },

      //inputs
      containerInputs:{
        //paddingHorizontal: 25,
        //marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-around',
        //alignItems: 'flex-end',
      },
      containerNumberRoutineInput:{
        width: '30%'
      },
      containerInputTime:{
        width: '25%'
      },
      textNumberRoutine:{
        fontSize: 16
      },
      inputNumberRoutine:{
        backgroundColor: '#fff',
        fontSize: 15,
        width: '60%'
      },
      textTime:{
        fontSize: 16
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
        width: '90%',
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
