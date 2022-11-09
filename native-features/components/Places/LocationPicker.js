import { Alert, Image, StyleSheet, View, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

import { getAddress, getMapPreview } from "../../util/location";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useEffect, useState } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

export default LocationPicker = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const verifyPermissions = async () => {
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionsResponse = await requestPermission();

      return permissionsResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions', 'You need to grant camera permissions to use this app');

      return false;
    }

    return true;
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (hasPermission) {
      const location = await getCurrentPositionAsync();
      const mapPickedLocation = {
        lat: location.coords.latitude,
        long: location.coords.longitude
      };

      setPickedLocation(mapPickedLocation);
    }
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  }

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = { lat: route.params.pickedLat, long: route.params.pickedLong };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.long);
        onPickLocation({ ...pickedLocation, address: address });
      }
    }
    handleLocation()
  }, [pickedLocation, onPickLocation])

  let locationPreview = <Text>no Location picked yet.</Text>

  if (pickedLocation) {
    locationPreview = <Image
      style={styles.image}
      source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.long) }}
    />
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
        <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center'
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
});