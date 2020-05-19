import React from 'react'
import { View, Text, Image, StyleSheet } from "react-native";

const RestaurantItem = ({result}) => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imgStyle}
          source={{
            uri: result.image_url,
          }}
        />
        <Text style={styles.nameStyle}>{result.name}</Text>
        <Text>
          Note: {result.rating}, 
          {result.review_count} Commentaires
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginLeft: 15
    },
    imgStyle: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 5
    },
    nameStyle: {
        fontWeight:'bold',
        marginBottom: 5
    }
})

export default RestaurantItem
