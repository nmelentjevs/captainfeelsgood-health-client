import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import Map from '../components/Map';
import { Context as AuthContext } from '../context/AuthContext';
import useMarkers from '../hooks/useMarkers';

const IndexScreen = () => {
  const { signout } = useContext(AuthContext);
  const [markers, addMarker] = useMarkers();

  useEffect(() => {}, []);

  return (
    <>
      <Map markers={markers} />
      <Button title="Add Marker" onPress={signout} />
    </>
  );
};

IndexScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({});

export default IndexScreen;
