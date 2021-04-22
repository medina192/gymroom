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
import MainUserGeneralScreen from './components/mainUser/mainUserGeneral/MainUserGeneralScreen';

//  Components user
import Routines from './components/mainUser/Routines';
import ListTrainers from './components/mainUser/ListTrainers';
import CustomPlan from './components/mainUser/CustomPlan';
import Statistics from './components/mainUser/Statistics';
import Proof from './components/nestingProof/HomeScreen';
import SaveSessionQuestion from './components/compartido/SaveSessionQuestion';
import TrainerProfile from './components/mainUser/listTrainersComponents/TrainerProfile';

import Colors from './colors/colors';

import * as Keychain from 'react-native-keychain';
import MessageUser from './components/mainUser/MessageUser';
import AskScreen from './components/login/AskScreen';
import ListMyTrainers from './components/mainUser/listTrainersComponents/ListMyTrainers';
import MessageTrainer from './components/mainTrainer/MessageTrainer';
import ListUsers from './components/mainTrainer/ListUsers';
import SubCategories from './components/mainUser/routines/SubCategories';
import SubRoutines from './components/mainUser/routines/SubRoutines';
import CurrentRoutine from './components/mainUser/routines/CurrentRoutine';
import UserProfile from './components/mainTrainer/UserProfile';
import T_SubRoutines from './components/mainTrainer/routines/T_SubRoutines';
import ChooseRole from './components/compartido/ChooseRole';
import DisplayRoutine from './components/mainUser/routines/DisplayRoutine';
import Stream1 from './components/streaming/Stream1';
import Live from './components/streaming/Live';
import Home from './components/streaming/Home';
import CreateRoutines from './components/mainTrainer/routines/CreateRoutines';

const Stack = createStackNavigator();

const store = createStore(mainReducer);

const App = () => {

  let initialRoute = 'AskScreen';

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen 
              name="Stream1"
              component={Stream1}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="Home"
              component={Home}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="Live"
              component={Live}
              options={{
                header: () => null
              }}
            />
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
              name="MainUserGeneralScreen"
              component={MainUserGeneralScreen}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="TrainerProfile"
              component={TrainerProfile}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="AskScreen"
              component={AskScreen}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="ChooseRole"
              component={ChooseRole}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="ListUsers"
              component={ListUsers}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="UserProfile"
              component={UserProfile}
              options={{
                header: () => null
              }}
            />

            <Stack.Screen 
              name="SubCategories"
              component={SubCategories}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="SubRoutines"
              component={SubRoutines}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="T_SubRoutines"
              component={T_SubRoutines}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="CreateRoutines"
              component={CreateRoutines}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="DisplayRoutine"
              component={DisplayRoutine}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen 
              name="CurrentRoutine"
              component={CurrentRoutine}
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
              name="ListMyTrainers"
              component={ListMyTrainers}
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
              name="MessageTrainer"
              component={MessageTrainer}
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
