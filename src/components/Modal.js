import React, { useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';

const CustomModal = ({ show, setShow }) => {
  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={show}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                setShow(!show);
              }}
            >
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setShow(true);
        }}
      >
        <Text>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CustomModal;
