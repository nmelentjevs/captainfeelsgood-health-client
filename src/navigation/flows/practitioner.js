import MapButton from '../../components/MapButton';
import {
  OrderHistoryScreen,
  AccountScreen,
  ConfirmOrderScreen,
  OrderDetailScreen
} from '../../screens';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import TransitionConfiguration from '../TransitionApp';
import { COLORS } from '../../theme';

const takeOrderFlow = createStackNavigator(
  {
    ConfirmOrder: ConfirmOrderScreen,
    OrderDetails: OrderDetailScreen
  },
  { transitionConfig: TransitionConfiguration }
);

const practitionerFlow = createBottomTabNavigator(
  {
    History: {
      screen: OrderHistoryScreen,
      name: 'History',
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="history" size={24} color={COLORS.black} />
          ) : (
            <MaterialIcons name="history" size={24} color={COLORS.gray} />
          )
      }
    },
    TakeOrder: {
      screen: takeOrderFlow,
      name: 'TakeOrder',
      navigationOptions: {
        tabBarIcon: () => <MapButton />
      }
    },
    Account: {
      screen: AccountScreen,
      name: 'Account',
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialCommunityIcons
              name="account-heart"
              size={24}
              color={COLORS.black}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-heart"
              size={24}
              color={COLORS.gray}
            />
          )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    },
    transitionConfig: TransitionConfiguration
  }
);

export default practitionerFlow;
