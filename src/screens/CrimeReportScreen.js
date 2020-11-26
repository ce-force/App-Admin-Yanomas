import React from "react";
import { StyleSheet, Text, View } from "react-native";


function CrimeReportScreen() {

    return (
        <View style={styles.container}>
            <Text>Crime Report Screen</Text>
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

export default CrimeReportScreen;
