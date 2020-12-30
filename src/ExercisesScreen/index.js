import React, { useState, useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import List from './List'

const ExercisesStack = createStackNavigator()

const ExercisesScreen = () => {
  return (
    <ExercisesStack.Navigator>
      <ExercisesStack.Screen name='list' component={List} options={{ title: 'список тренировак' }}/>
    </ExercisesStack.Navigator>
  )
}

export default ExercisesScreen





