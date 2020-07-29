import React, { useState, useRef, useEffect } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
// import { PageContext } from "../../../App";
// import HeaderThreeButton from "../../components/HeaderThreeButton";
import MaterialButton from "../components/MaterialButton";
import MaterialInput from "../components/MaterialInput";
// import { storageImageUrl } from "../../tools/Helpers";
import MaterialSnackbar from "../components/MaterialSnackbar";
import MaterialCheckBox from "../components/MaterialCheckBox";
import { CommonActions } from '@react-navigation/native';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager } from "react-native-fbsdk";
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-community/google-signin';


let margin = 10;

const LoginScreen = (props) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // const pageContext = useContext(PageContext);
    const snackbarRef = useRef(null);

    useEffect(() => {
        console.log('LoginScreen props', props);
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '202751078678-9uvm5svbhuam7ebqkb85rqk2132vrafl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            // hostedDomain: '', // specifies a hosted domain restriction
            // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            // accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
        isSignedIn()
    }, [])

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        // this.setState({ isLoginScreenPresented: !isSignedIn });
        console.log('isSignedIn', isSignedIn);

    };

    const navigateToRegister = () => {
        props.navigation.navigate("Register")
    }

    const navigateToHome = () => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Home' },
                ],
            })
        )
    }

    const checkDataLogin = () => {
        if (userName != "" && password != "") {
            return true
        }
        return false
    }

    const onClickSignIn = () => {
        if (checkDataLogin()) {
            navigateToHome()
        } else {
            snackbarRef.current.ShowSnackBarFunction("userName or passWord is Empty")
        }
    }

    const onChangeText = (text, type) => {
        if (type == 1) {
            setUserName(text)
        }
        if (type == 2) {
            setPassword(text)
        }
    }

    const signInWithFaceBook = () => {
        // LoginManager.logOut()
        if (Platform.OS === "android") {
            LoginManager.setLoginBehavior("web_only")
        }
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                console.log('logInWithPermissions result', result);
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    navigateToHome()
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    const signOut = async () => {
        try {
            console.log('signOut');
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            isSignedIn()
            // this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error('signOut error', error);
        }
    };

    const googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);
            // isSignedIn()
            if (userInfo) {
                navigateToHome()
            }
        } catch (error) {
            console.log('googleSignIn error', error);

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };


    // return (

    // );

    return (
        // <View>
        //     <LoginButton 
        //         onLoginFinished={
        //             (error, result) => {
        //                 if (error) {
        //                     console.log("login has error: " + result.error);
        //                 } else if (result.isCancelled) {
        //                     console.log("login is cancelled.");
        //                 } else {
        //                     AccessToken.getCurrentAccessToken().then(
        //                         (data) => {
        //                             console.log(data.accessToken.toString())
        //                         }
        //                     )
        //                 }
        //             }
        //         }
        //         onLogoutFinished={() => console.log("logout.")} />
        // </View>
        <View style={{ flex: 1, backgroundColor: '#f1f5f7' }}>
            {/* <HeaderThreeButton
                bgColor='#ff5722'
                isHome={true}
                navPress={() => pageContext.pageDispatch({ page: 'pop' })}
                searchPress={() => snackbarRef.current.ShowSnackBarFunction("search clicked")}
                morePress={() => snackbarRef.current.ShowSnackBarFunction("more clicked")}
            /> */}
            <ImageBackground source={{ uri: 'https://storage.bunnycdn.com/materialdesignnative/signup_login/login_register_19_960.jpg?AccessKey=ba8dd74c-5844-4d83-8523b4a5f50d-a128-4190' }}
                style={{ flex: 1, backgroundColor: '#f1f5f7', paddingBottom: 50 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                    <View style={{
                        width: 86,
                        height: 86,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'black',
                        borderRadius: 50,
                    }}>
                        <Image source={require('../assets/icon/ic_diamond.png')}
                            style={{ height: 50, width: 50, resizeMode: 'contain' }} />
                    </View>
                </View>
                <Text style={{ fontSize: 24, color: 'white', paddingTop: 30, alignSelf: 'center' }}>Welcome</Text>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginHorizontal: margin,
                    marginBottom: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                }} onPress={navigateToRegister}>
                    <Text style={{ fontSize: 14, color: 'white', textAlign: 'center' }}>
                        <Text>Dont have an account?</Text>
                        <Text style={{ fontWeight: 'bold', color: '#ff5722' }}> Register</Text>
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
            <View style={{
                marginTop: -40,
                marginHorizontal: margin,
                paddingHorizontal: margin,
                paddingBottom: margin,
                backgroundColor: 'white',
                borderRadius: 3,
                elevation: 3,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3
            }}>
                <MaterialInput bgColor='#f1f5f7' placeholder='Username' onChangeText={(text) => { onChangeText(text, 1) }} />
                <MaterialInput bgColor='#f1f5f7' placeholder='Password' isPassword={true} onChangeText={(text) => { onChangeText(text, 2) }} />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    marginBottom: 20,
                }}>
                    <MaterialCheckBox title='Remember me' />
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => snackbarRef.current.ShowSnackBarFunction('forgot password clicked')}>
                        <Text style={{ fontSize: 14, textAlign: 'center' }}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
                <MaterialButton title='Sign In' style={{ backgroundColor: '#ff5722', marginTop: 25 }}
                    buttonPress={onClickSignIn} />
            </View>
            <MaterialButton title='Sign In with Facebook' style={{
                marginHorizontal: margin * 2,
                marginTop: margin,
                backgroundColor: '#3f569a'
            }}
                buttonPress={signInWithFaceBook} />
            <MaterialButton title='Sign In with Google' style={{
                marginHorizontal: margin * 2,
                marginTop: margin,
                marginBottom: 20,
                backgroundColor: '#3498DB'
            }}
                buttonPress={googleSignIn} />
            {/* <MaterialButton title='Sign out Google' style={{
                marginHorizontal: margin * 2,
                marginTop: margin,
                marginBottom: 20,
                backgroundColor: '#3498DB'
            }}
                buttonPress={signOut} /> */}
            {/* <GoogleSigninButton
                style={{ width: 300, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={googleSignIn}
                disabled={false} /> */}
            <MaterialSnackbar ref={snackbarRef} />
        </View>
    );
}

export default LoginScreen;