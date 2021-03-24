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
import { saveUser } from '../../store/actions/actionsReducer';

import Colors from '../../colors/colors';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as Keychain from 'react-native-keychain';

const SaveSessionQuestion = ({navigation, route}) => {

    const dispatch = useDispatch();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState);
    };

    const generateSecureStorage = async(user, rol) => {
        const userString = JSON.stringify(user);
        const username = userString;
        const password = rol;
      
        try {
              // Store the credentials
          await Keychain.setGenericPassword(username, password);
    
          if(isEnabled){
              if(route.params.role === 'MainUserScreen'){
                const data = {
                    nombres: route.params.user.nombres,
                }
                useDispatch(saveUser(route.params.user));
                navigation.navigate('MainUserScreen',data);
              }
              else{
                const data = {
                    nombres: route.params.user.nombres,
                }
                useDispatch(saveUser(route.params.user));
                navigation.navigate('MainTrainerScreen', data);
              }
            }
    
        } catch (error) {
          console.log("Keychain couldn't be accessed!", error);
        }
      }



    const goToTheNextScreen = async() => {
        
        if(isEnabled)
        {
            if(route.params.role === 'MainUserScreen')
            {
              console.log('user');
              generateSecureStorage(route.params.user, '1');
              //navigation.navigate('MainUserScreen');
            }
            else{
              console.log('trainer');
              generateSecureStorage(route.params.user, '2');
              //navigation.navigate('MainTrainerScreen');
            }
        }
        else{
            navigation.navigate(route.params.role);
        }
    }

    return(
        <>
            <View style={styles.container}>
                <View style={styles.containerRememberPassword}>
                <Text style={styles.textRememberPassword}>¿Desea Mantener la sesión iniciada?</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? Colors.MainBlue : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                </View>
                <TouchableHighlight style={styles.buttonNext} onPress={goToTheNextScreen}>
                    <Text style={styles.buttonNextText}>Siguiente</Text>
                </TouchableHighlight>
            </View>
        </>
    );
} 

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerRememberPassword:{
        marginVertical: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      textRememberPassword:{
        fontSize: 20,
        color: Colors.MainBlue,
        marginBottom: 15
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

export default SaveSessionQuestion;