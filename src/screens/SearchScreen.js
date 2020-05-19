import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/search/SearchBar";
import useResults from "../hooks/useResults";
import RestaurantsList from "../components/search/RestaurantsList";

const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchApi, restaurants, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // console.log(price, restaurants);
    //price === '€' || '$$'
    return restaurants.filter((restaurant) => {
      return restaurant.price === price;
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearchSubmitted={() => searchApi(searchTerm)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <RestaurantsList
          restaurants={filterResultsByPrice("€")}
          title="Cost Effective"
        />
        <RestaurantsList
          restaurants={filterResultsByPrice("€€")}
          title="Little Spicier"
        />
        <RestaurantsList
          restaurants={filterResultsByPrice("€€€")}
          title="Big Expander"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchScreen
