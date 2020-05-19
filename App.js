import React, { useState, useMemo, useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import SearchScreen from "./src/screens/SearchScreen";
import RestaurantDetailScreen from './src/screens/RestaurantDetailScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import SigninScreen from './src/screens/auth/SigninScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/auth/SplashScreen'
import { AuthContext } from './src/contexts/AuthContext';


const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const TabsNav = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const DrawerNav = createDrawerNavigator();

const RootStackScreen = (userToken) => (
  <RootStack.Navigator headerMode="none">
    {userToken.userToken ? (
      <RootStack.Screen name="Home" component={DrawerNavScreen} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

const DrawerNavScreen = () => (
  <DrawerNav.Navigator>
    <DrawerNav.Screen name="Home" component={HomeStackScreens} />
    <DrawerNav.Screen name="Profile" component={ProfileScreen} />
  </DrawerNav.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Signin" component={SigninScreen} />
    <AuthStack.Screen name="Signup" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const HomeStackScreens = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    {/*<HomeStack.Screen name="details" component={Details} />*/}
  </HomeStack.Navigator>
);

const SearchStackScreens = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={SearchScreen} />
    <SearchStack.Screen
      name="RestaurantDetails"
      component={RestaurantDetailScreen}
    />
  </SearchStack.Navigator>
);

export default () => {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const authContext = useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("abc");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("abc");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};