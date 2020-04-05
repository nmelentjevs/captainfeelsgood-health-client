import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { ListItem } from 'react-native-elements';

import distanceBetween from '../utils/distanceBetween';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../theme';
import AidCard from './AidCard';
import MultiTapOverlay from './common/MultiTap';
import { navigate } from '../navigationRef';
import OrderDetail from './OrderDetail';
import { Context as SelectedContext } from '../context/SelectedContext';

let { width, height } = Dimensions.get('window');

const OrderList = ({ markers, region }) => {
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
    imagesRefs[index].measure((x, y, width, height, pageX, pageY) => {
      oldPosition.x = pageX;
      oldPosition.y = pageY;
      oldPosition.width = width;
      oldPosition.height = height;

      position.setValue({
        x: pageX,
        y: pageY
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
    setSelectedType({ type: 'box' });
  };

  const closeImage = () => {
    Animated.parallel([
      Animated.timing(position.x, {
        toValue: oldPosition.x + oldPosition.width / 2,
        duration: 300
      }),
      Animated.timing(position.y, {
        toValue: oldPosition.y + oldPosition.height / 2,
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
    setSelectedType({ type: '' });
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

  if (!region.location || !markers) return null;

  return (
    <>
      {/* TODO CLEANUP PLS */}

      <View
        style={{
          height: 100,
          width,
          position: 'absolute',
          bottom: 20,
          zIndex: type ? 1020 : 10
        }}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={
            markers && region
              ? markers.sort(
                  (a, b) =>
                    distanceBetween(a.location.coordinates, region) -
                    distanceBetween(b.location.coordinates, region)
                )
              : null
          }
          renderItem={({ item, index }) => {
            const {
              location: { coordinates }
            } = item;

            const isSelected = item._id === (selected || {})._id;

            return (
              <MultiTapOverlay
                onSingleTap={() => {
                  const selectedInfo = {
                    ...item,
                    longitude: coordinates[0],
                    latitude: coordinates[1],
                    latitudeDelta: 0.075,
                    longitudeDelta: 0.075
                  };
                  if (((type || {}).type || '').length > 0) {
                    return setSelectedState(selectedInfo);
                  } else {
                    if (!isSelected) {
                      return setSelectedState(selectedInfo);
                    } else {
                      return openImage(index);
                    }
                  }
                }}
                onMultiTaps={() => {
                  if (!type) openImage(index);
                  setSelectedType({ type: 'box' });
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <View
                  ref={image => {
                    const newRefs = imagesRefs;
                    newRefs[index] = image;
                    setImagesRefs(newRefs);
                  }}
                  style={{
                    width: isSelected ? 55 : 50,
                    height: isSelected ? 55 : 50,
                    backgroundColor: 'black',
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10
                  }}
                >
                  <Text style={isSelected ? styles.boxSelected : styles.box}>
                    {markers && region
                      ? !isSelected
                        ? distanceBetween(
                            item.location.coordinates,
                            region
                          ).toFixed(1) + ' km'
                        : 'Open'
                      : null}
                  </Text>
                </View>
              </MultiTapOverlay>
            );
          }}
          keyExtractor={item => item._id}
        />
      </View>

      <OrderDetail
        setViewRef={setViewRef}
        active={active}
        closeImage={closeImage}
        animatedContentStyle={animatedContentStyle}
        activeImageStyle={activeImageStyle}
        animatedCrossOpacity={animatedCrossOpacity}
        card={active ? markers[active - 1] : {}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    color: 'white'
  },
  boxSelected: {
    color: 'gold'
  }
});

export default OrderList;
