import React from 'react'
import { View, Text, Button } from 'react-native'

const FavoritesScreen = ({navigation}) => {
    return (
        <View>
            <Text>this is favorite screen</Text>
            <Button title="Accueil" onPress={() => navigation.navigate("Home")}>
            </Button>
            <Button title="Se deconnecter" onPress={() => signOut()}></Button>
        </View>
    )
}

export default FavoritesScreen
