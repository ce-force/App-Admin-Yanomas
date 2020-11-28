import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Card = (props) => <View style={styles.container}>{props.children}</View>;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    margin: 8,
    elevation: 1,
    padding: 8,
  },
});

export default Card;