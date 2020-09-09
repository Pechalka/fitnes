import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Picker } from 'react-native';
import connect from './connect'

import { Button } from '../Components'


function WorkoutsScreen(props) {
  const { workouts, addWorkout, exercises, addExerciseToWorkout } = props

  const [route, setRoute] = useState('list')
  const [name, setName] = useState('')
  const [count, setCount] = useState(10)
  const [weight, setWeight] = useState()
  
  const [exercisesId, setExercisesId] = useState()

  const [id, setId] = useState()
  const [selectedValue, setSelectedValue] = useState();
  const [selectedCount, setSelectedCount] = useState(1);
  const [selectedWeigth, setSelectedWeigth] = useState(1);


  const showAddScreen = () => {
    setRoute('newWorkout')
    const now = new Date()

    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth()).padStart(2, '0')
    const yy = String(now.getFullYear()).substr(2, 2)

    setName(`${dd}.${mm}.${yy}`)
  }

  const showWorkOut = (id) => {
    setId(id)
    setRoute('workout')
  }

  const save = async () => {
    const { id } = await addWorkout(name)
    setId(id)
    setRoute('workout')
    setName('')
  }

  const cancel = () => {
    setRoute('list')
    setName('')
  }

  const showNewExercise = () => {
    setRoute('newExercise')
  }


  const addExercise = () => {
    setRoute('workout')
    addExerciseToWorkout(+id, +count, +weight, +selectedValue)
  }

  const saveSet = () => {
    setRoute('workout')
    addExerciseToWorkout(+id, +selectedCount, +selectedWeigth, +exercisesId)
  }

  const showNewSet = (exercisesId) => {
    setRoute('newSet')
    setExercisesId(exercisesId)

    const workout = workouts.find((x) => x.id === id)

    if (workout.exercises.length == 0) {
      setSelectedCount(1)
      setSelectedWeigth(1)
    } else {
      const e = workout.exercises[workout.exercises.length -1]
      setSelectedCount(e.count)
      setSelectedWeigth(e.weight)
    }

  }

  if (route === 'newSet') {
    const e = exercises.find(x => x.id === +exercisesId)
    // const workout = workouts.find((x) => x.id === id)

    const items = Array.from({length: 40}, (_, i) => i + 1).map((n) => {
      return (
        <Picker.Item label={n+''} value={n} />
      )
    })

    return (
      <View style={{ flex: 1, paddingTop: 100, marginLeft: 20, marginRight: 20  }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
          <Button onPress={() => setRoute('workout')} label='Назад'/>        
          <Button onPress={saveSet} label='Сохранить'/>
        </View>

        <Text>{e ? e.name : '-'}</Text>
        <View>
          <Picker
            selectedValue={selectedWeigth}
            style={{ height: 200, overflow: 'hidden', weight: '50%' }}
            onValueChange={(itemValue, itemIndex) => setSelectedWeigth(itemValue)}
          >
            {items}
          </Picker>
          <Picker
            selectedValue={selectedCount}
            style={{ height: 200, overflow: 'hidden', weight: '50%' }}
            onValueChange={(itemValue, itemIndex) => setSelectedCount(itemValue)}
          >
            {items}
          </Picker>
        </View>
      </View>
    )
  }

  if (route === 'newExercise') {
    const workout = workouts.find((x) => x.id === id)
    const { name } = workout

    const items = exercises.map((workout) => {
      return (
        <Picker.Item label={workout.name} value={workout.id} />
      )
    })

    return (
      <View style={{ flex: 1, paddingTop: 100, marginLeft: 20, marginRight: 20  }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
          <Button onPress={() => setRoute('workout')} label='Назад'/>
          <Button onPress={addExercise} label='Добавить'/>
        </View>

        <Text style={{ fontSize: 20, textAlign: 'center'}}>{name}</Text>

        <Picker
          selectedValue={selectedValue}
          style={{ height: 200, overflow: 'hidden', paddingBottom: 20 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {items}
        </Picker>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>Количество</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }}
              onChangeText={text => setCount(text)}
              value={count}
              keyboardType='numeric'
            />
          </View>
          <View>
            <Text>Вес</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 100 }}
              onChangeText={text => setWeight(text)}
              value={weight}
              keyboardType='numeric'
            />
          </View>
        </View>
      </View>
    ); 
  }

  if (route === 'newWorkout') {
    return (
      <View style={{ flex: 1, paddingTop: 100, marginLeft: 20, marginRight: 20  }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
          <Button onPress={save} label='Сохранить'/>
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

  if (route === 'workout') {
    const workout = workouts.find((x) => x.id === id)
    const { name } = workout

    const groups = {}

    workout.exercises.forEach((set) => {
      if (!groups[set.id]) {
        const name = exercises.find(x => x.id === set.id).name
        groups[set.id] = {
          id: set.id,
          name,
          sets: [
            set
          ]
        }        
      } else {
        groups[set.id].sets = groups[set.id].sets.concat(set)
      }
    })


    const exercisesContent = Object.keys(groups).map((id) => {
      const item = groups[id]

      const setsContent = item.sets.map((s, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
                <Text>Количестков: {s.count}</Text>
                <Text>Вес: {s.weight}</Text>
              </View>
            )            
          })

      return (
        <View key={id} style={{  paddingTop: 20, borderBottomColor: '#000',
        borderBottomWidth: 2 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Button label="+" onPress={() => showNewSet(item.id)}/>
          </View>
          {setsContent}
        </View>
      )
    })

    return (
      <View style={{ flex: 1, paddingTop: 100, marginLeft: 20, marginRight: 20   }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
          <Button onPress={cancel} label='Назад'/>
          <Button onPress={showNewExercise} label='Новое упражнение'/>
        </View>

        <Text style={{ fontSize: 20, textAlign: 'center'}}>{name}</Text>
        {exercisesContent}
      </View>
    ); 
  }

  const trainers = workouts.map((workout) => {
    const { id, name }= workout
    return <TouchableOpacity onPress={() => showWorkOut(workout.id)}><View key={id} style={{ height: 50 }}><Text>{name}</Text></View></TouchableOpacity>
  })

  return (
    <View style={{ flex: 1, marginTop: 100, marginLeft: 20, marginRight: 20 }}>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <Button onPress={showAddScreen} label='Новая тренировка' />
      </View>
      <ScrollView style={{  flex: 1 , width: '100%' }}>
        {trainers}
      </ScrollView>
    </View>
  );
}

export default connect(WorkoutsScreen)