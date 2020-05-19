import React, { useContext, useState } from "react";
import {
  View,
  Alert,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// galio component
import { Block, Button, Input, Text, NavBar } from "galio-framework";
import theme from "./../../theme";

import { AuthContext } from "../../contexts/AuthContext";

const { height, width } = Dimensions.get("window");

const SigninScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (name, value) => {
    setUser({
      email: name === "email" ? value : "",
      password: name === "password" ? value : "",
    });
  };

  return (
    <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <Block
          flex
          center
          style={{
            marginTop: theme.SIZES.BASE * 1.875,
            marginBottom: height * 0.1,
          }}
        >
          <Block left style={styles.header}>
            <Text h3>Bienvenue sur RestaurantRN</Text>
          </Block>
        </Block>

        <Block flex={2} center space="between">
          <Block flex={2}>
            <Input
              rounded
              type="email-address"
              placeholder="Email"
              autoCapitalize="none"
              style={{ width: width * 0.9 }}
              onChangeText={(text) => handleChange("email", text)}
            />
            <Input
              rounded
              password
              viewPass
              placeholder="Password"
              style={{ width: width * 0.9 }}
              onChangeText={(text) => handleChange("password", text)}
            />
            <Text
              color={theme.COLORS.ERROR}
              size={theme.SIZES.FONT * 0.75}
              onPress={() => Alert.alert("pas encore implémenté")}
              style={{
                alignSelf: "flex-end",
                lineHeight: theme.SIZES.FONT * 2,
              }}
            >
              Informations de compte oubliées ?
            </Text>
          </Block>
          <Block flex middle>
            <Button
              round
              color={theme.COLORS.FACEBOOK}
              onPress={() => signIn()}
            >
              Se Connecter
            </Button>
            <Button
              color="transparent"
              shadowless
              onPress={() => navigation.push("Signup")}
            >
              <Text
                center
                color={theme.COLORS.ERROR}
                size={theme.SIZES.FONT * 0.75}
              >
                Créer un compte
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default SigninScreen;
