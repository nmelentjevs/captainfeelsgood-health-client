import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from './Modal';

const CustomMarker = ({ marker, selected, setSelected }) => {
  const confirmOrder = marker => {
    console.log(marker);
  };

  return <Text>X</Text>;
};

const styles = StyleSheet.create({
  markerStyle: {
    height: 35,
    width: 35
  }
});

export default CustomMarker;
