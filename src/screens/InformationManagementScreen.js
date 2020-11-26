import React from "react";
import { StyleSheet, Text, View } from "react-native";


function InformationManagementScreen() {

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default InformationManagementScreen;
