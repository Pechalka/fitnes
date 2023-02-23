import React, {useState, useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListWorkouts from './ListWorkouts';

const ListWorkoutsStack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <ListWorkoutsStack.Navigator>
      <ListWorkoutsStack.Screen
        name="list"
        component={ListWorkouts}
        options={{
          title: '-',
          headerBackVisible: false,
          headerLeft: () => null,
          // backgroundColor: '#2B2B2B',

          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#2B2B2B',
          },
        }}
      />
    </ListWorkoutsStack.Navigator>
  );
};

export default ProfileScreen;
