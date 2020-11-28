import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Title = (props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    margin: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
  },
});

export default Title;
