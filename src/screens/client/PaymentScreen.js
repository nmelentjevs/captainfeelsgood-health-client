import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import Dialog, {
  SlideAnimation,
  DialogContent
} from 'react-native-popup-dialog';
import { Button } from 'react-native-elements';
import backend from '../../api/backend';
import usePayment from '../../hooks/usePayment';
import { COLORS } from '../../theme';

// Create a Stripe token with new card infos

const PaymentScreen = () => {
  const [card, setCard] = useState({});
  const [paid, error, setError, createPayment, loading] = usePayment();
  return (
    <View style={styles.cardContainer}>
      <CreditCardInput onChange={setCard} />
      <Button
        disabled={loading}
        buttonStyle={styles.button}
        title="Make a payment"
        onPress={() => createPayment(card)}
      />
      <View style={styles.container}>
        <Dialog
          visible={error.isError}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom'
            })
          }
        >
          <DialogContent>
            <Text>{error.message}</Text>
            <Button
              title="Close"
              onPress={() => setError({ isError: false, message: '' })}
            />
          </DialogContent>
        </Dialog>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 40
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.pink,
    borderRadius: 0,
    marginVertical: 10,
    marginHorizontal: 40
  }
});

export default PaymentScreen;
