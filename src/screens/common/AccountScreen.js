import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';

const AccountScreen = () => {
  const {
    state: {
      user: { email }
    },
    signout
  } = useContext(AuthContext);

  const handleHardbass = () => {
    const url = 'https://www.youtube.com/watch?v=oknqPNIF-nY';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.center}>
      <Text> AccountScreen </Text>
      <Text>{email ? email : ''}</Text>
      <Button title="Logout" onPress={signout} />
      <Button title="HARDCODE HARDBASS" onPress={handleHardbass} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AccountScreen;
