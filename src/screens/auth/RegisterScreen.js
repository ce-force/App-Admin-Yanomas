import React from "react";
import { StyleSheet, Text, View } from "react-native";


function RegisterScreen() {

    return (
        <View style={styles.container}>
            <Text>Register Screen</Text>
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

export default RegisterScreen;
