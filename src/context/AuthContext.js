import { AsyncStorage, Keyboard } from 'react-native';
import createDataContext from './createDataContext';
import backend from '../api/backend';
import { navigate } from '../navigationRef';

// import { firebaseConfig } from '../../config';

// import firebase from 'firebase';
// firebase.initializeApp(firebaseConfig);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return {
        errorMessage: '',
        token: action.payload.token,
        user: action.payload.user
      };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { user: {}, token: null, errorMessage: '' };
    case 'get_user':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    const user = await backend.get('/auth/me');
    const { role, isPendingOrder } = user.data.data;
    dispatch({ type: 'signin', payload: { token, user: user.data.data } });
    if (isPendingOrder) {
      navigate('Pick');
    } else {
      if (role === 'user') navigate('Pick');
      if (role === 'practitioner') navigate('TakeOrder');
    }
  } else {
    navigate('Welcome');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({
    type: 'clear_error_message'
  });
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await backend.post('/auth/login', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    const user = await backend.get('/auth/me');
    dispatch({
      type: 'signin',
      payload: { token: response.data.token, user: user.data.data }
    });

    const { role } = user.data.data;
    if (role === 'user') navigate('Pick');
    if (role === 'practitioner') navigate('TakeOrder');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sing in'
    });
  }
};

const signup = dispatch => async ({ email, username, password }) => {
  try {
    const response = await backend.post('/auth/register', {
      email,
      username,
      password
    });
    await AsyncStorage.setItem('token', response.data.token);
    const user = await backend.get('/auth/me');
    dispatch({
      type: 'signin',
      payload: response.data.token,
      user: user.data.data
    });

    navigate('Pick');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });

  navigate('Welcome');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    signout,
    clearErrorMessage,
    tryLocalSignin
  },
  { user: {}, token: null, errorMessage: '' }
);
