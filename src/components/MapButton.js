import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { navigate } from '../navigationRef';

const MapButton = () => {
  return (
    <View style={{ position: 'absolute', alignItems: 'center' }}>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigate('TakeOrder')}>
          <View>
            <MaterialCommunityIcons
              name="home-map-marker"
              size={35}
              color="#FFF"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
    top: -60,
    shadowColor: COLORS.black,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFF'
  }
});

export default MapButton;
