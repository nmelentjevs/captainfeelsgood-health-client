import createDataContext from './createDataContext';

const screens = ['Pick', 'Location', 'Payment', 'Confirmation'];
import { navigate } from '../navigationRef';

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'choose_package':
      return { ...state, chosenPackage: action.payload };
    case 'set_location':
      return { ...state, address: action.payload };
    case 'add_note':
      return { ...state, note: action.payload };
    default:
      return state;
  }
};

const choosePackage = dispatch => ({ cardId }) => {
  dispatch({ type: 'choose_package', payload: cardId });
  // navigate('Location');
  navigate('Location');
};

const setAddress = dispatch => address => {
  dispatch({ type: 'set_location', payload: address });
  navigate('Confirmation');
};

const addNote = dispatch => note => {
  dispatch({ type: 'add_note', payload: note });
  navigate('Payment');
};

export const { Context, Provider } = createDataContext(
  orderReducer,
  { setAddress, choosePackage, addNote },
  { chosenPackage: {}, address: '', note: '' }
);
