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
import { UserContext, UserProvider } from "./src/communication/UserContext";


import * as firebase from "firebase";
import { firebaseConfig } from "./src/config/FirebaseConfig";
import TabNavigator from "./src/components/TabNavigator";
import Login from "./src/screens/auth/LoginScreen";

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {

  const [loggedIn, setLoggedIn] = React.useState({
    isLoggedIn: false,
  });

  return (
    <UserProvider>
    <NavigationContainer>
        {/*<Stack.Screen
            mode="card"
            initialRouteName="TabNavigator"
            screenOptions={{ headerShown: false }}
        >*/}
        <Stack.Navigator
          mode="card"
          initialRouteName="LoginScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
      </UserProvider>

  );
};

export default App;
