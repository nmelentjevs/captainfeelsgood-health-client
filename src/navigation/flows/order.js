import { createStackNavigator } from 'react-navigation-stack';
import TransitionConfiguration from '../TransitionApp';

import {
  PickScreen,
  PackageInfoScreen,
  LocationScreen,
  PaymentScreen,
  ConfirmationScreen,
  TrackingScreen
} from '../../screens';

const orderFlow = createStackNavigator(
  {
    Pick: PickScreen,
    PickInfo: PackageInfoScreen,
    Location: LocationScreen,
    Payment: PaymentScreen,
    Confirmation: ConfirmationScreen,
    Tracking: TrackingScreen
  },
  { transitionConfig: TransitionConfiguration }
);

export default orderFlow;
