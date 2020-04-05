import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Vibration, Button } from 'react-native';
import useOrders from '../hooks/useOrders';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { Context as AuthContext } from '../context/AuthContext';
import OrderStatus from '../components/OrderStatus';
import BottomLines from '../components/common/BottomLines';

const OrderStatusScreen = () => {
  const {
    isConfirmedOrder,
    isFinishedOrder,
    saveNotificationToken
  } = useOrders();
  const [listener, setListener] = useState(null);
  const {
    state: {
      user: { isPendingOrder }
    }
  } = useContext(AuthContext);

  useEffect(() => {
    registedForPushNotifications();
    () => {
      listener.remove();
    };
  }, []);

  // Check for existing permissions
  const registedForPushNotifications = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;
    // If no existing permissions ask user:{isPendingOrder} for permission
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // If no permission, exit the function
    if (finalStatus !== 'granted') return;

    // Get push notification token
    let token;
    try {
      token = await Notifications.getExpoPushTokenAsync();
    } catch (e) {
      console.log(e);
    }

    const _notificationSubscription = Notifications.addListener(
      _handleNotification
    );
    setListener(_notificationSubscription);

    saveNotificationToken(token);
  };

  const _handleNotification = async notification => {
    if (notification.remote) {
      Vibration.vibrate();
      const notificationId = Notifications.presentLocalNotificationAsync({
        title: 'Your order has been confirmed',
        body: 'You will be contacted shortly',
        ios: { _displayInForeground: true } // <-- HERE'S WHERE THE MAGIC HAPPENS
      });
    }
  };

  return (
    <View style={styles.container}>
      <OrderStatus
        status={{
          isPendingOrder,
          isConfirmedOrder,
          isFinishedOrder
        }}
      />
      <BottomLines
        status={{
          isPendingOrder,
          isConfirmedOrder,
          isFinishedOrder
        }}
      />
    </View>
  );
};

OrderStatusScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrderStatusScreen;
