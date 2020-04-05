import { useState, useContext } from 'react';
import backend from '../api/backend';

import Stripe from 'react-native-stripe-api';
import { navigate } from '../navigationRef';

import useMarkers from './useMarkers';
import { Context as OrderContext } from '../context/OrderContext';

const stripeKeys = {
  public: 'pk_test_3x3bgs2Xg7WlpRkQMBPgr4aR00h5VxfydF',
  secret: 'sk_test_rUHVsqvcHMgs6xEfaZQ3OAha005SfpCpvo'
};

const client = new Stripe(stripeKeys.public);

export default usePayment = () => {
  const { addMarker } = useMarkers();

  const { state } = useContext(OrderContext);

  const [paid, setPaid] = useState(false);
  const [error, setError] = useState({ isError: false, message: '' });
  const [loading, setLoading] = useState(false);
  const createPayment = async card => {
    setLoading(true);
    // const { cvc, expiry, number } = card.status;
    // if (cvc === 'valid' && expiry === 'valid' && number === 'valid') {
    //   const token = await client.createToken({
    //     // number: card.values.number,
    //     // exp_month: card.values.expiry.split('/')[0],
    //     // exp_year: card.values.expiry.split('/')[1],
    //     // cvc: card.values.cvc,
    //     // address_zip: '12345'
    const token = await client.createToken({
      number: 4242424242424242,
      exp_month: 2,
      exp_year: 24,
      cvc: 333,
      address_zip: '12345'
    });
    backend
      .post('/payment/charge', {
        token,
        amount: 500
      })
      .then(res => {
        if (res.data.paid) {
          addMarker(state);
          navigate('Tracking');
        } else {
          setError({
            isError: true,
            message: 'Payment not successful. Please try again.'
          });
        }
        setLoading(false);
      })
      .catch(err =>
        setError({
          isError: true,
          message: 'Something went wrong with the payment, please try again'
        })
      );
    // }
  };

  return [paid, error, setError, createPayment, loading];
};
