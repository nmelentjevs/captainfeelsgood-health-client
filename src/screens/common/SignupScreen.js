import React, { useState, useContext } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Alert
} from 'react-native';

import { Context as AuthContext } from '../../context/AuthContext';
import { Block, Button, Text, Input } from '../../components/common';
import { theme } from '../../constants';

const SignupScreen = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);

  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  const handleSignup = () => {
    Keyboard.dismiss();
    setLoading(true);

    let errors = [];

    // check Login with api
    if (!email) errors.push('email');

    if (!username) errors.push('username');

    if (!password) errors.push('password');

    signup({ email, password, username });

    if (!errors.length) {
      Alert.alert(
        'Success!',
        'Your account has been created',
        [
          {
            text: 'Continue',
            onPress: () => {
              navigate('Browse');
            }
          }
        ],
        { cancelable: false }
      );
    }

    setLoading(false);
    setErrors(errors);
  };

  return (
    <KeyboardAvoidingView style={styles.signup} behavior="padding">
      <Block padding={[0, theme.sizes.padding * 1.2]}>
        <Text h1 bold>
          Sign Up
        </Text>
        <Block middle>
          <Input
            email
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={setEmail}
          />
          <Input
            label="Username"
            error={hasErrors('username')}
            style={[styles.input, hasErrors('username')]}
            defaultValue={username}
            onChangeText={setUsername}
          />
          <Input
            secure
            label="Password"
            error={hasErrors('password')}
            style={[styles.input, hasErrors('password')]}
            defaultValue={password}
            onChangeText={setPassword}
          />
          <Button gradient onPress={handleSignup}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Sign Up
              </Text>
            )}
          </Button>
          <Button onPress={() => navigate('Login')}>
            <Text gray center style={{ textDecorationLine: 'underline' }}>
              Back to Login
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  signup: { flex: 1, justifyContent: 'center' },
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

export default SignupScreen;
