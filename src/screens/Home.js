import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, PermissionsAndroid, Platform, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapNavigation from "../components/MapNavigation";
import HeaderThreeButton from "../components/HeaderThreeButton";

const mapWidth = Dimensions.get('window').width;
const mapHeight = Dimensions.get('window').height;
const LATITUDE_DELTA = 0.05;

const HomeScreen = (props) => {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [latDelta, setLatDelta] = useState(LATITUDE_DELTA);
    const ASPECT_RATIO = mapWidth / mapHeight;
    const LONGITUDE_DELTA = latDelta * ASPECT_RATIO;


    useEffect(() => {
        requestLocationPermission()
    }, [])

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This App needs access to your location ' +
                        'so we can know where you are.',
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use locations ")
                getPosition()
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }


    const getPosition = () => {
        Geolocation.getCurrentPosition(
            position => {
                console.log('initialPosition', position);
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 20000 },
        );
    }



    return (
        <View style={{ flex: 1 }}>
            <HeaderThreeButton />
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: latDelta,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            />
            <MapNavigation style={{ position: 'absolute', elevation: 10, left: 10, top: 85 }}
                zoomInPress={() => setLatDelta(latDelta / 2)}
                zoomOutPress={() => setLatDelta(latDelta * 2)}
                myLocationPress={getPosition} />
        </View>
    );
}

export default HomeScreen