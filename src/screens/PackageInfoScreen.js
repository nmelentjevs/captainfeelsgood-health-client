import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PackageInfoScreen = ({ navigation: { getParam } }) => {
  return (
    <View>
      <Text> Package Info #{getParam('cardId')} </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PackageInfoScreen;
