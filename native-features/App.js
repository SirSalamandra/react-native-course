import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { Colors } from './constants/colors';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import GoogleMap from './screens/GoogleMap';
import { useEffect, useState } from 'react';
import { init } from './util/database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  if (!dbInitialized) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AllPlaces' screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}>
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => <IconButton icon='add' color={tintColor} size={24} onPress={() => navigation.navigate('AddPlace')} />
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: 'Add a new Place'
            }}
          />
          <Stack.Screen
            name='Map'
            component={GoogleMap}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
