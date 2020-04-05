import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import { google } from '../../config';
import useDebounce from '../hooks/useDebounce';
import useLocation from '../hooks/useLocation';
import useMarkers from '../hooks/useMarkers';
import { Context as OrderContext } from '../context/OrderContext';

import { COLORS } from '../theme';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }
};

const autocompleteAddress = async query => {
  const addresses = await axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${google.key}&input=${query}`
  );
  // console.log(addresses.data);
  return addresses.data.predictions;
};

const AddressForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // State and setter for search results
  const [results, setResults] = useState([]);
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { region, getCurrentLocation } = useLocation();
  const { setAddress } = useContext(OrderContext);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      autocompleteAddress(debouncedSearchTerm).then(results => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      if (region.street) {
        if (searchTerm) {
          setSearchTerm(region.street);
          setResults([{ description: region.street }]);
        }
      }
    }
  }, [debouncedSearchTerm]);

  const handleCurrentLocation = async () => {
    const result = await getCurrentLocation();
    setSearchTerm(result.street);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ marginTop: 75, marginHorizontal: 40 }}>
        <Input
          placeholder="Search address"
          onChangeText={setSearchTerm}
          value={searchTerm}
          autoCorrect={false}
          autoCapitalize="none"
          inputContainerStyle={{ marginBottom: 10 }}
        />
        <Button
          title="Use Current Location"
          onPress={handleCurrentLocation}
          buttonStyle={styles.button}
        />
        {results ? (
          <FlatList
            keyExtractor={item => JSON.stringify(item.description)}
            data={results}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.street}
                onPress={() => setAddress(item.description)}
              >
                <Text style={styles.street}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  street: {
    padding: 10,
    backgroundColor: COLORS.pink,
    color: 'white',
    marginBottom: 2.5
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.pink,
    borderRadius: 0,
    marginBottom: 10
  }
});

export default AddressForm;
