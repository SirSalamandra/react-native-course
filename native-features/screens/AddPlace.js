import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

export default AddPlace = ({ navigation }) => {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);

    navigation.navigate('AllPlaces');
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}