import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ searchTerm, onSearchTermChange, onSearchSubmitted }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        style={styles.inputStyle}
        placeholder="Chercher"
        value={searchTerm}
        onChangeText={onSearchTermChange}
        onEndEditing={onSearchSubmitted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10
  },
  inputStyle: {
    flex: 1,
    fontSize: 18
  },
  iconStyle: {
      fontSize: 35,
      alignSelf: 'center',
      marginHorizontal: 10
  }
});

export default SearchBar
