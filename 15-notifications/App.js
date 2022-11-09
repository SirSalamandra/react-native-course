import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
});

export default function App() {
  useEffect(() => {
    const configurePushNotification = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();

        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permission Required', 'Push notifications need the appropriate permissions');
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync()
      console.log('pushTokenData', pushTokenData);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        })
      }
    }

    configurePushNotification();
  }, [])

  useEffect(() => {
    const subNotification = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification Received')
      // console.log(notification);
    });

    const subNotificationResponse = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification Response Received')
      // console.log(response);
    });

    return () => {
      subNotification.remove();
      subNotificationResponse.remove();
    }
  }, []);

  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hello World',
        body: 'This is my first notification.',
        data: {
          userName: 'Salamandra'
        }
      },
      trigger: {
        seconds: 5
      }
    });
  }

  const sendPushNotificationHandler = () => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: '',
        title: 'Test - Sent from a device',
        body: 'This is a test'
      })
    });
  }

  return (
    <View style={styles.container}>
      {/* <Button title='Schedule Notification' onPress={scheduleNotificationHandler} /> */}
      <Button title='Send Push Notification' onPress={sendPushNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
