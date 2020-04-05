import { useEffect, useState, useRef, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import useSockets from './useSockets';
import { AsyncStorage } from 'react-native';
import backend from '../api/backend';
import { navigate } from '../navigationRef';

// import io from 'socket.io-client';

export default useOrders = () => {
  const {
    state: { user }
  } = useContext(AuthContext);
  const [socket, temp] = useSockets('orders');
  const [isConfirmedOrder, setIsConfirmedOrder] = useState(false);
  const [isFinishedOrder, setIsFinishedOrder] = useState(false);

  useEffect(() => {
    getOrders();
    return () => {};
  }, []);

  socket.on('confirmed order', ({ userId }) => {
    // If that user and order not already confirmed
    if (user._id === userId && !isConfirmedOrder) setIsConfirmedOrder(true);
  });

  socket.on('finished order', ({ userId }) => {
    if (user._id === userId && !isFinishedOrder) {
      setIsFinishedOrder(true);
      setTimeout(() => {
        navigate('Pick', { shouldRefresh: true });
      }, 500);
    }
  });

  const getOrders = async () => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('get orders', { token });
    return true;
  };

  const confirmOrder = ({ marker }) => {
    socket.emit('confirm order', { marker, userId: user._id });
  };

  const saveNotificationToken = async token => {
    if (!user.expoToken) {
      await backend
        .post('/auth/expo_token', { token })
        .then(() => console.log('Token saved'))
        .catch(err => console.log(err));
    }
  };

  const finishOrder = async order => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('finish order', { order, token });
  };

  return {
    temp,
    getOrders,
    confirmOrder,
    isConfirmedOrder,
    isFinishedOrder,
    saveNotificationToken,
    finishOrder
  };
};
