import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import { COLORS } from '../../src/theme';
import AidCard from '../../src/components/AidCard';

let { width, height } = Dimensions.get('window');
const images = [
  { id: 1, src: require('./1.jpg') },
  { id: 2, src: require('./2.jpg') },
  { id: 3, src: require('./3.jpg') }
];

const CarouselItem = () => {
  const [carousel, setCarousel] = useState(null);
  const [carouselActive, setCarouselActive] = useState(0);

  const [active, setActive] = useState(null);

  const [viewRef, setViewRef] = useState(null);
  const [imagesRefs, setImagesRefs] = useState([]);

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
      top: position.y
    });
  }, []);

  const renderCarouselItem = ({ index }) => (
    <TouchableWithoutFeedback
      onPress={() => openImage(index)}
      key={images[index].id}
    >
      <Animated.View
        style={{
          height: height > 667 ? height - 160 : height - 100,
          width,
          padding: 15
        }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            right: 0,
            left: 0,
            zIndex: 10,
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 20
            }}
          >
            Click to learn more
          </Text>
        </View>
        <Image
          ref={image => setImagesRefs((imagesRefs[index] = image))}
          source={images[index].src}
          style={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: 'cover',
            borderRadius: 20
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );

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

      setActive(images[index]);

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
  };
  const closeImage = () => {
    Animated.parallel([
      Animated.timing(position.x, {
        toValue: oldPosition.x,
        duration: 300
      }),
      Animated.timing(position.y, {
        toValue: oldPosition.y,
        duration: 250
      }),
      Animated.timing(dimensions.x, {
        toValue: oldPosition.width,
        duration: 250
      }),
      Animated.timing(dimensions.y, {
        toValue: oldPosition.height,
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Carousel
        data={images}
        renderItem={renderCarouselItem}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideScale={1}
        slideStyle={{ width }}
        onSnapToItem={setCarouselActive}
        ref={setCarousel}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={carouselActive}
        containerStyle={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 40
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8
        }}
        dotColor={COLORS.pink}
        inactiveDotColor={COLORS.white}
        inactiveDotOpacity={0.8}
        inactiveDotScale={0.6}
      />
      <AidCard
        setViewRef={setViewRef}
        active={active}
        closeImage={closeImage}
        animatedContentStyle={animatedContentStyle}
        activeImageStyle={activeImageStyle}
        animatedCrossOpacity={animatedCrossOpacity}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CarouselItem;
