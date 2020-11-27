import React from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator
} from "@react-navigation/stack";

// Screens
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import InformationManagementScreen from "./src/screens/InformationManagementScreen";
import CrimeReportScreen from "./src/screens/CrimeReportScreen";
import MapManagementScreen from "./src/screens/MapManagementScreen";
import UserManagementScreen from "./src/screens/UserManagementScreen";
import AlertsList from './src/screens/utils/AlertsList';

import * as firebase from "firebase";
import { firebaseConfig } from "./src/config/FirebaseConfig";
import TabNavigator from "./src/components/TabNavigator";

const Stack = createStackNavigator();


const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
            mode="card"
            initialRouteName="TabNavigator"
            screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              screenOptions={{ headerShown: true }
              }
          />
          <Stack.Screen
              name="InformationManagementScreen"
              component={InformationManagementScreen}
              options={{ headerShown: true }}
          />
          <Stack.Screen
              name="CrimeReportScreen"
              component={CrimeReportScreen}
              options={{ headerShown: true }}
          />
          <Stack.Screen
              name="MapManagementScreen"
              component={MapManagementScreen}
              options={{ headerShown: true }}
          />
          <Stack.Screen
              name="UserManagementScreen"
              component={UserManagementScreen}
              options={{ headerShown: true, }}
          />
          <Stack.Screen
              name="AlertsList"
              component={AlertsList}
              options={{ headerShown: true, title: "Alertas de Usuarios" }}
          />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
