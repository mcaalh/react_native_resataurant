import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import RestaurantItem from './RestaurantItem';

const RestaurantsList = ({title, restaurants}) => {
    const navigation = useNavigation();
    if (!restaurants.length) {
        return null;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>{title}</Text>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={restaurants}
            keyExtractor={(result) => result.id}
            renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RestaurantDetails', { id: item.id })}
                  >
                    <RestaurantItem result={item} />
                  </TouchableOpacity>
                );
            }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    }
})

export default RestaurantsList;
