import React, {useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView,Image, TextInput,TouchableOpacity, FlatList, Keyboard} from "react-native";
import currentTeme from "../constants/Theme";
import { NavigationActions, StackActions } from 'react-navigation'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Images from "../constants/Images";
import { Block, Button, Text, theme } from "galio-framework";
import Title from "../components/Title";
import firebase from "firebase";
import {baseURL} from "./../constants/utils";

function UserManagementScreen({navigation}) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
      getUsers();
    }, []);

    const searchFilterFunction = (text) => {
      if (text) {
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
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
    
    const Item = ({ title, email, profile, entryDate, totalActions, currentLocation, action })=> {
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
                    <Button style={styles.blockButton} onPress={() => blockUser()}>Bloquear</Button>
                </View>
                <Image
                  source={{ uri: Images.ProfilePicture }}
                  style={{ height: 60, width: 60, borderRadius: 30, margin: 10 }}
                />
                <View>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.email}>{email}</Text>

                  <Text
                    style={{
                      paddingLeft: 6,
                      color: "gray"
                    }}
                  >
                    Ubicación - YaNoMás {currentLocation}
                  </Text>                    

                  {/*<View style={{paddingLeft:10,paddingTop:10, paddingBottom:10, backgroundColor:currentTeme.COLORS.BORDER}}>
                    <Text>Acción: {action[0]}</Text>
                    <Text>Hora: {action[1]}</Text>
                    <Text>Ubicación: {action[2]}</Text>
                </View>*/}
                </View>

              </View>
            </View>
          </View>
        );
      }

      const getUsers =  async ()  => {
        console.log("asadasdas");
        let response = await fetch(baseURL + "/users", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          
        });

        let responseJson = await response.json();
       // console.log(JSON.parse(responseJson));
        setFilteredDataSource( responseJson);
        setMasterDataSource( responseJson);
      }

      const showActions = (currentUser) => {
          //alert(currentUser);
          
      }

      const blockUser = () => {
       firebase.auth().updateUser(uid, {
          disabled: true
        })  
        .then((userRecord) => {
          console.log('Successfully updated user', userRecord.toJSON());
        })
        .catch((error) => {
          console.log('Error updating user:', error);
        });

        {/* return fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            currentUserMail: 'currentusername',
            action: "BLOCK"
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((json) => alert(JSON.stringify(json)))*/}
      } 
    

    return (
        <View style={styles.container}>
                  
          <Title style={styles.mainTitle}>Gestión de Usuarios</Title>

          <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Filtrar por Usuario"
        />

           <SafeAreaView style={styles.container2}>
            <FlatList
                data={filteredDataSource}
                renderItem={({ item }) => (
                <Item
                    title={item.name}
                    email={item.email}
                    imageUrl={item.imageUrl}
                    profile={item.profile}
                    entryDate={item.entryDate}
                    totalActions={item.totalActions}
                    currentLocation={item.currentLocation}
                    action={item.action}
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
  },
  mainTitle:{
    backgroundColor: currentTeme.COLORS.DEFAULT
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
      height: 115,
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
      color: currentTeme.COLORS.WARNING
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

export default UserManagementScreen;
