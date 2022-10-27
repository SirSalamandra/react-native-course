import { View, Text, Pressable, Image, StyleSheet, Platform } from "react-native";

export const MealItem = ({ title, imageUrl, duration, complexity, affordability }) => {
  return (
    <View style={styles.mealItem}>
      <Pressable 
        android_ripple={{ color: 'gray' }}
        style={({ pressed }) => pressed ? styles.buttonPressed : null} //* Usado para IOS
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailItem}>{duration}m</Text>
            <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
            <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
          </View>
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

  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  detailItem: {
    marginHorizontal: 4,
    fontSize: 12
  }
});