import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import connect from './connect'

import { Button } from '../Components'


const ExercisesScreen = (props) => {
  const { addExercise, exercises } = props;

  const [name, setName] = useState('')

  const [showAdd, setShowAdd] = useState(false)

  const showAddScreen = () => {
    setShowAdd(true)
  }

  const saveExercise = () => {
    setShowAdd(false)
    setName('')
    addExercise(name)
  }

  const cancel = () => {
    setShowAdd(false)
    setName('')
  }

  if (showAdd) {
    return (
      <View style={{ flex: 1, paddingTop: 100, marginLeft: 20, marginRight: 20  }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
          <Button onPress={saveExercise} label='Сохранить'/>
          <Button onPress={cancel} label='Отмена'/>        
        </View>

        <Text>Название</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%' }}
          onChangeText={text => setName(text)}
          value={name}
        />
      </View>
    );    
  }

  const exercisesConent = exercises.map((exercise) => {
    return (
      <View key={exercise.id}>
        <Text>{exercise.name}</Text>
      </View>
    )
  })

  return (
    <View style={{ flex: 1, paddingTop: 100, marginLeft: 20, marginRight: 20 }}>
      <View style={{ flexDirection: 'row'}}>
        <Button onPress={showAddScreen} label='Добавить упражнение' />
      </View>
      <ScrollView style={{  flex: 1 , width: '100%', marginTop: 20 }}>
        {exercisesConent}
      </ScrollView>
    </View>
  );

}

export default connect(ExercisesScreen)