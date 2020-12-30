import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { removeWorkout } from '../redux/main'

const ListWorkouts = ({ navigation, workouts, ...props }) => {
	const showWorkOut = (id) => {
		navigation.navigate('details', { id })
	}

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('add') }
          title="Новая тренировка"
        />
      ),
    });
  }, [navigation])

  

	const trainers = workouts.map((workout) => {
  	const { id, name }= workout
  	return (
  		<TouchableOpacity onPress={() => showWorkOut(workout.id)} style={{ paddingTop: 20, paddingBottom: 0, borderBottomColor: '#000', borderBottomWidth: 2 }}>
  			<View key={id} style={{ height: 50, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
  				<Text>{name}</Text>
          <Button title='удалить' onPress={() => props.removeWorkout(id)}/>
  			</View>
  		</TouchableOpacity>
  	)
	})


  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 0 }}>
      {trainers}
    </View>
	);
}


export default connect(
	(state) => ({
		workouts: state.workouts,
	}),
  { removeWorkout }
)(ListWorkouts)