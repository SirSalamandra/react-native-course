import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CategoriesScreens } from './screens/CategoriesScreen';
import { MealsOverviewScreen } from './screens/MealsOverviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MealsCategories' screenOptions={{
          headerStyle: { backgroundColor: '#351401' },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: '#3f2f25' }
        }}>
          <Stack.Screen
            name='MealsCategories'
            component={CategoriesScreens}
            options={{ title: 'Meals Categories', }}
          />
          <Stack.Screen
            name='MealsOverview'
            component={MealsOverviewScreen}
          // options={({ route, navigation }) => {
          //   const catId = route.params.categoryId;
          //   return { title: catId };
          // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}