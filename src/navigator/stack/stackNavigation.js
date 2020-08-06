import React, { } from 'react';
import Animated from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../../screens/Login";
import Home from "../../screens/Home";
import Register from "../../screens/Register";
import DrawerNavigation from '../drawer/drawerNavigation';

const MainStack = createStackNavigator();


const StackNavigation = (props) => {

    return (
        <Animated.View style={{ flex: 1 }}>
            <MainStack.Navigator
                headerMode="none">
                <MainStack.Screen name="Home">{props => <Home {...props} />}</MainStack.Screen>
                <MainStack.Screen name="Login">{props => <Login {...props} />}</MainStack.Screen>
                <MainStack.Screen name="Register">{props => <Register {...props} />}</MainStack.Screen>
                {/* <MainStack.Screen name="Home">{props => <BottomTabNavigation {...props} screenOptions={{ headerLeft: null }} />}</MainStack.Screen> */}
            </MainStack.Navigator>
        </Animated.View>
    );
};

export default StackNavigation;
