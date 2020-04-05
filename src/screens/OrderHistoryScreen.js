import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ScrollView
} from 'react-native';
import useOrders from '../hooks/useOrders';
import { SafeAreaView } from 'react-navigation';
import SwipeableHistoryItem from '../components/Swipeable';

const OrderHistoryScreen = ({ navigation: { addListener } }) => {
  const [refreshing, setRefreshing] = useState(false);
  const {
    temp: { orders },
    getOrders
  } = useOrders();

  useEffect(() => {
    addListener(
      'didFocus',
      setTimeout(() => {
        getOrders();
      }, 100)
    );
  }, [orders]);

  const _onRefresh = () => {
    setRefreshing(true);
    getOrders().then(() => {
      setRefreshing(false);
    });
  };

  if (!orders) return <ActivityIndicator size="small" color="white" />;

  return (
    <SafeAreaView style={styles.center}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={orders}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <SwipeableHistoryItem order={item} />}
      />
    </SafeAreaView>
  );
};

OrderHistoryScreen.navigationOptions = {};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default OrderHistoryScreen;
