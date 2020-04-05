import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import {
  Block,
  Button,
  Text,
  Input,
  Divider,
  Card,
  Badge
} from '../components/common';
import { theme, mocks } from '../constants';

const { width, height } = Dimensions.get('window');

const ProductScreen = ({ product, navigation: { navigate } }) => {
  const renderGallery = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Image
            source={item}
            resizeMode="contain"
            style={{ width, height: height / 2.8 }}
          />
        )}
      />
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {renderGallery()}
      <Block style={styles.product}>
        <Text h2 bold>
          {product.name}
        </Text>
        <Block row flex={false} margin={[theme.sizes.base, 0]}>
          {product.tags.map(tag => (
            <Text key={`tag-${tag}`} caption gray style={styles.tag}>
              {tag}
            </Text>
          ))}
        </Block>
        <Text gray light height={22}>
          {product.description}
        </Text>

        <Divider margin={[theme.sizes.padding * 0.9, 0]} />

        <Block>
          <Text semibold>Gallery</Text>
          <Block row margin={[theme.sizes.padding * 0.9, 0]}>
            {product.images.slice(1, 3).map((image, index) => (
              <Image
                source={image}
                style={styles.image}
                key={`gallery-${index}`}
              />
            ))}
            <Block
              flex={false}
              card
              center
              middle
              color="rgba(197,204,214,0.2)"
              style={styles.more}
            >
              <Text gray>+{product.images.slice(3).length}</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

ProductScreen.defaultProps = {
  product: mocks.products[0]
};

ProductScreen.navigationOptions = {
  headerRight: (
    <Button onPress={() => {}}>
      <Entypo name="dots-three-horizontal" color={theme.colors.gray} />
    </Button>
  )
};

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base / 1.2,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.5
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: theme.sizes.base
  },
  more: {
    width: 55,
    height: 55
  }
});

export default ProductScreen;
