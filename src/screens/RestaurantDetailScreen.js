import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Linking
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Constants from "expo-constants";
// galio components
import { Block, Card, Text, Icon, DeckSwiper } from "galio-framework";
import theme from "./../theme";
import yelp from "../api/yelp";

const { width, height } = Dimensions.get("screen");
const { statusBarHeight } = Constants;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);


const RestaurantDetailScreen = ({ route, navigation }) => {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const { id } = route.params;
  console.log(restaurantDetails);
  const getRestaurant = async (id) => {
    const response = await yelp.get(`/${id}`);
    setRestaurantDetails(response.data);
  };

  useEffect(() => {
    getRestaurant(id);
  }, []);

  const _renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: item }}
          resizeMode="cover"
          style={{
            width,
            height: height * 0.55,
          }}
        />
      </View>
    );
  };

  const pagination = () => {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

  if (!restaurantDetails) {
    return null;
  }
  return (
    <Block>
      <Block>
        <Carousel
          data={restaurantDetails.photos}
          renderItem={_renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{ width: viewportWidth }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          hasParallaxImages={true}
        />
        {pagination}
      </Block>

      <Block center style={{ marginTop: -theme.SIZES.BASE * 2 }}>
        <Block flex style={styles.header}>
          <Block>
            <View style={{ flexDirection: "row" }}>
              <Text size={theme.SIZES.BASE * 1.875}>
                {restaurantDetails.name}
              </Text>
              <Block style={{ flexDirection: "row", marginLeft: "auto" }}>
                <Block
                  row
                  middle
                  style={{ marginHorizontal: theme.SIZES.BASE }}
                >
                  <Icon
                    name="eye"
                    family="font-awesome"
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                  />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    {restaurantDetails.review_count}
                  </Text>
                </Block>
                <Block row middle>
                  <Icon
                    name="heart"
                    family="font-awesome"
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                  />
                  <Text
                    p
                    color={theme.COLORS.MUTED}
                    size={theme.SIZES.FONT * 0.875}
                    style={{ marginLeft: theme.SIZES.BASE * 0.25 }}
                  >
                    {restaurantDetails.rating}
                  </Text>
                </Block>
              </Block>
            </View>

            <Text
              onPress={() => {
                Linking.openURL(`tel:${restaurantDetails.phone}`);
              }}
              style={styles.funcNavText}
            >
              Réserver: {restaurantDetails.phone}
            </Text>

            {restaurantDetails.location.display_address.map((adress, key) => (
              <Text
                key={key}
                muted
                t
                size={theme.SIZES.BASE * 0.875}
                style={{ marginTop: theme.SIZES.BASE, fontWeight: "500" }}
              >
                {adress}
              </Text>
            ))}
          </Block>
          <Block>
            <MapView
              style={styles.mapStyle}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: restaurantDetails.coordinates.latitude,
                longitude: restaurantDetails.coordinates.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              coordinate={{
                latitude: restaurantDetails.coordinates.latitude,
                longitude: restaurantDetails.coordinates.longitude,
              }}
              title={restaurantDetails.name}
            />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: theme.SIZES.BASE * 2,
    borderTopRightRadius: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: "absolute",
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: "center",
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: "center",
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
  imgStyle: {
    width: 300,
    height: 200,
    borderRadius: 4,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  }
});

export default RestaurantDetailScreen;

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, FlatList, Image } from "react-native";
// import useRestaurantDetails from '../hooks/useRestaurantDetails';
// import yelp from '../api/yelp';

// const RestaurantDetailScreen = ({navigation}) => {
//     const [restaurantDetails, setRestaurantDetails] = useState(null)
//     const [searchApi, restaurantDetail, errorMessage] = useRestaurantDetails();
//     const id = navigation.getParam('id');
//     console.log(restaurantDetails)
//     const getRestaurant = async (id) => {
//         const response = await yelp.get(`/${id}`);
//         setRestaurantDetails(response.data);
//     };

//     useEffect(() => {
//         getRestaurant(id);
//     }, [])

//     if (!restaurantDetails) {
//         return null;
//     }

//     return (
//         <View>
//             <Text>{restaurantDetails.name}</Text>
//             <FlatList
//                 data={restaurantDetails.photos}
//                 keyExtractor={(photo) => photo}
//                 renderItem={({item}) => {
//                     return <Image style={styles.imgStyle} source={{ uri: item }} />;
//                 }}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//   imgStyle: {
//     width: 300,
//     height: 200,
//     borderRadius: 4,
//     marginBottom: 5,
//   }
// });

// export default RestaurantDetailScreen
