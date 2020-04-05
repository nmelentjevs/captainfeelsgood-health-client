import { AccountScreen, AboutScreen } from '../../screens';
import HeartButton from '../../components/HeartButton';
import orderFlow from './order';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TransitionConfiguration from '../TransitionApp';
import { COLORS } from '../../theme';

const menuFlow = createBottomTabNavigator(
  {
    About: {
      screen: AboutScreen,
      name: 'About',
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Feather name="list" size={24} color={COLORS.pink} />
          ) : (
            <Feather name="list" size={24} color={COLORS.gray} />
          )
      }
    },
    Order: {
      screen: orderFlow,
      name: 'Order',
      navigationOptions: {
        tabBarIcon: () => <HeartButton />
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
              color={COLORS.pink}
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

export default menuFlow;
