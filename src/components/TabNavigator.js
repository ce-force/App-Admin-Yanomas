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
                    if (route.name === "UserManagementScreen") {
                        iconName = focused ? "account-multiple" : "account-multiple";
                    } else if (route.name === "MapManagementScreen") {
                        iconName = focused ? "map" : "map";
                    } else if (route.name === "CrimeReportScreen") {
                        iconName = focused ? "fire" : "fire";
                    } else if (route.name === "InformationManagementScreen") {
                        iconName = focused ? "information-variant" : "information-variant";
                    } else if (route.name === "SettingsScreen") {
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
            <Tab.Screen name="UserManagementScreen" component={UserManagementScreen} />
            <Tab.Screen name="MapManagementScreen" component={MapManagementScreen} />
            <Tab.Screen name="CrimeReportScreen" component={CrimeReportScreen} />
            <Tab.Screen name="InformationManagementScreen" component={InformationScreen} />
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
