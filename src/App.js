import React from 'react';

import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import configureStore from './redux/configureStore';
import {restoreState, getAppState} from './redux/main';
import {Provider} from 'react-redux';

import WorkoutsScreen from './WorkoutsScreen';

const store = configureStore();

const RootStack = createStackNavigator();

import DetailsWorkout from './WorkoutsScreen/DetailsWorkout';
import LoginScreen from './Login/index.js';

import {useSelector} from 'react-redux';

const AppScreen = () => {
  const {isAppLoading, initialRouteName} = useSelector(getAppState);

  if (isAppLoading) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
        }}>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" initialRouteName={initialRouteName}>
        <RootStack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Workouts"
          component={WorkoutsScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
            headerBackVisible: false,
          }}
        />
        <RootStack.Screen
          name="details"
          component={DetailsWorkout}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppScreen />
    </Provider>
  );
}

store.dispatch(restoreState());
