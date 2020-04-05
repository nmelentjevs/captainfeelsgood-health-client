import React, { useEffect, useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  FlatList
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { google } from '../../config';

import * as theme from '../theme';
import axios from 'axios';
import Markers from './Markers';
import mapStyle from '../constants/mapStyle';
import { Context as SelectedContext } from '../context/SelectedContext';
import OrderDetail from './OrderDetail';
import { navigate } from '../navigationRef';

import distanceBetween from '../utils/distanceBetween';
import MultiTapOverlay from './common/MultiTap';

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

const googleKey = google.key;

const Map = ({ region, setRegion, markers }) => {
  // MAP
  // TODO BRING BACK
  // if (!region.location) {
  //   return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  // }

  // MARKERS
  const {
    state: { selected, type },
    setSelectedType,
    setSelectedState
  } = useContext(SelectedContext);

  // Animation refs
  const [viewRef, setViewRef] = useState(null);
  const [imagesRefs, setImagesRefs] = useState([]);

  // Animation state
  const [active, setActive] = useState(null);
  const [oldPosition, setOldPosition] = useState({});
  const [position, setPosition] = useState(new Animated.ValueXY());
  const [dimensions, setDimensions] = useState(new Animated.ValueXY());
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [activeImageStyle, setActiveImageStyle] = useState(null);

  useEffect(() => {
    setActiveImageStyle({
      width: dimensions.x,
      height: dimensions.y,
      left: position.x,
      top: position.y,
      position: 'absolute',
      backgroundColor: 'black'
    });
  }, [markers]);

  const openImage = index => {
    if (imagesRefs) {
      imagesRefs[index].measure((x, y, width, height, pageX, pageY) => {
        oldPosition.x = width / 2;
        oldPosition.y = height / 2;
        oldPosition.width = width;
        oldPosition.height = height;

        position.setValue({
          x: WIDTH / 2,
          y: HEIGHT / 2 - 50
        });

        dimensions.setValue({
          x: width,
          y: height
        });
        setActive(index + 1);
        viewRef.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
          Animated.parallel([
            Animated.timing(position.x, {
              toValue: dPageX,
              duration: 300
            }),
            Animated.timing(position.y, {
              toValue: dPageY,
              duration: 300
            }),
            Animated.timing(dimensions.x, {
              toValue: dWidth,
              duration: 300
            }),
            Animated.timing(dimensions.y, {
              toValue: dHeight,
              duration: 300
            }),
            Animated.timing(animation, {
              toValue: 1,
              duration: 300
            })
          ]).start();
        });
      });
    }
  };

  const closeImage = () => {
    setSelectedType({ type: '' });
    Animated.parallel([
      Animated.timing(position.x, {
        toValue: WIDTH / 2,
        duration: 300
      }),
      Animated.timing(position.y, {
        toValue: HEIGHT / 2 - 50,
        duration: 250
      }),
      Animated.timing(dimensions.x, {
        toValue: 0,
        duration: 250
      }),
      Animated.timing(dimensions.y, {
        toValue: 0,
        duration: 250
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 250
      })
    ]).start(() => {
      setActive(null);
    });
  };

  const animatedContentY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 0]
  });

  const animatedContentOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 1]
  });

  const animatedContentStyle = {
    opacity: animatedContentOpacity,
    transform: [
      {
        translateY: animatedContentY
      }
    ]
  };

  const animatedCrossOpacity = {
    opacity: animation
  };

  const checkSelected = (marker, selected) => {
    if (selected) {
      return (
        marker.location.coordinates[0] === selected.longitude &&
        marker.location.coordinates[1] === selected.latitude
      );
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        showsCompass
        showsUserLocation
        rotateEnabled={false}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={selected || region.location}
        region={selected || region.location}
        customMapStyle={mapStyle}
      >
        {/* <Markers
          markers={markers}
          selected={selected}
          setSelected={setSelected}
        /> */}
        {markers
          ? markers.map((marker, index) => {
              const coordinates = {
                longitude: marker.location.coordinates[0],
                latitude: marker.location.coordinates[1],
                latitudeDelta: 0.075,
                longitudeDelta: 0.075
              };

              const isSelected = checkSelected(marker, selected);

              return (
                <Marker
                  key={index}
                  coordinate={coordinates}
                  // title="ok"
                  // description="ok"
                  onPress={() => {
                    openImage(index);
                    setSelectedType({ type: 'marker' });
                    setSelectedState({ ...coordinates, ...marker });
                  }}
                  style={{
                    zIndex: isSelected ? 100 : 1
                  }}
                >
                  <View
                    ref={image => {
                      const newRefs = imagesRefs;
                      newRefs[index] = image;
                      setImagesRefs(newRefs);
                    }}
                    style={{
                      width: 60,
                      height: 30,
                      borderRadius: 50,
                      backgroundColor: !isSelected ? 'gray' : 'black',
                      borderColor: !isSelected ? 'white' : 'gold',
                      borderWidth: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row'
                    }}
                  >
                    <Text style={{ color: 'white' }}>17:55</Text>
                  </View>
                </Marker>
              );
            })
          : null}
      </MapView>
      <OrderDetail
        setViewRef={setViewRef}
        active={active}
        closeImage={closeImage}
        animatedContentStyle={animatedContentStyle}
        activeImageStyle={activeImageStyle}
        animatedCrossOpacity={animatedCrossOpacity}
        card={active ? markers[active - 1] : {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.white
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.base * 2,
    paddingTop: theme.SIZES.base * 2.5,
    paddingBottom: theme.SIZES.base * 1.5
  },
  headerTitle: {
    color: theme.COLORS.gray
  },
  headerLocation: {
    fontSize: theme.SIZES.font,
    fontWeight: '500',
    paddingVertical: theme.SIZES.base / 3
  },
  map: {
    flex: 3,
    zIndex: 1
  }
});

export default Map;
