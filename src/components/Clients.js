import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import useMarkers from '../hooks/useMarkers';
import * as theme from '../theme';
const { height, width } = Dimensions.get('screen');

const Clients = () => {
  const { markers } = useMarkers();
  const renderClient = item => {
    return (
      <TouchableWithoutFeedback
        key={`client-${JSON.stringify(item.location)}`}
        // onPress={() => this.setState({ active: item.id })}
      >
        <View style={[styles.client, styles.shadow]}>
          <Text>{item._id}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const renderClients = () => (
    <ScrollView
      scrollEnabled
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToAlignment="center"
      // contentInset={{ top: 0, left: 24, bottom: 0, right: 0 }}
      style={styles.clients}
    >
      {markers.map(client => renderClient(client))}
    </ScrollView>
  );
  return <View>{renderClients()}</View>;
};

const styles = StyleSheet.create({
  clients: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.SIZES.base * 2
  },
  client: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.white,
    borderRadius: 6,
    padding: theme.SIZES.base,
    marginHorizontal: theme.SIZES.base * 2,
    width: width - 24 * 2
  }
});

export default Clients;
