import { useState, useEffect } from 'react';
import axios from 'axios';
import { google } from '../../config';
import backend from '../api/backend';
import distanceBetween from '../utils/distanceBetween';

import {
  Accuracy,
  requestPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location';

export default callback => {
  const [region, setRegion] = useState({ latitude: null, longitude: null });

  const [err, setErr] = useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const reverseGeoCode = async coords => {
    let response;
    try {
      response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${google.key}`
      );
    } catch (error) {
      console.log(error);
      return '';
    }
    return response.data.results[0].formatted_address;
  };

  const getCurrentLocation = async () => {
    try {
      await requestPermissionsAsync();
      const location = await getCurrentPositionAsync();
      const street = await reverseGeoCode({ ...location.coords });

      const result = {
        street,
        location: {
          ...location.coords,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        }
      };
      setRegion(result);

      return result;
    } catch (e) {
      setErr(e);
    }
  };

  //maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

  return { region, setRegion, err, getCurrentLocation };
};
