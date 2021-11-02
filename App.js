/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import * as Linking from 'expo-linking';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './redux/createStore';
import {
  Home,
  Login,
  Registration,
  VerifyAccount,
  MobileVerified,
  // TouchIDAuth,
  // FaceIDAuth,
  // TouchIDSuccess,
  // FaceIDSuccess,
  Identification,
  CreditFrontPhoto,
  CreditBackPhoto,
  DriverFrontPhoto,
  DriverBackPhoto,
  InsuranceFrontPhoto,
  InsuranceBackPhoto,
  ForgetPassword,
  CreditIdentification,
  DriverIdentification,
  InsuranceIdentification,
  // Test
  CreditId,
  DriverId,
  InsuranceId,
} from './screens';
import {auth} from './firebase/utils.js';
const prefix = Linking.makeUrl('/');
const Stack = createStackNavigator();

const App = () => {
  // useEffect(() => {
  //   if(auth().currentUser){
  //     console.log('User Changed !!')
  //   }
  // }, [auth().currentUser
  const [data, setData] = useState(null);

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url)
    setData(data)
  }
  useEffect(() => {
      Linking.addEventListener("url",handleDeepLink);
      return () => {
        Linking.removeEventListener("url")
      }
  },[])
const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "home",
        //Login: "Login",
        //Registration: "Registration",
        //VerifyAccount: "VerifyAccount",
        //MobileVerified: "MobileVerified",
        //ForgetPassword: "ForgetPassword",
        //Identification: "Identification",
        //CreditFrontPhoto: "CreditFrontPhoto",
        //CreditBackPhoto: "CreditBackPhoto",
        //CreditId: "CreditId",
        //DriverFrontPhoto: "DriverFrontPhoto",
        //DriverBackPhoto: "DriverBackPhoto",
        //DriverId: "DriverId",
        //InsuranceFrontPhoto: "InsuranceFrontPhoto",
        //InsuranceBackPhoto: "InsuranceBackPhoto",
        //InsuranceId: "InsuranceId",
      }
    }
  }
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
