import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';
import { connect } from 'react-redux'

const DetailsWorkout = ({ navigation, route, name, items, workoutId }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.navigate('list')} title="Все тренировки" />
      ),
      headerRight: () => (
        <Button onPress={() => navigation.navigate('NewExercise', { id: workoutId })} title="Новое упражнение" />
      ),
      headerTitle: () => {
      	return (
      		<View>
      			<Text style={{ textAlign: 'center' }}>{name}</Text>
      		</View>
      	)
      }
    });
  }, [navigation, name, workoutId])


  const showNewSet = (exerciseId) => {
  	navigation.navigate('NewSet', { workoutId, exerciseId })
  }

	const exercisesContent = items.map((item) => {

      const setsContent = item.sets.map((s, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
                <Text>Вес: {s.weight}</Text>
                <Text>Количестков: {s.count === -1 ? 'max' : s.count}</Text>
              </View>
            )            
          })

      return (
        <View key={item.id} style={{  paddingTop: 20, borderBottomColor: '#000',
        borderBottomWidth: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20 }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Button title="Добавить подход" onPress={() => showNewSet(item.id)}/>
          </View>
          {setsContent}
        </View>
      )
    })


  return (
  	<View style={{ flex: 1, paddingTop: 20, marginLeft: 20, marginRight: 0  }}>
    <ScrollView style={{ paddingRight: 20  }}>
      {items.length > 0 ? exercisesContent : <View>
        <Text>В этой тренеровке пока нету упражнений</Text>
      </View>}
    </ScrollView>
    </View>
  )
}


export default connect(
	(state, props) => {
		const { route: { params: { id } } } = props

		const workout = state.workouts.find((x) => x.id === id)
		const name = workout ? workout.name : '-'
		const workoutId = workout ? workout.id : -1 
	    
     let items = []

     if (workout) {
       items = Object.keys(workout.exercises).reduce((acc, key) => {
         const e = state.exercises.find(x => x.id === +key)
         if (e) {
           const newItem = {
             id: +key,
             name: e.name,
             sets: workout.exercises[key]
           }
           return acc.concat(newItem)           
         }

         return acc
       }, [])
     }


		return {
			name,
			items,
			workoutId,
		}
	}
)(DetailsWorkout)