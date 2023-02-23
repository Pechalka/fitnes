import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  // Button,
  TextInput,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './LoginScreen';
import LoginByEmailScreen from './LoginByEmailScreen';
import LoginByCodeScreen from './LoginByCodeScreen';

const LogintStack = createStackNavigator();

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
          title: 'Вход',
          headerBackTitle: '',
          headerTruncatedBackTitle: '',
        }}
      />
      <LogintStack.Screen
        name="LoginByCodeScreen"
        component={LoginByCodeScreen}
        options={{
          title: 'Получить доступ',
          headerBackTitle: '',
          headerTruncatedBackTitle: '',
        }}
      />
    </LogintStack.Navigator>
  );
};

export default IndexScreen;
