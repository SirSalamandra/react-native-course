import { useContext, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";

import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { FavoritesContext } from "../store/context/favorites-context";

export const MealDetailScreen = ({ route, navigation }) => {
  const favoriteMealsCtx = useContext(FavoritesContext);

  const id = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === id);
  const mealDetailParams = {
    affordability: selectedMeal.affordability,
    complexity: selectedMeal.complexity,
    duration: selectedMeal.duration,
    textStyle: styles.mealDetail
  }

  const mealsIsFavorite = favoriteMealsCtx.ids.includes(id);
  const changeFavoriteStatusHandler = () => {
    if (mealsIsFavorite) favoriteMealsCtx.removeFavorite(id);
    else favoriteMealsCtx.addFavorite(id);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton
          icon={mealsIsFavorite ? 'star' : 'star-outline'}
          // icon='star'
          color='white'
          onPress={changeFavoriteStatusHandler}
        />
      }
    })
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails {...mealDetailParams} />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 10
  },

  image: {
    width: '100%',
    height: 350
  },

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white'
  },

  mealDetail: {
    color: 'white'
  },

  listOuterContainer: {
    alignItems: 'center'
  },

  listContainer: {
    width: '80%'
  }
});