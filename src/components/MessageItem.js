import {Text, View, Button, Platform, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {Card} from "react-native-elements";
import { LargeButton } from "../components/LargeButton"
import {baseURL} from "../constants/utils";

import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import currentTeme from "../constants/Theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function MessageItem({ _id, title, image, message, updateHandler }) {
    const [data, setData] = React.useState({
        message: message,
        image: image,
        id: _id
    });


    const [isEditing, setIsEditing] = useState(false);

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
                await changeImage();
            }
        };

    const textInputChange = (val) => {
        setData({
            ...data,
            message: val,
        });
    };

    const editMessage = () => {
        setIsEditing(true);
    };


    // PATCH to api to modify message description
    const changeMessage = () =>  {
        setIsEditing(false);
        return fetch(baseURL + '/informations/' + data.id, {
            method: 'PATCH',
            body: JSON.stringify({
                message: data.message,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
    };

    // PATCH to api to modify message description
    const changeImage = () =>  {
        return fetch(baseURL + '/informations/' + data.id, {
            method: 'PATCH',
            body: JSON.stringify({
                image: data.image,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
    };


    // DELETE to api to delete item
    function deleteMessage() {
        return fetch(baseURL + '/informations/' + data.id, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                updateHandler();
            });
    }


    function cancelEdit() {
        setIsEditing(false);
    }

    return (

        <View>
            {isEditing === true ? (
                    <View>
                        <Card>
                        <TextInput
                            style={{ fontSize: 20}}
                            placeholder="Nueva Descripción..."
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={[styles.signIn, {backgroundColor:currentTeme.COLORS.SUCCESS, width: '45%'}]}>
                                    <TouchableOpacity onPress={() => { changeMessage()}}>
                                        <View  style={{ flex: 1, flexDirection: 'row' }}>
                                            <MaterialCommunityIcons name="image" color="white" size={20} style={{marginTop:6}}/>
                                            <Text style={styles.textSign}>Confirmar</Text></View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.signIn, {backgroundColor:currentTeme.COLORS.ERROR, width: '45%'}]}>
                                    <TouchableOpacity onPress={() => { cancelEdit()}}>
                                        <View  style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={styles.textSign}>Cancelar</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    </View>
                ) :
                (
            <Card>
                <Card.Title style={styles.title}>{title}</Card.Title>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    {data.message}
                </Text>
                <Card.Divider/>

                <Card.Image source={{ uri: data.image, width: 25, height: 25, }}/>
                <View style={{ flex: 1, flexDirection:"row", justifyContent: 'space-around' }}>
                    <View style={[styles.signIn, {backgroundColor:currentTeme.COLORS.SUCCESS}]}>
                        <TouchableOpacity
                            onPress={() => { editMessage()}}
                        >
                            <View  style={{ flex: 1, flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="pencil" color="white" size={20} style={{marginTop:6}}/>
                            <Text style={styles.textSign}> Texto</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.signIn, {backgroundColor:currentTeme.COLORS.INFO}]}>
                        <TouchableOpacity
                            onPress={() => { pickImage() }}
                        ><View  style={{ flex: 1, flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="image" color="white" size={20} style={{marginTop:6}}/>
                            <Text style={styles.textSign}> Foto</Text></View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.signIn, {backgroundColor:currentTeme.COLORS.ERROR}]}>
                        <TouchableOpacity
                            onPress={() => { deleteMessage() }}
                        >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="trash-can" color="white" size={20} style={{marginTop:6}}/>
                            <Text style={styles.textSign}> Eliminar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>
                )}

        </View>

    );

}

const styles = StyleSheet.create({

    title: {
        fontSize: 20,
        paddingLeft: 10,
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
        width: '32%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 10,
        marginTop: '12%',
    },
    textSign: {
        fontSize: 15,
        color: 'white',
        marginTop: 6
    }
});
