import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'

import TabBar from './TabBar'
import WorkoutsScreen from './WorkoutsScreen'
import ExercisesScreen from './ExercisesScreen'


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
