import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListWorkouts from './ListWorkouts.js'
import DetailsWorkout from './DetailsWorkout'
import AddWorkout from './AddWorkout'
import NewExercise from './NewExercise.js'
import NewSet from './NewSet'


const WorkoutStack = createStackNavigator()


const WorkoutsScreen = ({ navigation }) => {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen name="list" component={ListWorkouts} 
        options={{ 
          title: ''
        }} 
      />
      <WorkoutStack.Screen name="add" component={AddWorkout} options={{ title: 'Новая тренировка' }}/>
      <WorkoutStack.Screen name="details" component={DetailsWorkout} options={{ title: '' }}/>
      <WorkoutStack.Screen name="NewExercise" component={NewExercise} options={{ title: '' }}/>
      <WorkoutStack.Screen name="NewSet" component={NewSet} options={{ title: '' }}/>
    </WorkoutStack.Navigator>
  )
}




export default WorkoutsScreen
