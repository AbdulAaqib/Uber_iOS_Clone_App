import React from 'react';
import { StyleSheet, Text, View, Pressable as PressableRaw } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Map from '../components/map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
function Pressable_MapScreen(props) {
    return <PressableRaw
            onPress={props.onPress}
            hitSlop={props.hitSlop}
            style={({ pressed }) => [props.style || {}, {opacity:pressed ? 0.5 : 1}]}
            >{props.children}</PressableRaw>
}

const MapScreen = () => {
    const Stack = createNativeStackNavigator(); 
    const navigation = useNavigation();
    return (
        <View>
            <Pressable_MapScreen 
            onPress ={() => navigation.navigate("HomeScreen")}
            style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
                <Icon name="menu"/>
            </Pressable_MapScreen>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
            <Stack.Navigator>
            <Stack.Screen
                name="NavigateCard"
                component={NavigateCard}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="RideOptionsCard"
                component={RideOptionsCard}
                options={{
                    headerShown: false,
                }}
            />
            </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})