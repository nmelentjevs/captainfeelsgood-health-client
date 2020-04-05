import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Swipeable, { RectButton } from 'react-native-gesture-handler/Swipeable';
import HistoryItem from './HistoryItem';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import useOrders from '../hooks/useOrders';

const SwipeableHistoryItem = ({ order }) => {
  const { finishOrder } = useOrders();

  if (!order) return null;

  const RightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0]
    });

    const handleFinishOrder = () => {
      finishOrder(order);
    };

    const handleReportClient = () => {
      console.log('Client Reported');
    };

    return (
      <>
        <TouchableOpacity
          style={{ backgroundColor: 'transparent', justifyContent: 'center' }}
          onPress={handleReportClient}
        >
          <Animated.Text
            style={{
              color: 'white',
              paddingHorizontal: 10,
              fontWeight: '600',
              transform: [{ scale }]
            }}
          >
            <MaterialCommunityIcons
              name="account-alert"
              size={35}
              color="red"
            />
          </Animated.Text>
        </TouchableOpacity>
        {order.status === 'in-progress' ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center'
            }}
            onPress={handleFinishOrder}
          >
            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
                transform: [{ scale }]
              }}
            >
              <Feather name="check" size={35} color="green" />
            </Animated.Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',
              justifyContent: 'center'
            }}
            onPress={handleFinishOrder}
          >
            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
                transform: [{ scale }]
              }}
            >
              <AntDesign name="star" size={35} color="gold" />
            </Animated.Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <Swipeable renderRightActions={RightActions}>
      <HistoryItem order={order} />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  firstLeftAction: {
    padding: 10,
    backgroundColor: 'pink'
  },
  secondLeftAction: {
    padding: 10,
    backgroundColor: 'black'
  }
});

export default SwipeableHistoryItem;
