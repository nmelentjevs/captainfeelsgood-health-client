import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderStatus = ({
  status: { isPendingOrder, isConfirmedOrder, isFinishedOrder }
}) => {
  return (
    <Text>
      {!isFinishedOrder
        ? !isPendingOrder
          ? !isConfirmedOrder
            ? 'Order not comfirmed!'
            : 'Order confirmed!'
          : 'Order in progress!'
        : 'Order finished!'}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default OrderStatus;
