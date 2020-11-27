import { Button } from "galio-framework";
import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import currentTheme from "../constants/Theme";
import InputArea from "../components/InputArea";
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

function CrimeReportScreen() {
    let [category, setCategory] = useState("");
    let [description, setDescription] = useState("");

    let [zone, setZone] = useState("");
    let [time, setTime] = useState("");


    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pdf Content</title>
          <style>
              body {
                  font-size: 16px;
                  color: rgb(255, 196, 0);
              }

              h1 {
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <h1>Hello, UppLabs!</h1>
      </body>
      </html>
  `;
    const createPDF = async (html) => {
      try {
          const { uri } = await Print.printToFileAsync({ html });
          return uri;
      } catch (err) {
          console.error(err);
      }
    };


    const CRIMES = [
        {
          label: "Actividad sospechosa",
          value: "Actividad sospechosa",
        },
        {
          label: "Violación",
          value: "Violación",
        },
        {
          label: "Asalto",
          value: "Asalto",
        },
        {
          label: "Acoso",
          value: "Acoso",
        },
      ];
      

    return (
        <View style={styles.container}>
            <View style={styles.containerSearchBar}>
            <TextInput
                style={styles.textInputStyle}
                //onChangeText={(text) => searchFilterFunction(text)}
                //value={search}
                underlineColorAndroid="transparent"
                placeholder="Lugares"
                onChangeText={(text) => setZone({zone:text})}
                />

            
            <TextInput
                style={styles.textInputStyle}
                //onChangeText={(text) => searchFilterFunction(text)}
                //value={search}
                underlineColorAndroid="transparent"
                placeholder="Rango de Fecha"
                onChangeText={(text) => setTime({time:text})}
                />
                <Button style={styles.downloadPdf} onPress={() => alert(zone)}>Descargar Reporte</Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    containerSearchBar: {
        flex: 1,
        backgroundColor: "white",
        top:35
    },
    textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },
      downloadPdf: {
        width: 439,
        margin: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: currentTheme.COLORS.DEFAULT
      }
});

export default CrimeReportScreen;
