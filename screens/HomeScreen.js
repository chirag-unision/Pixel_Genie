import * as React from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initTour, setTour, payloadPage } from "./iniScreens";

export function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
        </View>
    );
}

const Stack = createNativeStackNavigator();
const init = "init";
const setATour = "setATour";
const Payload = "Payload";

export function DetailsScreen({ navigation }) {
    return (
        <Stack.Navigator initialRouteName={init} screenOptions={{headerShown: false}}>
          <Stack.Screen name={init} component={initTour} />
          <Stack.Screen name={setATour} component={setTour} />
          <Stack.Screen name={Payload} component={payloadPage} />
        </Stack.Navigator>
    );
}
