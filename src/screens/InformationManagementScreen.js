import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, TextInput, Platform, RefreshControl } from "react-native";
import currentTeme from "../constants/Theme";

import { baseURL } from "../constants/utils";

import {Picker} from '@react-native-picker/picker';
import {MessageItem} from "../components/MessageItem";
import {LargeButton} from "../components/LargeButton";
import * as ImagePicker from "expo-image-picker";



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


    const getTitle = () => {
        for(let i = 0; i < categories.length; i++){
            if(categories[i].type === category.type){
                setData({
                    ...data,
                    title: categories[i].label
                })
            }
        }
    }


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


    useEffect(() => {
        getRequests();
    }, []);


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
        if( val.trim().length <= 300 ) {
            setData({
                ...data,
                message: val,
            });
        }
    };

    function handleChange(value) {
        setCategory({type: value})
    }

    function newItem() {
        setAddItem({isAddingItem: true})
    }

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
            .then((json) => alert(JSON.stringify(json)));
    };


    function cancelAdd() {
        setAddItem({isAddingItem: false});
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={category.type}
                onValueChange={value => handleChange(value)}
                mode="dropdown"
                style={styles.picker}
                itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30}}>
                {categories.map(item => <Picker.Item key={item.id} label={item.label} value={item.type}/>)}
            </Picker>
            {AddItem.isAddingItem === false ? (
            <LargeButton title="Agregar"
                         onPress={() => { getTitle(), newItem()}}
                         width={200}> </LargeButton>
                ): <View/>}

            <View>
                {AddItem.isAddingItem === true ? (
                    <View>

                        <TextInput
                            placeholder="Descripción"
                            style={[styles.textInput, {
                                color: 'black'
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                        />
                        <LargeButton width={200} title="Seleccionar imagen" onPress={() => pickImage()}> </LargeButton>
                        <LargeButton width={100} title="Confirmar" onPress={() => submitNewItem()}> </LargeButton>
                        <LargeButton width={100} title="Cancelar" onPress={() => cancelAdd()}> </LargeButton>
                    </View>
                    ) :
                    (
            <ScrollView style={{ marginBottom: 150}}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => getRequests()} />
                        }
            >
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

            </ScrollView>
            )}
            </View>

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
        width: 260,
        fontSize:10,
        borderRadius: 10,
        marginTop: 200
    },
    textInput: {
        marginTop: 10,
        paddingLeft: 10,
        color: currentTeme.COLORS.ACTIVE,
        fontSize: 20
    },
});

export default InformationManagementScreen;
