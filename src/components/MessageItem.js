import {Text, View, Button} from "react-native";
import {Card} from "react-native-elements";
import React from "react";
import { LargeButton } from "../components/LargeButton"
import {baseURL} from "../constants/utils";

export function MessageItem({ id, title, image, message }) {
    const [data, setData] = React.useState({
        message: message,
        image: image,
        id: id
    });


    function changeMessage() {
        return fetch(baseURL, {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                message: message
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => alert(JSON.stringify(json)));
    }

    function deleteMessage() {
        return fetch(baseURL, {
            method: 'DELETE',
            body: JSON.stringify({
               id: id,
                message: message
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((json) => alert(JSON.stringify(json)));
    }


return (

        <View>

            <Card style={{borderRadius: 8, marginTop: 50}}>
                <Card.Title>{title}</Card.Title>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    {data.message}
                </Text>
                <Card.Divider/>

                <Card.Image source={{ uri: data.image, width: 25, height: 25, }}/>
                <View style={{ flex: 1, flexDirection:"row", justifyContent: 'space-around' }}>
                    <View>
                        <LargeButton title="Editar"
                        onPress={changeMessage()}
                        width={150}> </LargeButton>
                    </View>
                    <View>
                        <LargeButton title="Cambiar foto"
                                     onPress={() => deleteMessage()}
                                     width={130}> </LargeButton>
                    </View>
                </View>
                <View>
                    <LargeButton title="Eliminar"
                                 onPress={() => deleteMessage()}
                                 width='100%'> </LargeButton>
                </View>
            </Card>

        </View>

    );

}
