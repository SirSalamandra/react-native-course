import PlaceForm from "../components/Places/PlaceForm";

export default AddPlace = ({ navigation }) => {
  const createPlaceHandler = (place) => {
    navigation.navigate('AllPlaces', { place: place });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}