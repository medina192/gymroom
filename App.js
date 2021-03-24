/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DrawerN } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { DrawerNavigator } from "react-navigation";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';

import { Provider as PaperProvider } from 'react-native-paper';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import { mainReducer } from './store/reducers/mainReducer';

// components auth
import Login from './components/login/Login';
import Registro from './components/registro/Registro';

//main components
import MainUserScreen from './components/mainUser/MainUserScreen';
import MainTrainerScreen from './components/mainTrainer/MainTrainerScreen';

//  Components user
import Routines from './components/mainUser/Routines';
import ListTrainers from './components/mainUser/ListTrainers';
import CustomPlan from './components/mainUser/CustomPlan';
import Statistics from './components/mainUser/Statistics';
import Proof from './components/nestingProof/HomeScreen';
import SaveSessionQuestion from './components/compartido/SaveSessionQuestion';

import Colors from './colors/colors';

import * as Keychain from 'react-native-keychain';
import MessageUser from './components/mainUser/MessageUser';

const Stack = createStackNavigator();

const store = createStore(mainReducer);

const App = () => {

  let initialRoute = 'Login';

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen 
              name="Registro"
              component={Registro}
              options={{
                title: 'Registro',
                headerStyle:{
                  backgroundColor: Colors.MainBlue
                },
                headerTintColor: '#fff',
                headerTitleStyle:{
                  fontWeight: 'bold'
                },
                headerTitleAlign: 'center' 
              }}
            />
            <Stack.Screen 
              name="Login"
              component={Login}
              options={{
                title: 'Inicio de sesión',
                headerStyle:{
                  backgroundColor: Colors.MainBlue
                },
                headerTintColor: '#fff',
                headerTitleStyle:{
                  fontWeight: 'bold'
                },
                headerTitleAlign: 'center' 
              }}
            />
            <Stack.Screen 
              name="MainUserScreen"
              component={MainUserScreen}
              options={{
                header: () => null
              }}
            />

                <Stack.Screen 
                  name="Routines"
                  component={Routines}
                  options={{
                    header: () => null
                  }}
                />
                <Stack.Screen 
                  name="ListTrainers"
                  component={ListTrainers}
                  options={{
                    header: () => null
                  }}
                />
                <Stack.Screen 
                  name="CustomPlan"
                  component={CustomPlan}
                  options={{
                    header: () => null
                  }}
                />
                <Stack.Screen 
                  name="Statistics"
                  component={Statistics}
                  options={{
                    header: () => null
                  }}
                />

            <Stack.Screen 
              name="MainTrainerScreen"
              component={MainTrainerScreen}
              options={{
                header: () => null
              }}
            />

            <Stack.Screen 
              name="SaveSessionQuestion"
              component={SaveSessionQuestion}
              options={{
                header: () => null
              }}
            />

            <Stack.Screen 
              name="MessageUser"
              component={MessageUser}
              options={{
                header: () => null
              }}
            />

            <Stack.Screen 
              name="Proof"
              component={Proof}
              options={{
                header: () => null
              }}
            />


          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  topBar:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#459123',
  },
  titleTopBar:{
    fontSize: 20,
    fontWeight: '700',
    color: '#fff'
  }
});

export default App;
