import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { navigate } from '../navigationRef';

const HeartButton = () => {
  return (
    <View style={{ position: 'absolute', alignItems: 'center' }}>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigate('Pick')}>
          <View>
            <MaterialCommunityIcons name="home-heart" size={35} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
    top: -60,
    shadowColor: COLORS.pink,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFF'
  }
});

export default HeartButton;
