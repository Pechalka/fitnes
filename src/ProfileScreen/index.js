import React, {useState, useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from './Profile';

const ProfileStack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="details"
        component={Profile}
        options={{
          title: 'Профиль',
          headerBackVisible: false,
          headerLeft: () => null,
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileScreen;
