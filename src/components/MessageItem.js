import {Text, View, Button, Platform, TextInput} from "react-native";
import {Card} from "react-native-elements";
import { LargeButton } from "../components/LargeButton"
import {baseURL} from "../constants/utils";

import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export function MessageItem({ id, title, image, message }) {
    const [data, setData] = React.useState({
        message: message,
        image: image,
        id: id
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
        console.log(JSON.stringify({
            message: data.message,
        }));
        return fetch(baseURL + 'informations/' + data.id, {
            method: 'PATCH',
            body: JSON.stringify({
                message: data.message,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('JSON-------------------------------------------------')
                console.log(json);
            });
    }

    // DELETE to api to delete item
    function deleteMessage() {
        return fetch(baseURL, {
            method: 'DELETE',
            body: JSON.stringify({
               id: data.id,
                message: data.message
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => alert(JSON.stringify(json)));
    }


    function cancelEdit() {
        setIsEditing(false);
    }

    return (

        <View>
            {isEditing === true ? (
                    <View>
                        <Card style={{borderRadius: 8}}>
                        <TextInput
                            placeholder="Nueva Descripción"
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        <LargeButton width={100} title="Confirmar" onPress={() => changeMessage()}> </LargeButton>
                            <LargeButton width={100} title="Cancelar" onPress={() => cancelEdit()}> </LargeButton>
                        </Card>
                    </View>
                ) :
                (
            <Card style={{borderRadius: 8}}>
                <Card.Title>{title}</Card.Title>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    {data.message}
                </Text>
                <Card.Divider/>

                <Card.Image source={{ uri: data.image, width: 25, height: 25, }}/>
                <View style={{ flex: 1, flexDirection:"row", justifyContent: 'space-around' }}>
                    <View>
                        <LargeButton title="Editar mensaje"
                        onPress={() => {editMessage()}}
                        width={150}> </LargeButton>
                    </View>
                    <View>
                        <LargeButton title="Cambiar foto"
                                     onPress={() => pickImage()}
                                     width={130}> </LargeButton>
                    </View>
                </View>
                <View>
                    <LargeButton title="Eliminar"
                                 onPress={() => deleteMessage()}
                                 width='100%'> </LargeButton>
                </View>
            </Card>
                )}

        </View>

    );

}
