import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux'
import { addWorkout, addExerciseToWorkout, addSet } from '../redux/main'

const NewExercise = ({ navigation, exercises, name, workoutId, ...props }) => {
  const [selectedValue, setSelectedValue] = useState();
  const [count, setCount] = useState(10)
  const [weight, setWeight] = useState()


  const handleSave = () => {
    props.addExerciseToWorkout(+workoutId, +count, +weight, +selectedValue)
    navigation.navigate('details', { id: workoutId })
  }

  const handleMax = () => {
    setCount('-1')
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={handleSave} title="Сохранить" />
      ),
      headerTitle: () => {
        return (
          <View>
            <Text style={{ textAlign: 'center' }}>{name}</Text>
          </View>
        )
      }
    });
  }, [navigation, name, selectedValue, count, weight, workoutId])

  const items = exercises.map((workout) => {
    return (
      <Picker.Item label={workout.name} value={workout.id} />
    )
  })

  return (
    <View style={{ flex: 1, paddingTop: 20, marginLeft: 20, marginRight: 20  }}>

      <Picker
        selectedValue={selectedValue}
        style={{ height: 200, overflow: 'hidden', paddingBottom: 20 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {items}
      </Picker>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text>Вес</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }}
            onChangeText={text => setWeight(text)}
            value={weight}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Text>Количество</Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }}
            onChangeText={text => setCount(text)}
            value={count}
            keyboardType='numeric'
          />
          <Button onPress={handleMax} title="Max" />
        </View>
      </View>
    </View>
  ); 
}

export default connect(
	(state, props) => {
    const { route: { params: { id } } } = props

    const workout = state.workouts.find((x) => x.id === id)
    const name = workout ? workout.name : '-'

    return {
      exercises: state.exercises,
      name,
      workoutId: id,
    }
  },
	{ addWorkout, addExerciseToWorkout }
)(NewExercise)