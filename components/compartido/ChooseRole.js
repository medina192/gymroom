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
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Switch
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { saveUser, T_saveTrainer } from '../../store/actions/actionsReducer';

import Colors from '../../colors/colors';

import CheckBox from '@react-native-community/checkbox';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as Keychain from 'react-native-keychain';

import axios from 'axios';

import { urlServer } from '../../services/urlServer';

const ChooseRole = ({navigation, route}) => {

    const serverUrl = urlServer.url;
    const userInformation = route.params;
    const idusuario = userInformation.idusuario;
    const [checkboxValue, setCheckBoxValue] = useState(false);

    const dispatch = useDispatch();



    const [form, setform] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        password: '',
        confirmPassword: '',
        fecha_de_nacimiento: '',
        descripcion: '',
        cedula: '',
        tipo_de_cuenta: '',
        descripcion: '',
        cedula: ''
      });


      const registerUser = async (isTrainer) => {
        
        let bodyUser = {};

        if(isTrainer)
        {
           bodyUser = {
            nombres: userInformation.nombres,
            apellidos: userInformation.apellidos,
            email: userInformation.email,
            password: userInformation.password,
            fecha_de_nacimiento: userInformation.fecha_de_nacimiento,
            google: 0,
            facebook: 0,
            estado: 0,
            descripcion_entrenador: form.descripcion,
            cedula_entrenador: form.cedula,
            idusuario
          } 
          axios({
            method: 'post',
            url: `${serverUrl}/auth/registerafterrol`,
            data: bodyUser
          })
          .then(function (response) {
              console.log('good, user registered',response);
              dispatch(saveUser(bodyUser));
              navigation.navigate('SaveSessionQuestion', {role: 'MainTrainerScreen',rol: 2});
              //navigation.navigate('MainUserScreen');
              //dispatch(saveUser(bodyUser));
              //navigation.navigate('SaveSessionQuestion');
          })
          .catch(function (error) {
              //console.log('res', error.response.data.sqlMessage);
              if(error.response?.data.sqlMessage)
              {
                console.log('hi',error.response?.data.sqlMessage);
                console.log('email already exists');

              }
              else{
                 console.log('server error');
              }
          });
        }
        else{
            bodyUser = {
            nombres: userInformation.nombres,
            apellidos: userInformation.apellidos,
            email: userInformation.email,
            password: userInformation.password,
            fecha_de_nacimiento: userInformation.fecha_de_nacimiento,
            google: 0,
            facebook: 0,
            estado: 0,
            descripcion_entrenador: '',
            cedula_entrenador: '',
            idusuario
          } 
          axios({
            method: 'post',
            url: `${serverUrl}/auth/registerafterrol`,
            data: bodyUser
          })
          .then(function (response) {
              console.log('good, user registered',response);
              dispatch(T_saveTrainer(bodyUser));
              navigation.navigate('SaveSessionQuestion',{role: 'MainUserScreen',rol: 1});
              //navigation.navigate('SaveSessionQuestion');
          })
          .catch(function (error) {
              //console.log('res', error.response.data.sqlMessage);
              if(error.response?.data.sqlMessage)
              {
                console.log('hi',error.response?.data.sqlMessage);
                console.log('email already exists');

              }
              else{
                 console.log('server error');
              }
          });
        }

        

   

      }

      const saveInputsValues = (input, value) => {

        switch (input) {
          case 'descripcion':
            setform({
              ...form,
              descripcion: value
            });    
          break;
          case 'cedula':
            setform({
              ...form,
              cedula: value
            });    
          break;
        
          default:
            break;
        }
      }

      const saveRol = () => {
          
          if(!checkboxValue)
          {
            const bodyUser = {
                idusuario: userInformation.idusuario,
                idrol: 1
              } 
              axios({
                method: 'post',
                url: `${serverUrl}/auth/registerrol`,
                data: bodyUser
              })
              .then(function (response) {
                  console.log('good, user registered',response);
                  registerUser(false);
                  //bodyUser.idusuario = response.data.resp.insertId;
                  //navigation.navigate('ChooseRole',bodyUser);
                  //dispatch(saveUser(bodyUser));
                  //navigation.navigate('SaveSessionQuestion');
              })
              .catch(function (error) {
                  //console.log('res', error.response.data.sqlMessage);
                  if(error.response?.data.sqlMessage)
                  {
                    console.log('hi',error.response?.data.sqlMessage);
                    console.log('email already exists');

                  }
                  else{
                     console.log('server error');
                  }
              });
          }
          else{
            const bodyUser = {
              idusuario: userInformation.idusuario,
              idrol: 2
            } 
            axios({
              method: 'post',
              url: `${serverUrl}/auth/registerrol`,
              data: bodyUser
            })
            .then(function (response) {
                console.log('good, user registered',response);
                registerUser(true);
                //bodyUser.idusuario = response.data.resp.insertId;
                //navigation.navigate('ChooseRole',bodyUser);
                //dispatch(saveUser(bodyUser));
                //navigation.navigate('SaveSessionQuestion');
            })
            .catch(function (error) {
                //console.log('res', error.response.data.sqlMessage);
                if(error.response?.data.sqlMessage)
                {
                  console.log('hi',error.response?.data.sqlMessage);
                  console.log('email already exists');
                }
                else{
                   console.log('server error');
                }
            });
          }
      }

      const hideKeyBoard = () => {
        Keyboard.dismiss();
      }

    return(
        <>
            <TouchableWithoutFeedback onPress={hideKeyBoard}>
                    <View style={styles.container}>

                        <View style={styles.container}>
                        <Text style={styles.typeAccounText}>Selecciona tu tipo de cuenta</Text>

                        <View style={styles.containerCheckBox1}>
                            <CheckBox
                                disabled={false}
                                value={!checkboxValue}
                                onValueChange={() => setCheckBoxValue(!checkboxValue)}
                            />
                            <Text style={styles.textCheckbox}>Usuario</Text>
                        </View>
                        <View style={styles.containerCheckBox2}>
                            <CheckBox
                                disabled={false}
                                value={checkboxValue}
                                onValueChange={() => setCheckBoxValue(!checkboxValue)}
                            />
                            <Text style={styles.textCheckbox}>Entrenador</Text>
                        </View>


                        {

                        checkboxValue ? 
                        (
                        <TouchableWithoutFeedback onPress={hideKeyBoard}>
                        <View style={styles.containerInputs} >
                        <Text style={styles.textTrayectory}>* Agrega una descripción sobre ti y tu trayectoria</Text>
                        <View style={  styles.containerIconInput }>
                            <Icon name="folder-o" style={styles.iconInputClass} size={24} color="#fff" />
                            <TextInput style={styles.inputRegister}
                            placeholder="Descripcion"
                            multiline={true}
                            onChangeText={ (text) => saveInputsValues('descripcion',text) }
                            />
                        </View>
                        <View style={  styles.containerIconInput }>
                            <Icon name="id-card" style={styles.iconInputClass} size={24} color="#fff" />
                            <TextInput style={styles.inputRegister}
                            placeholder="Cedula"
                            onChangeText={ (text) => saveInputsValues('cedula',text) }
                            />
                        </View>
                        </View>
                        </TouchableWithoutFeedback>
                        )  : null

                        }

                        <TouchableHighlight style={styles.buttonNext} onPress={saveRol}>
                            <Text style={styles.buttonNextText}>Siguiente</Text>
                        </TouchableHighlight>
                        </View>

                        </View>
            </TouchableWithoutFeedback>

            
        </>
    );
} 

