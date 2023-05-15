import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  // Button,
  TextInput,
} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './LoginScreen';
import LoginByEmailScreen from './LoginByEmailScreen';
import LoginByCodeScreen from './LoginByCodeScreen';

const LogintStack = createStackNavigator();

const cardStyleInterpolator = ({current, layouts}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [-layouts.screen.width, 0],
          }),
        },
      ],
    },
  };
};

const IndexScreen = ({navigation}) => {
  return (
    <LogintStack.Navigator initialRouteName="login">
      <LogintStack.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <LogintStack.Screen
        name="LoginByEmailScreen"
        component={LoginByEmailScreen}
        options={{
          animation: 'slide_from_right',
          title: 'Вход',
          headerBackTitle: '',
          headerTruncatedBackTitle: '',
          cardStyleInterpolator,
          headerShown: false,
        }}
      />
      <LogintStack.Screen
        name="LoginByCodeScreen"
        component={LoginByCodeScreen}
        options={{
          title: 'Получить доступ3',
          headerBackTitle: '',
          headerTruncatedBackTitle: '',
          // cardStyle: {},
          headerShown: false,
          // presentation: 'modal',
          // animationTypeForReplace: 'push',
          // animation: 'slide_from_right',
        }}
      />
    </LogintStack.Navigator>
  );
};

export default IndexScreen;
