import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from "./navigator/stack/stackNavigation";

const RootComponent = (props) => {
    return (
        <NavigationContainer>
            <StackNavigation />
        </NavigationContainer>
    )
}

export default RootComponent