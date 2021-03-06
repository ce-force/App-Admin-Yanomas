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

    useEffect(() => {
      getUsers();
    }, []);

    const searchFilterFunction = (text) => {
      if (text) {
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.category
            ? item.category.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      }
    };
    
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
                <Button style={styles.blockButton} onPress={() => deleteAlert({action})}>Eliminar</Button>

                <View>
                  <Text style={styles.title}>{title.toUpperCase()}</Text>
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
        setMasterDataSource(responseJson);
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

                  
          <Title >Gestión de Alertas</Title>
          <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Filtrar por Categoría"
        />

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
          borderColor: currentTeme.COLORS.PRIMARY,
          backgroundColor: currentTeme.COLORS.WHITE,
        },
      item: {
          height: 120,
        },
        title: {
          fontSize: 25,
          paddingLeft: 6,
          paddingTop: 5,
          shadowOpacity: 0,
          color: currentTeme.COLORS.PRIMARY
        },
        email:{
          fontSize: 12,
          paddingLeft: 6,
          color: "grey"
        },
        entryDate:{
          fontSize: 12,
          paddingLeft: 6
        },
        action:{
          paddingLeft: 6,
          color: currentTeme.COLORS.WARNING
        },
        blockButton:{
          height: 35,
          width: 90,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          elevation: 10,
          top:15,
          backgroundColor: currentTeme.COLORS.DEFAULT
        }
});

