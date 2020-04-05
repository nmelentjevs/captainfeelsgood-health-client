import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddressForm from '../../components/AddressForm';

const LocationScreen = () => {
  return <AddressForm />;
};

const styles = StyleSheet.create({});

LocationScreen.navigationOptions = {
  header: null
};

export default LocationScreen;
