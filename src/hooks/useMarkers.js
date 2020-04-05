import { AsyncStorage } from 'react-native';
import { useEffect, useState, useRef, useContext } from 'react';
import useSockets from './useSockets';

export default useMarkers = () => {
  const [socket, temp] = useSockets('markers');

  useEffect(() => {
    getMarkers();
    return () => {
      // socket.close();
    };
  }, []);

  const getMarkers = () => {
    socket.emit('get markers');
  };

  const addMarker = async marker => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('add marker', { marker, token });
  };

  const moveMarker = async marker => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('move marker', { marker, token });
  };

  return { temp, addMarker, moveMarker, getMarkers };
};
