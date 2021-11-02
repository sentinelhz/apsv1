/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import * as Linking from 'expo-linking';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
const Stack = createNativeStackNavigator();

const App = () => {
  // useEffect(() => {
  //   if(auth().currentUser){
  //     console.log('User Changed !!')
  //   }
  // }, [auth().currentUser])
const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "Home",
        Login: "Login",
        Registration: "Registration",
        VerifyAccount: "VerifyAccount",
        MobileVerified: "MobileVerified",
        ForgetPassword: "ForgetPassword",
        Identification: "Identification",
        CreditFrontPhoto: "CreditFrontPhoto",
        CreditBackPhoto: "CreditBackPhoto",
        CreditId: "CreditId",
        DriverFrontPhoto: "DriverFrontPhoto",
        DriverBackPhoto: "DriverBackPhoto",
        DriverId: "DriverId",
        InsuranceFrontPhoto: "InsuranceFrontPhoto",
        InsuranceBackPhoto: "InsuranceBackPhoto",
        InsuranceId: "InsuranceId",
      }
    }
  }
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

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
      <NavigationContainer>
        <Stack.Navigator
          initialeRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          {
            // !user
            !user ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Registration" component={Registration} />
                {/* OTP */}
                <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
                <Stack.Screen
                  name="MobileVerified"
                  component={MobileVerified}
                />
                {/* Forget Password */}
                <Stack.Screen
                  name="ForgetPassword"
                  component={ForgetPassword}
                />
              </>
            ) : (
              <>
                {/* <Stack.Screen name="CreditIdentification" component={CreditIdentification} /> */}
                {/* Touch & Face ID */}
                {/* <Stack.Screen name="TouchIDAuth" component={TouchIDAuth} />
                <Stack.Screen name="FaceIDAuth" component={FaceIDAuth} />
                <Stack.Screen name="TouchIDSuccess" component={TouchIDSuccess} />
                <Stack.Screen name="FaceIDSuccess" component={FaceIDSuccess} /> */}
                {/* Touch & Face ID */}
                <Stack.Screen
                  name="Identification"
                  component={Identification}
                />
                {/* Credit */}
                <Stack.Screen
                  name="CreditFrontPhoto"
                  component={CreditFrontPhoto}
                />
                <Stack.Screen
                  name="CreditBackPhoto"
                  component={CreditBackPhoto}
                />
                <Stack.Screen name="CreditId" component={CreditId} />
                {/* <Stack.Screen name="CreditIdentification" component={CreditIdentification} /> */}
                {/* Driver */}
                <Stack.Screen
                  name="DriverFrontPhoto"
                  component={DriverFrontPhoto}
                />
                <Stack.Screen
                  name="DriverBackPhoto"
                  component={DriverBackPhoto}
                />
                <Stack.Screen name="DriverId" component={DriverId} />
                {/* <Stack.Screen name="DriverIdentification" component={DriverIdentification} /> */}
                {/* Insurance */}
                <Stack.Screen
                  name="InsuranceFrontPhoto"
                  component={InsuranceFrontPhoto}
                />
                <Stack.Screen
                  name="InsuranceBackPhoto"
                  component={InsuranceBackPhoto}
                />
                <Stack.Screen name="InsuranceId" component={InsuranceId} />
                {/* <Stack.Screen name="InsuranceIdentification" component={InsuranceIdentification} /> */}
                {/* Test */}
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
