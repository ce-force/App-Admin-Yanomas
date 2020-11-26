import React, {useState, useEffect} from "react";
import { StyleSheet, View, SafeAreaView,Image, TextInput,TouchableOpacity, FlatList, Keyboard} from "react-native";
import currentTeme from "../constants/Theme";
import { NavigationActions, StackActions } from 'react-navigation'
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Images from "../constants/Images";
import { Block, Button, Text, theme } from "galio-framework";


function UserManagementScreen({navigation}) {
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);

    let myLoop = [];

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = masterDataSource.filter(function (item) {
            const itemData = item.title
              ? item.title.toUpperCase()
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

    const DATA = [
        {
          id: "001",
          title: "reds@gmail.com",
          profile: Images.ProfilePicture,
          entryDate: "20/10/98", 
          totalActions: 11,
          currentLocation: "9.2323,-11.5353",
          action: [["Alerta de Crimen", "13:00:00", "9.2323,-11.5353"],
                   ["Alerta de Crimen", "13:00:00", "9.2323,-11.5353"]]
        },
        {
            id: "002",
            title: "kiki@gmail.com",
            profile: Images.ProfilePicture,
            entryDate: "20/10/98", 
            totalActions: 11,
            currentLocation: "9.2323,-11.5353",
            action: [["Alerta de Crimen", "13:00:00", "9.2323,-11.5353"]]
          },
      ];
    
    const Item = ({ title, profile, entryDate, totalActions, currentLocation, action })=> {
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
                <Image
                  source={{ uri: profile }}
                  style={{ height: 60, width: 60, borderRadius: 30, margin: 10 }}
                />
                <View>
                  <Text style={styles.title}>{title}</Text>
                  <Text
                    style={{
                      paddingLeft: 6,
                      paddingTop: 4,
                      color: "gray"
                    }}
                  >
                    Fecha de Ingreso: {entryDate}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 6,
                      color: "gray"
                    }}
                  >
                    Acciones Realizadas: {totalActions}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 6,
                      color: "gray"
                    }}
                  >
                    Ubicación Promedio: {currentLocation}
                  </Text>                    

                  {/*<View style={{paddingLeft:10,paddingTop:10, paddingBottom:10, backgroundColor:currentTeme.COLORS.BORDER}}>
                    <Text>Acción: {action[0]}</Text>
                    <Text>Hora: {action[1]}</Text>
                    <Text>Ubicación: {action[2]}</Text>
                </View>*/}
                </View>
                <View>
                    <Button style={styles.blockButton} onPress={() => blockUser()}>Bloquear</Button>
                    <Button style={styles.blockButton} onPress={() => showActions()}>Alertas</Button>
                </View>
              </View>
            </View>
          </View>
        );
      }

      const showActions = (currentUser) => {
          //alert(currentUser);
          navigation.navigate("AlertsList");
          
      }

      const blockUser = () => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
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
          .then((json) => alert(JSON.stringify(json)))
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
           <SafeAreaView style={styles.container2}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    title={item.title}
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
      },
      container2:{
        backgroundColor: "white",
        top:40
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
      blockButton:{
          width: 80,
          height: 30,
          backgroundColor: currentTeme.COLORS.PRIMARY
      }
});

export default UserManagementScreen;
