import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { PickScreen, OrderStatusScreen } from '../screens';

const ChoiceContainer = () => {
  const {
    state: { user }
  } = useContext(AuthContext);

  console.log(user.isPendingOrder);

  return user.isPendingOrder ? <OrderStatusScreen /> : <PickScreen />;
};

export default ChoiceContainer;
