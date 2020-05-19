import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../../context";

const ProfileScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>This is ProfileScreen </Text>
      <Button
        title="Mes Reservations"
        onPress={() => navigation.navigate("Reservations")}
      ></Button>
      <Button
        title="Accueil"
        onPress={() => navigation.navigate("Home")}
      ></Button>
      <Button title="Se deconnecter" onPress={() => signOut()}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProfileScreen;