const styles = StyleSheet.create({
    scrollView:{
        flex: 1,
        width: '100%'
    },
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container1:{
        flex: 1,
        width: '100%',
        backgroundColor: '#0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // inputs
    inputRegister:{
        flex: 1,
        backgroundColor: '#fff',
        width: '75%',
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

      // checkboxes
      containerCheckBox1:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '85%',
        marginVertical: 5
      },
      containerCheckBox2:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '85%',
        marginBottom: 15,
      },
      textCheckbox:{
         color: Colors.MainBlue
      },

      // icons inputs
      containerIconInput:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#fff',
        paddingVertical: 0,
        marginVertical: 10,
        //borderColor: '#FB5012',
        borderColor: Colors.MainBlue,
        borderBottomWidth: 2,
      },

      iconInput:{
        fontSize: 30,
        backgroundColor: '#4b4b4b'
      },
      textTrayectory:{
        fontSize: 14,
        color: '#fff',
        marginTop: 20
      },
      iconInputClass:{
        //color: '#FB5012',
        color: Colors.MainBlue
      },

      buttonNext:{
        marginTop: 20, 
        width: '70%',
        paddingVertical: 10,
        backgroundColor: Colors.MainBlue,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonNextText:{
        fontSize: 20,
        fontWeight: '700',
        color: '#fff'
      }
});   

export default ChooseRole;