import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, TextInput, Platform, RefreshControl, TouchableOpacity, Text} from "react-native";
import currentTeme from "../constants/Theme";

import { baseURL } from "../constants/utils";

import {Picker} from '@react-native-picker/picker';
import {MessageItem} from "../components/MessageItem";
import {LargeButton} from "../components/LargeButton";
import * as ImagePicker from "expo-image-picker";
import {MaterialCommunityIcons} from "@expo/vector-icons";



function InformationManagementScreen(){


    const [customData, setCustomData] = useState([]);

    const [refreshing, setRefreshing] = useState(false);

    const [data, setData] = useState({
        title: '',
        type: '',
        image: '',
        message: ''
    });

    const [category, setCategory] = useState({
        type: 'info',
    });

    const [AddItem, setAddItem] = useState({
        isAddingItem: false,
    });

    const categories = [
        {id: 0, type: "info", label: "Información relevante"},
        {id: 1, type: "reminder", label: "Recordatorios"},
        {id: 2, type: "contact", label: "Contacto"}
    ];


    // Obtains current title label for adding item
    const getTitle = () => {
        for(let i = 0; i < categories.length; i++){
            if(categories[i].type === category.type){
                setData({
                    ...data,
                    title: categories[i].label
                })
            }
        }
    };


    // Obtains items to display on screen
    const getRequests = () => {
        setRefreshing(true);
        fetch(baseURL + '/informations')
            .then((response) => response.json())
            .then((responseJson) => {
                setCustomData(responseJson);
                setRefreshing(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // First thing to load are the items
    useEffect(() => {
        getRequests();
    }, []);


    // Image picking permission
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    // Select image from gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            setData({
                ...data,
                image: result.uri
            });
        }
    };


    // Captures change on input for adding/editing item
    const textInputChange = (val) => {
        if( val.trim().length <= 300 ) {
            setData({
                ...data,
                message: val,
            });
        }
    };

    // Picker value change
    function handleChange(value) {
        setCategory({type: value})
    }

    // Displays new item form
    function newItem() {
        setAddItem({isAddingItem: true})
    }


    // POST mmethod for adding new item
    function submitNewItem() {
        setAddItem({isAddingItem: false});
        return fetch(baseURL + '/informations', {
            method: 'POST',
            body: JSON.stringify({
                title: data.title,
                type: category.type,
                image: data.image,
                message: data.message
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
    };


    // Cancels adding item
    function cancelAdd() {
        setAddItem({isAddingItem: false});
    }


    return (
        <View style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={() => getRequests()} />
            }
            >
                <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row'}}>
                    <Picker
                        selectedValue={category.type}
                        onValueChange={value => handleChange(value)}
                        mode="dropdown"
                        style={styles.picker}
                        itemStyle={{ backgroundColor: "grey", color: "blue", fontSize:17 }}>
                        {categories.map(item => <Picker.Item key={item.id} label={item.label} value={item.type}/>)}
                    </Picker>
                    {AddItem.isAddingItem === false ? (
                        <View style={[styles.signIn, {backgroundColor:currentTeme.COLORS.ACTIVE, width: '25%'}]}>
                            <TouchableOpacity
                                onPress={() => { getTitle(), newItem() }}>
                                <Text style={styles.textSign}>Agregar</Text>
                            </TouchableOpacity>
                        </View>
                        ): <View/>}

                </View>
                    <View>
                        {AddItem.isAddingItem === true ? (
                            <View style={{marginTop: '50%'}}>
                                <Text style={{fontSize: 20}}>Descripción</Text>
                                <TextInput
                                    placeholder="info..."
                                    underlineColorAndroid={currentTeme.COLORS.ACTIVE}
                                    style={styles.textInputText}
                                    onChangeText={(val) => textInputChange(val)}
                                />
                                <View style={styles.imageBtn}>
                                    <TouchableOpacity onPress={() => { pickImage()}}>
                                        <View  style={{ flex: 1, flexDirection: 'row' }}>
                                        <MaterialCommunityIcons name="image" color="white" size={20} style={{marginTop:6}}/>
                                        <Text style={styles.textSign}>Seleccionar Imagen</Text></View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={[styles.signIn, {backgroundColor:currentTeme.COLORS.SUCCESS, width: '45%'}]}>
                                        <TouchableOpacity onPress={() => { submitNewItem()}}>
                                            <View  style={{ flex: 1, flexDirection: 'row' }}>
                                                <MaterialCommunityIcons name="image" color="white" size={20} style={{marginTop:6}}/>
                                                <Text style={styles.textSign}>Confirmar</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.signIn, {backgroundColor:currentTeme.COLORS.ERROR, width: '45%'}]}>
                                        <TouchableOpacity onPress={() => { cancelAdd()}}>
                                            <View  style={{ flex: 1, flexDirection: 'row' }}>
                                                <Text style={styles.textSign}>Cancelar</Text></View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            ) :
                            (<View>
                        {customData.length !== 0 ? (
                        customData.map(element => { return category.type === element.type ? (
                                <MessageItem key={element._id}
                                             title={element.title}
                                             image={element.image}
                                             message={element.message}
                                             _id={element._id}
                                             updateHandler={getRequests} />)
                            : (<View key={element._id}/>)})
                            )
                            :
                            (<View/>)}

                    </View>
                    )}
                    </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        height: 31,
        paddingLeft: 15,
        borderStyle: "solid",
        borderBottomColor: currentTeme.COLORS.GRAY
    },
    title: {
        fontSize: 16,
        paddingLeft: 10
    },
    picker: {
        width: 250,
        fontSize:20,
        borderRadius: 10,
        marginTop: '10%',
        color: currentTeme.COLORS.DEFAULT
    },
    textInput: {
        marginTop: 10,
        paddingLeft: 10,
        color: currentTeme.COLORS.ACTIVE,
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    signIn: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
        marginTop: '12%',
        backgroundColor: currentTeme.COLORS.DEFAULT
    },
    imageBtn: {
        height: 35,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
        backgroundColor: currentTeme.COLORS.INFO,
        marginTop: '5%'
    },
    textSign: {
        fontSize: 15,
        color: 'white',
        marginTop: 3
    },
    textInputText: {
        fontSize: 15,
        color: 'black',
        height: 50
    }
});

export default InformationManagementScreen;
