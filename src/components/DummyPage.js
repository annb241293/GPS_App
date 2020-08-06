import React from 'react';
import { Text, View } from "react-native";
import HeaderThreeButton from "./HeaderThreeButton";
import Main from "../screens/Main";

function DummyPage({ leftMenuRef, snackbarRef }) {
    return (
        <View style={{ flex: 1 }}>
            <HeaderThreeButton
                title='Menu'
                isHome={true}
                navPress={() => leftMenuRef.current.navigateMenu()}
                searchPress={() => snackbarRef.current.ShowSnackBarFunction('search clicked')}
                morePress={() => snackbarRef.current.ShowSnackBarFunction('more clicked')}
                bgColor='#8e24aa'
            />
            <View style={{ flex: 1, }}>
                <Main />
            </View>
        </View>
    );
}

export default DummyPage;