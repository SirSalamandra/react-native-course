// import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import MealsList from "../components/MealsList/MealsList";
// import { FavoritesContext } from "../store/context/favorites-context";
import { useSelector } from "react-redux";

import { MEALS } from "../data/dummy-data";

export default FavoritesScreens = () => {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);

  const favoriteMeal = MEALS.filter(meal => favoriteMealsIds.includes(meal.id));

  if (favoriteMeal.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    )
  }

  return (
    <MealsList items={favoriteMeal} />
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});