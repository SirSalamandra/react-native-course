import { useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { MealItem } from "../components/MealItem";
import { MEALS, CATEGORIES } from "../data/dummy-data";


export const MealsOverviewScreen = ({ route, navigation }) => {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => mealItem.categoryIds.indexOf(catId) >= 0);

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
    navigation.setOptions({ title: categoryTitle });
  }, [catId, navigation]);

  const renderMealItem = (itemData) => {
    const item = itemData.item;

    const pressHandler = () => {
      navigation.navigate('MealDetail', {
        mealId: item.id,
      });
    }

    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
      onPress: pressHandler
    };

    return (
      <MealItem {...mealItemProps} />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});