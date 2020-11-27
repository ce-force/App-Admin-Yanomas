import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";

import Card from "../components/Card";

const InfoArea = (props) => {
  const getDate = () => {
    const date = new Date(props.crime.hourDate);
    return date.toString();
  };

  return (
    <Card>
      {props.crime ? (
        <View>
          <Text>
            Localización: {props.crime.coords.latitude}
            {props.crime.coords.longitude}
          </Text>
          <Text>Categoría: {props.crime.category}</Text>
          <Text>Descripción: {props.crime.description}</Text>
          <Text>Fecha: {getDate()}</Text>
        </View>
      ) : (
        <Text>Seleccione una alerta para ver detalles</Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({});

export default InfoArea;
