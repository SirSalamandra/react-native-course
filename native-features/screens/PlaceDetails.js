import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";

export default PlaceDetails = ({ route, navigation }) => {
  const [loadedPlace, setLoadedPlace] = useState();
  const selectedPlaceId = route.params.placeId;

  const showOnMapHandler = () => {
    navigation.navigate('Map', {location: loadedPlace.location});
  }

  useEffect(() => {
    const loadPlace = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setLoadedPlace(place);

      navigation.setOptions({
        title: place.title
      });
    }

    loadPlace();
  }, [selectedPlaceId])

  if (!loadedPlace) return <View style={styles.fallback}><Text>Loading place...</Text></View>

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: loadedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{loadedPlace.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>View on Map</OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },

  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },

  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  addressContainer: {
    padding: 20,
  },

  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});