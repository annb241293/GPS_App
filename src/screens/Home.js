import React, { useEffect } from "react";
import { View, Text, Image, PermissionsAndroid, Platform, Alert } from "react-native";
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



const HomeScreen = (props) => {

    useEffect(() => {
        // requestLocationPermission()
        // checkLocationPermission()
    }, [])

    // const requestLocationPermission = async () => {
    //     if (Platform === 'ios') {
    //         let response = await PermissionsAndroid.request()
    //         // let response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    //         if (response == 'granted') {
    //             getPosition()
    //         }
    //     } else {
    //         let response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    //         if (response == 'granted') {
    //             getPosition()
    //         }
    //     }
    // }

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
                // getPosition()
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const checkLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        console.log('checkLocationPermission', granted);

    }

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getPosition = () => {
        // Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                // this.setState({ initialPosition });
                console.log('initialPosition', initialPosition);

            },
            error => Alert.alert('Error', JSON.stringify(error)),
            // { enableHighAccuracy: false, timeout: 20000 },
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
                    latitude: 21.0123794,
                    longitude: 105.8110763,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    );
}

export default HomeScreen