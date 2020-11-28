import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Theme from "../constants/Theme";
import InformationScreen from "../screens/InformationManagementScreen";
import MapManagementScreen from "../screens/MapManagementScreen";
import UserManagementScreen from "../screens/UserManagementScreen";
import CrimeReportScreen from "../screens/CrimeReportScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

Tab.tabBarOptions = {
    activeTintColor: Theme.COLORS.DEFAULT,
    inactiveTintColor: Theme.COLORS.GRAY,
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName = "account-multiple";
                    if (route.name === "Usuarios") {
                        iconName = focused ? "account-multiple" : "account-multiple";
                    } else if (route.name === "Alertas") {
                        iconName = focused ? "map" : "map";
                    } else if (route.name === "Reportes") {
                        iconName = focused ? "fire" : "fire";
                    } else if (route.name === "Información") {
                        iconName = focused ? "information-variant" : "information-variant";
                    } else if (route.name === "Configuración") {
                        iconName = focused ? "settings" : "settings";
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: Theme.COLORS.DEFAULT,
                inactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name="Usuarios" component={UserManagementScreen} />
            <Tab.Screen name="Alertas" component={MapManagementScreen} />
            <Tab.Screen name="Reportes" component={CrimeReportScreen} />
            <Tab.Screen name="Información" component={InformationScreen} />
            <Tab.Screen name="Configuración" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
