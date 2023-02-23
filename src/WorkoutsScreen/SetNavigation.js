import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SetNavigation = ({setExercises, handlExerciseSelect, exerciseId}) => {
  return (
    <ScrollView horizontal={true} style={styles.container}>
      {setExercises.map((ex) => (
        <TouchableOpacity
          style={exerciseId === ex.id ? styles.itemActive : styles.item}
          key={ex.id}
          onPress={() => handlExerciseSelect(ex)}>
          <Text style={styles.label}>{ex.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const itemStyls = {
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 0,
  marginRight: 15,

  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 12,
  paddingRight: 12,
  borderRadius: 10,
  height: 13 + 8 + 8,
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
    height: 70,
    maxHeight: 70,
    paddingLeft: 15,
  },
  item: {
    ...itemStyls,
    backgroundColor: '#FBFBFB',
  },
  itemActive: {
    ...itemStyls,
    backgroundColor: '#FF7800',
  },
  label: {
    fontSize: 13,
    color: '#2B2B2B',
  },
});

export default SetNavigation;
