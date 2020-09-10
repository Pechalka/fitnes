import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux'
import { addWorkout, addExerciseToWorkout, addSet } from '../redux/main'

const NewSet = ({ navigation, title, count, weight, exerciseId, workoutId, ...props }) => {
  const [selectedCount, setSelectedCount] = useState(count);
  const [selectedWeigth, setSelectedWeigth] = useState(weight);

  const save = () => {
    props.addExerciseToWorkout(+workoutId, +selectedCount, +selectedWeigth, +exerciseId)
    navigation.navigate('details', { id: workoutId })
  }

  const handleMax = () => {
    setSelectedCount(-1)
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={save} title="Сохранить" />
      ),
      headerTitle: () => {
        return (
          <View>
            <Text style={{ textAlign: 'center' }}>{title}</Text>
          </View>
        )
      }
    });
  }, [title, selectedCount, selectedWeigth, exerciseId, workoutId])


  const items = Array.from({length: 40}, (_, i) => i + 1).concat([-1]).map((n) => {
    return (
      <Picker.Item label={n === -1 ? 'max' : n+''} value={n} />
    )
  })



  return (
    <View style={{ flex: 1, paddingTop: 20, marginLeft: 20, marginRight: 20  }}>
      <View>
        <Text>Вес</Text>
        <Picker
          selectedValue={selectedWeigth}
          style={{ height: 100, overflow: 'hidden', weight: '50%' }}
          onValueChange={(itemValue, itemIndex) => setSelectedWeigth(itemValue)}
        >
          {items}
        </Picker>
        <Text>Количество</Text>
        <Picker
          selectedValue={selectedCount}
          style={{ height: 100, overflow: 'hidden', weight: '50%' }}
          onValueChange={(itemValue, itemIndex) => setSelectedCount(itemValue)}
        >
          {items}
        </Picker>
        <Button onPress={handleMax} title="max" />
      </View>
    </View>
  )
}

export default connect(
	(state, props) => {
    const { route: { params: { workoutId, exerciseId } } } = props

    // const workout = state.workouts.find((x) => x.id === id)
    // const name = workout ? workout.name : '-'

     const workout = state.workouts.find((x) => x.id === +workoutId)
     const exercises = workout.exercises.filter(x => x.id === +exerciseId)

     const exercise = exercises[exercises.length -1 ]

     const { count = 1, weight = 1  } = exercise

     const e = state.exercises.find(x => x.id === +exerciseId)

    return {
      count,
      weight,
      title: e.name,
      workoutId,
      exerciseId,
    }
  },
	{ addWorkout, addExerciseToWorkout }
)(NewSet)