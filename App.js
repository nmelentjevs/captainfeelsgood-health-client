import React, { useState } from 'react';

import { setNavigator } from './src/navigationRef';
import { Provider as RequestProvider } from './src/context/RequestContext';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as OrderProvider } from './src/context/OrderContext';
import Navigation from './src/navigation';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

const images = [
  require('./assets/images/marker-pink.png'),
  require('./assets/images/marker-gold.png'),
  require('./assets/test/1.jpg'),
  require('./assets/test/2.jpg'),
  require('./assets/test/3.jpg')
];

console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox, AsyncStorage } from 'react-native';
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export default () => {
  const [loading, setLoading] = useState(true);

  const handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app
    Font.loadAsync({
      lato: require('./assets/fonts/Lato-Regular.ttf')
    });

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={handleResourcesAsync}
        onError={error => console.warn(error)}
        onFinish={() => setLoading(false)}
      />
    );
  }
  return (
    <OrderProvider>
      <RequestProvider>
        <AuthProvider>
          <Navigation
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </RequestProvider>
    </OrderProvider>
  );
};
