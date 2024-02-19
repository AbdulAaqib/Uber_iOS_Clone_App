import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable as PressableRaw, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";


function Pressable_RideOptionsCard(props) {
    return <PressableRaw
            onPress={props.onPress}
            hitSlop={props.hitSlop}
            style={({ pressed }) => [props.style || {}, {opacity:pressed ? 0.5 : 1}]}
            >{props.children}</PressableRaw>
}

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "Uber-X-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <Pressable_RideOptionsCard 
                onPress={() => navigation.navigate("NavigateCard")}
                style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]}>
                    <Icon name="chevron-left" type="fontawesome"/>
                </Pressable_RideOptionsCard>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride -
                {travelTimeInformation?.distance?.text}
                </Text>
            </View>
            <FlatList data={data} keyExtractor={(item) => item.id}
            renderItem={({item: { id, title, multiplier, image}, item}) => (
                <Pressable_RideOptionsCard 
                onPress={() => setSelected(item)}
                style={tw`flex-row justify-between items-center px-1 ${ id === selected?.id && "bg-gray-200"}`}
                >
                    <Image
                         style={{
                            width: 80,
                            height: 80,
                            resizeMode: "contain",
                         }}
                         source={{ uri: image}}
                    />
                    <View style={tw`ml-1`}>
                        <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                    </View>
                    <Text style={tw`text-xl px-5`}>

                         {new Intl.NumberFormat('en-gb', {
                            style: 'currency',
                            currency: 'GBP'
                         }).format(

                            (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100


                         )}


                    </Text>
                </Pressable_RideOptionsCard>
            )}
            />
            <View style={tw`mt-auto border-t border-gray-200`}>
                <Pressable_RideOptionsCard disabled={!selected} 
                style={tw`bg-black py-0.5 m-0.5 ${!selected && "bg-gray-300"}`}
                >
                    <Text style={tw`text-center text-white text-xl`}
                    >Choose {selected?.title}</Text>
                </Pressable_RideOptionsCard>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard
 
const styles = StyleSheet.create({})
