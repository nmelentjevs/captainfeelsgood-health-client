import React, { useContext } from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  MaterialIcons,
  Feather,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { COLORS } from '../theme';
import TransitionConfiguration from './TransitionApp';
import ChoiceContainer from './pending';

import {
  LoginScreen,
  SignupScreen,
  ResolveAuthScreen,
  IndexScreen,
  WelcomeScreen,
  AccountScreen,
  AboutScreen,
  LocationScreen,
  PaymentScreen,
  ConfirmationScreen,
  OrderStatusScreen,
  ConfirmOrderScreen,
  OrderHistoryScreen,
  PackageInfoScreen
} from '../screens';
import { theme } from '../constants';
import HeartButton from '../components/HeartButton';
import MapButton from '../components/MapButton';

const orderFlow = createStackNavigator(
  {
    Pick: {
      screen: ChoiceContainer,
      navigationOptions: {
        header: null
      }
    },
    PickInfo: PackageInfoScreen,
    Location: LocationScreen,
    Payment: PaymentScreen,
    Confirmation: ConfirmationScreen
  },
  { transitionConfig: TransitionConfiguration }
);

const menuFlow = createBottomTabNavigator(
  {
    About: {
      screen: AboutScreen,
      name: 'About',
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          focused ? (
            <Feather name="list" size={30} color={COLORS.pink} />
          ) : (
            <Feather name="list" size={30} color={COLORS.gray} />
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
              size={30}
              color={COLORS.pink}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-heart"
              size={30}
              color={COLORS.gray}
            />
          )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      transitionConfig: TransitionConfiguration
    }
  }
);

const takeOrderFlow = createStackNavigator({
  ConfirmOrder: ConfirmOrderScreen
});

const practitionerFlow = createBottomTabNavigator(
  {
    History: {
      screen: OrderHistoryScreen,
      name: 'History',
      navigationOptions: {
        tabBarIcon: ({ focused }) =>
          focused ? (
            <MaterialIcons name="list" size={30} color={COLORS.black} />
          ) : (
            <MaterialIcons name="list" size={30} color={COLORS.gray} />
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
              size={30}
              color={COLORS.black}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-heart"
              size={30}
              color={COLORS.gray}
            />
          )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      transitionConfig: TransitionConfiguration
    },
    header: null
  }
);

const screens = createStackNavigator(
  {
    resolveAuth: ResolveAuthScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    Index: IndexScreen,
    Main: {
      screen: menuFlow,
      name: 'Main',
      navigationOptions: {
        header: null
      }
    },
    Practitioner: {
      screen: practitionerFlow,
      name: 'Practitioner',
      navigationOptions: {
        header: null
      }
    },
    Welcome: WelcomeScreen,
    Tracking: { screen: OrderStatusScreen, name: 'Tracking' }
  },
  {
    initialRouteName: 'resolveAuth',
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: 'transparent',
        elevation: 0 // for android
      },
      headerBackImage: (
        <Image source={require('../../assets/icons/back.png')} />
      ),
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: 'center',
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: 'center',
        paddingRight: theme.sizes.base
      }
    }
  }
);

export default createAppContainer(screens);
