import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { Context as OrderContext } from '../../context/OrderContext';
import { Button, Input } from 'react-native-elements';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

const ConfirmationScreen = ({ navigation: { navigate } }) => {
  const { state, addNote } = useContext(OrderContext);
  const [note, setNote] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text style={styles.right}>Please check details:</Text>
      <Text style={styles.text}>
        <Entypo name="dot-single" size={15} />
        Package #{state.chosenPackage}{' '}
      </Text>
      <Text style={styles.text}>
        <Entypo name="dot-single" size={15} />
        {state.address}{' '}
      </Text>
      <Input
        placeholder="Anything we have to know?"
        label="Notes"
        value={note}
        onChangeText={setNote}
        labelStyle={{ color: 'black', marginLeft: 25 }}
        inputContainerStyle={{ marginHorizontal: 40 }}
      />
      <Button
        buttonStyle={styles.button}
        title="Confirm"
        onPress={() => addNote(note)}
      ></Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  right: {
    fontSize: 35,
    marginBottom: 25,
    fontFamily: 'lato'
  },
  text: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginHorizontal: 40,
    marginBottom: 20
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 0,
    width: '100%'
  }
});

export default ConfirmationScreen;
