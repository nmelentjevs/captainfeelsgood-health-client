import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { navigate } from '../navigationRef';
import { Context as OrderContext } from '../context/OrderContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme';

const AidCard = ({
  setViewRef,
  active,
  closeImage,
  animatedContentStyle,
  activeImageStyle,
  animatedCrossOpacity,
  card
}) => {
  const { choosePackage } = useContext(OrderContext);

  const handleCardPick = () => {
    choosePackage({ cardId: card.id });
  };

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents={active ? 'auto' : 'none'}
    >
      <View style={{ flex: 1, zIndex: 1001 }} ref={setViewRef}>
        <TouchableWithoutFeedback onPress={closeImage}>
          <Animated.Image
            source={active ? active.src : null}
            style={[
              {
                resizeMode: 'cover',
                top: 0,
                left: 0,
                height: null,
                width: null
              },
              activeImageStyle
            ]}
          ></Animated.Image>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={closeImage}>
          <Animated.View
            style={[
              { position: 'absolute', top: 30, right: 30 },
              animatedCrossOpacity
            ]}
          >
            <Ionicons name="ios-close" size={45} color="white" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      <Animated.View
        style={[
          {
            flex: 1,
            zIndex: 1000,
            backgroundColor: 'white',
            padding: 20,
            paddingTop: 50
          },
          animatedContentStyle
        ]}
      >
        <Text style={{ fontSize: 24, paddingBottom: 10 }}>
          Package #{card.id}
        </Text>
        <Text style={{ color: COLORS.black, fontSize: 12 }}>Includes:</Text>
        <Text>
          Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur. Nostrud
          sint officia consectetur eu pariatur laboris est velit. Laborum non
          cupidatat qui ut sit dolore proident.
        </Text>
        <Button
          buttonStyle={styles.button}
          title="Order package"
          onPress={handleCardPick}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: COLORS.pink,
    borderRadius: 6,
    marginVertical: 10,
    alignSelf: 'flex-end',
    width: 150
  }
});

export default AidCard;
