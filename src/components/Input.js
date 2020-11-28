import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

export default function Input(props) {
  return <TextInput {...props} style={styles.input}></TextInput>;
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 12,
    margin: 8,
  },
});