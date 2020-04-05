import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const ResolveAuthScreen = ({ navigation: { navigate } }) => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <View
      style={{ flex: 0.85, justifyContent: 'center', alignItems: 'center' }}
    >
      <ActivityIndicator size="small" color="black" />
    </View>
  );
};

export default ResolveAuthScreen;
