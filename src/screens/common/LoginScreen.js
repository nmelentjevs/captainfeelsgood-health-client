import React, { useState, useContext } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Block, Button, Text, Input } from '../../components/common';
import { Context as AuthContext } from '../../context/AuthContext';
import * as Google from 'expo-google-app-auth';

import { theme } from '../../constants';
import validateMail from '../../utils/validateMail';
import { google } from '../../../config';

const LoginScreen = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { signin } = useContext(AuthContext);

  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  const handleLogin = () => {
    Keyboard.dismiss();
    setLoading(true);

    let errors = [];

    if (!email || !validateMail(email)) {
      errors.push('email');
    }
    if (!password) {
      errors.push('password');
    }

    signin({ email, password });

    if (!errors.length) {
      navigate('Login');
    }

    setLoading(false);
    setErrors(errors);
  };

  const googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        behavior: 'web',
        iosClientId: google.authClientID,
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        navigate('resolveAuth');
        return result.accessToken;
      } else {
        alert('Failed to sing you in');
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <Block padding={[0, theme.sizes.padding * 1.2]}>
        <Text h1 bold>
          Login
        </Text>
        <Block middle>
          <Input
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={setEmail}
          />
          <Input
            secure
            label="Password"
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            defaultValue={password}
            onChangeText={setPassword}
          />
          <Button gradient onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login
              </Text>
            )}
          </Button>
          <Button gradient onPress={googleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Login with Google
              </Text>
            )}
          </Button>
          <Button onPress={() => navigate('Forgot')}>
            <Text gray center style={{ textDecorationLine: 'underline' }}>
              Forgot your password?
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});

export default LoginScreen;
