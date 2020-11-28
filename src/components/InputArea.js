import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

import IconButton from "../components/IconButton";
import Card from "../components/Card";
import Input from "./Input";

const InputArea = (props) => {
  return (
    <Card>
      <Text>
        {props.location.latitude.toFixed(5)},
        {props.location.longitude.toFixed(5)}
      </Text>
      <Picker
        selectedValue={props.selected}
        onValueChange={props.handleChangeValue}
      >
        <Picker.Item label="Seleccione un delito" />
        {props.options.map((opt) => (
          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
        ))}
      </Picker>
      <Input
        value={props.description}
        onChangeText={props.handleChangeDescription}
        placeholder="Descripción (opcional)"
      ></Input>
      <IconButton clicked={props.finished}>
        <FontAwesome name="check" size={24} color="white" />
      </IconButton>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default InputArea;