import React, {useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView,Image, TextInput,TouchableOpacity, FlatList, Keyboard} from "react-native";
import currentTeme from "../constants/Theme";
import { NavigationActions, StackActions } from 'react-navigation'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Images from "../constants/Images";
import { Block, Button, Text, theme } from "galio-framework";
import Title from "../components/Title";
import firebase from "firebase";
import { baseURL } from "./../constants/utils";

export default function MapManagementScreen({navigation}) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [alertId, setAlertId] = useState([]);

    useEffect(() => {
      getUsers();
    }, []);
    
    const Item = ({ title, email, entryDate, action })=> {
        return (
          <View style={styles.item}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <View>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.action}>{action}</Text>
                  <Text style={styles.email}>{email}</Text>
                  
                  <Text
                    style={{
                      paddingLeft: 6,
                      paddingTop: 4,
                      color: "gray"
                    }}
                  >
                    Fecha: {entryDate}
                  </Text>
                  <Button style={styles.blockButton} onPress={() => deleteAlert({action})}>Eliminar</Button>

                  {/*<View style={{paddingLeft:10,paddingTop:10, paddingBottom:10, backgroundColor:currentTeme.COLORS.BORDER}}>
                    <Text>Acción: {action[0]}</Text>
                    <Text>Hora: {action[1]}</Text>
                    <Text>Ubicación: {action[2]}</Text>
                </View>*/}
                </View>
                <View>
                    {/*<Button style={styles.blockButton} onPress={() => showActions()}>Alertas</Button>*/}
                </View>
              </View>
            </View>
          </View>
        );
      }

      const getUsers =  async ()  => {
        let response = await fetch(baseURL + "/alerts", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          
        });
        let responseJson = await response.json();
       
        console.log(responseJson);
        setFilteredDataSource( responseJson);
      }

      const deleteAlert = async (alertId) => {
        //console.log(alertId);
        let response = await fetch(baseURL + "/user/" + "5fc0a27eb622f2be8ac39973", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          
        });
        let responseJson = await response;
       
      } 
    

    return (
        <View style={styles.container}>
        {/*<TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Filtrar por Usuario"
        />*/}
                  
          <Title >Gestión de Alertas</Title>

           <SafeAreaView style={styles.container2}>
            <FlatList
                data={filteredDataSource}
                renderItem={({ item }) => (
                <Item
                    title={item.category}
                    email={item.description}
                    entryDate={item.hourDate}
                    action={item._id}
                />
                )}
                keyExtractor={item => item.id}
            />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex:1
      },
      container2:{
        backgroundColor: "white",
        top:0
      },
      itemStyle: {
         padding: 10,
      },
      textInputStyle: {
          height: 40,
          borderWidth: 1,
          paddingLeft: 20,
          margin: 5,
          borderColor: '#009688',
          backgroundColor: '#FFFFFF',
        },
      item: {
          height: 150,
        },
        title: {
          fontSize: 25,
          paddingLeft: 6,
          paddingTop: 5,
          shadowOpacity: 0
        },
        email:{
          fontSize: 12,
          paddingLeft: 6
        },
        entryDate:{
          fontSize: 12,
          paddingLeft: 6
        },
        action:{
          paddingLeft: 6
        },
      blockButton:{
          width: 80,
          height: 30,
          backgroundColor: currentTeme.COLORS.DEFAULT
      }
});

