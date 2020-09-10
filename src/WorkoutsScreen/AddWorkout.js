import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { addWorkout, addExerciseToWorkout, addSet } from '../redux/main'

const AddWorkout = ({ navigation, ...props }) => {

  const [name, setName] = useState('')

  const save = async () => {
  	console.log('name ', name)
  	const { id } = await props.addWorkout(name)
    navigation.navigate('details', { id })
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={save} title="Сохранить" />
      ),
    });
  }, [navigation, name]);


  React.useLayoutEffect(() => {
    const now = new Date()

    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth()).padStart(2, '0')
    const yy = String(now.getFullYear()).substr(2, 2)

    setName(`${dd}.${mm}.${yy}`)
  }, [navigation])
  
  return (
    <View style={{ flex: 1, paddingTop: 20, marginLeft: 20, marginRight: 20  }}>
      <Text>Название</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%' }}
        onChangeText={text => setName(text)}
        value={name}
      />
    </View>
  );
}

export default connect(
	null,
	{ addWorkout }
)(AddWorkout)