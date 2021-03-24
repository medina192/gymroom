import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import Svg, { Path } from 'react-native-svg';

const CoachOptions = () => {

  const hideKeyBoard = () => {
    Keyboard.dismiss();
  }

  return (
    <>
    <TouchableWithoutFeedback onPress={hideKeyBoard}>
      <View style={styles.containerInputs} >
        <Text style={styles.textTrayectory}>Agrega una descripción sobre ti y tu trayectoria</Text>
        <TextInput style={styles.inputRegister}
          placeholder="Descripción"
          multiline={true}
        />
        <Text style={styles.textTrayectory}>En caso de que exista, agrega tu cédula profesional</Text>
          <TextInput style={styles.inputRegister}
            placeholder="Cédula profesional"
          />
      </View>
    </TouchableWithoutFeedback>
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
 },
  inputRegister:{
    backgroundColor: '#4b4b4b',
    width: '80%',
    marginVertical: 5,
    fontSize: 18,
    borderColor: '#FB5012',
    borderBottomWidth: 2,
    marginBottom: 10
  },
  textTrayectory:{
    fontSize: 14,
    color: '#fff',
    marginTop: 20
  }
});

export default CoachOptions;