import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, Image, StyleSheet, Platform } from "react-native";
import MealDetails from "../MealDetails";

export default MealItem = ({ id, title, imageUrl, duration, complexity, affordability }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate('MealDetail', {
      mealId: id,
    });
  }

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: 'gray' }}
        style={({ pressed }) => pressed ? styles.buttonPressed : null} //* Usado para IOS
        onPress={pressHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails duration={duration} complexity={complexity} affordability={affordability} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',

    elevation: 4,

    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,

    overflow: Platform.OS === "android" ? "hidden" : 'visible'
  },

  buttonPressed: {
    opacity: 0.5,
  },

  innerContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },

  image: {
    width: '100%',
    height: 200,
  },

  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8
  },
});