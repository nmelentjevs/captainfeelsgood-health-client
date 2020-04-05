import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get('window');

const HistoryItem = ({ order }) => {
  return (
    <TouchableOpacity style={styles.historyOrder}>
      <Text>{order.marker.user.email}</Text>
      <Text>{order.status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  historyOrder: {
    padding: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'black',
    marginVertical: 5,
    width: width - 40,
    marginBottom: 10,
    alignItems: 'center'
  }
});

export default HistoryItem;
