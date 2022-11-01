import { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";

import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

export const MealDetailScreen = ({ route, navigation }) => {
  const favoriteMealsIds = useSelector((state) => state.favoriteMeals.ids);

  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  const mealsIsFavorite = favoriteMealsIds.includes(mealId);

  const mealDetailParams = {
    affordability: selectedMeal.affordability,
    complexity: selectedMeal.complexity,
    duration: selectedMeal.duration,
    textStyle: styles.mealDetail
  }

  const changeFavoriteStatusHandler = () => {
    if (mealsIsFavorite) {
      // favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    }
    else {
      // favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton
          icon={mealsIsFavorite ? 'star' : 'star-outline'}
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