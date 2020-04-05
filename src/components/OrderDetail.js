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
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { Context as SelectedContext } from '../context/SelectedContext';
import useOrders from '../hooks/useOrders';

//
// TODO
// EXTRACT ALL ANIMATION LOGIN TO SEPARATE HOOK
// FROM ORDERLIST AND MAP COMPONENTS AS WELL
//

const OrderDetail = ({
  setViewRef,
  active,
  closeImage,
  animatedContentStyle,
  activeImageStyle,
  animatedCrossOpacity
}) => {
  const {
    state: { selected, type }
  } = useContext(SelectedContext);

  const { confirmOrder } = useOrders();

  const handleOrderConfirm = () => {
    if (selected) confirmOrder({ marker: selected });
    setTimeout(() => {
      navigate('History', { shouldRefresh: true });
    }, 100);
    closeImage();
  };

  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        zIndex: 999
      }}
      pointerEvents={active ? 'auto' : 'none'}
    >
      <View style={{ flex: 1, zIndex: 1001 }} ref={setViewRef}>
        <TouchableWithoutFeedback onPress={closeImage}>
          <Animated.View
            style={[
              {
                top: 0,
                left: 0,
                height: null,
                width: null
              },
              activeImageStyle
            ]}
          ></Animated.View>
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
            flex: 3,
            zIndex: 1000,
            backgroundColor: 'white',
            padding: 20,
            paddingTop: 50
          },
          animatedContentStyle
        ]}
      >
        <View>
          <Text style={{ fontSize: 24, paddingBottom: 10 }}>
            {selected ? `Package #${selected._id}` : null}
          </Text>
          <Text style={{ color: COLORS.black, fontSize: 12 }}>Includes:</Text>
          <Text>
            Eiusmod consectetur cupidatat dolor Lorem excepteur excepteur.
            Nostrud sint officia consectetur eu pariatur laboris est velit.
            Laborum non cupidatat qui ut sit dolore proident.
          </Text>
          {selected && !selected.completed ? (
            <Button
              buttonStyle={styles.button}
              title="Confirm Order"
              onPress={handleOrderConfirm}
            />
          ) : null}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 0,
    marginVertical: 10,
    alignSelf: 'flex-end',
    width: 150
  }
});

export default OrderDetail;
