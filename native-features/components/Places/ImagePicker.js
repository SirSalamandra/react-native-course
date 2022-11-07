import { Alert, Image, View, Text, StyleSheet } from "react-native";
import * as ExpoImagePicker from 'expo-image-picker';

import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

export default ImagePicker = ({ onTakeImage }) => {
  const [cameraPermissionInformation, requestPermission] = ExpoImagePicker.useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === ExpoImagePicker.PermissionStatus.UNDETERMINED) {
      const permissionsResponse = await requestPermission();

      return permissionsResponse.granted;
    }

    if (cameraPermissionInformation.status === ExpoImagePicker.PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions', 'You need to grant camera permissions to use this app');

      return await requestPermission();
    }

    return true;
  }

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;
    const image = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    setPickedImage(image.uri);
    onTakeImage(image.uri);
  }

  let imagePreview = <Text>Not Image taken yet.</Text>

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      {/* <Button title='Take Image' onPress={takeImageHandler} /> */}
      <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
})