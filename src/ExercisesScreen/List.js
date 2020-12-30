import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import connect from './connect'

import { Button as CustomButton } from '../Components'


const ExercisesListScreen = (props) => {
  const { addExercise, removeExercise, exercises, navigation } = props;

  const [name, setName] = useState('')

  const [showAdd, setShowAdd] = useState(false)


  useLayoutEffect(() => {
    if (showAdd) {
      navigation.setOptions({
        title: '',
        headerLeft: () => (
          <Button
            onPress={cancel}
            title="Отмена"
          />
        ),
        headerRight: () => (
          <Button
            onPress={saveExercise}
            title="Сохранить"
          />
        ),
      });

    } else {
      navigation.setOptions({
        title: '',
        headerLeft: null,
        headerRight: () => (
          <Button
            onPress={showAddScreen}
            title="Новое упражнение"
          />
        ),
      });

    }
  }, [navigation, showAdd, name])

  const showAddScreen = () => {
    setShowAdd(true)
  }

  const saveExercise = useCallback(() => {
    if (!name) return

    setShowAdd(false)
    addExercise(name)
    setName('')
  }, [name])

  const cancel = () => {
    setShowAdd(false)
    setName('')
  }

  if (showAdd) {
    
    return (
      <View style={{ flex: 1,  marginLeft: 20, marginRight: 20  }}>
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
      <View key={exercise.id} style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text>{exercise.name}</Text>
        <Button title='удалить' onPress={() => removeExercise(exercise.id)}/>
      </View>
    )
  })


  return (
    <View style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
      <ScrollView style={{  flex: 1 , width: '100%', marginTop: 20 }}>
        {exercisesConent}
      </ScrollView>
    </View>
  );

}

export default connect(ExercisesListScreen)







