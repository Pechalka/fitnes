import React, { useState } from 'react';

import { View, Text, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';


import configureStore from './redux/configureStore'
import { restoreState } from './redux/main'
import { Provider } from 'react-redux'

import TabBar from './TabBar'

import ExercisesScreen from './ExercisesScreen'
import WorkoutsScreen from './WorkoutsScreen'


const Tab = createBottomTabNavigator();
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Workouts" component={WorkoutsScreen} options={{ title: 'Тренировки' }}/>
        <Tab.Screen name="Exercises" component={ExercisesScreen} options={{ title: 'Упражнения' }} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

store.dispatch(restoreState())
