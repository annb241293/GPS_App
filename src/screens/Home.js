import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, PermissionsAndroid, Platform, Alert } from "react-native";
import MaterialButton from "../components/MaterialButton";
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-community/google-signin';
import { CommonActions } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS, checkMultiple } from 'react-native-permissions';
import { TouchableOpacity } from "react-native-gesture-handler";
import MapNavigation from "../components/MapNavigation";

const mapWidth = Dimensions.get('window').width;
const mapHeight = Dimensions.get('window').height;
const LATITUDE_DELTA = 0.05;

const HomeScreen = (props) => {

    const [latitude, setLatitude] = useState(37.78825);
    const [longitude, setLongitude] = useState(-122.4324);
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
        // Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
            position => {
                // const initialPosition = JSON.stringify(position);
                // this.setState({ initialPosition });
                console.log('initialPosition', position);
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: false, timeout: 20000 },
        );
    }



    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={{ backgroundColor: "red" }}
                onPress={getPosition}>
                <Text>ok </Text>
            </TouchableOpacity>
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
                myLocationPress={() => snackbarRef.current.ShowSnackBarFunction('button my location clicked')} />
        </View>
    );
}

export default HomeScreen