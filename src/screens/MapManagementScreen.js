import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { baseURL } from "../constants/utils";

import Title from "../components/Title";
import Map from "../components/Map";
import InfoArea from "../components/InfoArea";
import IconButton from "../components/IconButton";
import InputArea from "../components/InputArea";

const ALERTS = [
  {
    category: "Actividad sospechosa",
    description: "s1",
    coords: {
      latitude: 9.868443,
      longitude: -83.927897,
    },
    hourDate: "2014-08-20 15:30:00",
  },
  {
    category: "Asalto",
    description: "s1",
    coords: {
      latitude: 9.869443,
      longitude: -83.927797,
    },
    hourDate: "2014-08-20 15:30:00",
  },
  {
    category: "Actividad sospechosa",
    description: "s1",
    coords: {
      latitude: 9.867443,
      longitude: -83.927697,
    },
    hourDate: "2014-08-20 15:30:00",
  },
];

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

const MapManagementScreen = () => {
  const [loadingGPS, setLoadingGPS] = useState(false);
  const [reporting, setReporting] = useState(false);

  let map = useRef(null);
  const [crime, setCrime] = useState(null);
  const [alerts, setAlerts] = useState(null);

  const [location, setLocation] = useState({
    latitude: 9.868443,
    longitude: -83.927797,
  });
  let [category, setCategory] = useState("");
  let [description, setDescription] = useState("");

  const updateLocation = async () => {
    setLoadingGPS(true);
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No se puede acceder al GPS");
      setLoadingGPS(false);
      return;
    }
    let tmpLocation = await Location.getCurrentPositionAsync({});
    const finalLocation = {
      latitude: tmpLocation.coords.latitude,
      longitude: tmpLocation.coords.longitude,
    };
    moveCameraTo(finalLocation);
    setLocation(finalLocation);
    setLoadingGPS(false);
  };

  const moveCameraTo = (location) => {
    map.current.animateCamera(
      {
        center: location,
        zoom: 15,
      },
      1
    );
  };

  const moveObserver = (location) => {
    setLocation(location);
    setCrime(null);
  };

  const getCrimesFromApi = async () => {
    try {
      let response = await fetch(baseURL + "/alerts");
      let alerts = await response.json();
      setAlerts(alerts);
    } catch (error) {
      console.error(error);
    }
  };

  const sendReport = () => {
    if (!category) {
      Alert.alert("Debe al menos seleccionar una categoría");
      return;
    }

    fetch(baseURL + "/alerts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
        description: description,
        coords: location,
        hourDate: new Date().toISOString(),
      }),
    });

    Alert.alert("¡Muchas gracias por su colaboración!");
    setDescription("");
    setCrime("");
    setReporting(false);
  };

  let alertMarkers = null;

  if (!reporting && alerts) {
    alertMarkers = alerts.map((el, i) => (
      <Marker
        key={i}
        coordinate={el.coords}
        onPress={() => setCrime(el)}
        title={el.category}
      >
        <FontAwesome name="warning" size={24} color="black" />
      </Marker>
    ));
  }

  return (
    <View style={{ backgroundColor:"white", flex: 1 }}>
      <Title>Gestión de Alertas</Title>
      <ScrollView style={styles.container}>
        {reporting ? null : (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <IconButton clicked={getCrimesFromApi}>
              <FontAwesome name="refresh" size={30} color="white" />
            </IconButton>
            {/*<IconButton clicked={() => setReporting(true)}>
              <FontAwesome name="bullhorn" size={30} color="white" />
        </IconButton>*/}
          </View>
        )}
        <Map
          changeLocation={moveObserver}
          location={location}
          mapRef={map}
          reporting={reporting}
        >
          {alertMarkers}
        </Map>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <IconButton disabled={loadingGPS} clicked={updateLocation}>
            {loadingGPS ? (
              <ActivityIndicator color="white"></ActivityIndicator>
            ) : (
              <MaterialIcons name="gps-fixed" size={24} color="white" />
            )}
          </IconButton>
          <IconButton clicked={() => moveCameraTo(location)}>
            <FontAwesome name="map-marker" size={24} color="white" />
          </IconButton>
        </View>
        {reporting ? (
          <InputArea
            options={CRIMES}
            selected={category}
            description={description}
            handleChangeValue={(val) => {
              if (val) {
                setCategory(val);
              }
            }}
            handleChangeDescription={setDescription}
            location={location}
            finished={sendReport}
          ></InputArea>
        ) : (
          <InfoArea crime={crime}></InfoArea>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});

export default MapManagementScreen;
