import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Map from '../../components/Map';
import OrderList from '../../components/OrderList';
import useLocation from '../../hooks/useLocation';
import useMarkers from '../../hooks/useMarkers';
import { Provider as SelectProvider } from '../../context/SelectedContext';
import Switch from '../../components/common/Switch';

const ConfirmOrderScreen = ({ navigation: { addListener } }) => {
  const { region, setRegion, getCurrentLocation } = useLocation();
  const { temp, getMarkers } = useMarkers('markers');
  // View state
  const [mapView, setMapView] = useState(true);

  useEffect(() => {
    addListener('didFocus', getMarkers);
  }, []);

  if (!region.location || !temp)
    return <ActivityIndicator size="small" color="black" />;

  return (
    <SelectProvider>
      {/* TODO LIST SWITCH VIEW */}
      {/* <View
        style={{
          position: 'absolute',
          top: 20,
          backgroundColor: 'transparent',
          left: 0,
          right: 0,
          zIndex: 1000
        }}
      >
        <Switch value={mapView} onValueChange={setMapView} />
      </View> */}
      {mapView ? (
        <>
          <Map region={region} markers={temp} setRegion={setRegion} />
          <OrderList markers={temp} region={region} />
        </>
      ) : (
        <Text>Ok</Text>
      )}
    </SelectProvider>
  );
};

ConfirmOrderScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ConfirmOrderScreen;
