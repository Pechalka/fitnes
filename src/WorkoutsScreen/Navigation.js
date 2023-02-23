import React, {
  useMemo,
  Fragment,
  useEffect,
  useState,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import YouTube from 'react-native-youtube';

import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  loadResults,
  updateResult,
  updateReps,
  updateWeight,
  updateTime,
  getSets,
  getWorkouts,
} from '../redux/main';
import {useActions} from '../hooks';
import {useSelector} from 'react-redux';

import {useNavigation, useRoute} from '@react-navigation/native';

const Navigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    params: {id, date},
  } = route;
  const selectedDay = date;

  const exercises = useSelector(getWorkouts)[date];
  const exercise = exercises.find((x) => x.id === +id);

  const disabledPrevDisabled = useMemo(() => {
    return exercise.id === exercises[0].id;
  }, [exercise, exercises]);

  const disabledNextDisabled = useMemo(() => {
    return exercise.id === exercises[exercises.length - 1].id;
  }, [exercise, exercises]);

  const preventExercisesId = useMemo(() => {
    for (let n = 0; n < exercises.length; n++) {
      if (n - 1 >= 0 && exercises[n].id === exercise.id) {
        return exercises[n - 1].id;
      }
    }

    return -1;
  }, [exercise, exercises]);

  const nextExercisesId = useMemo(() => {
    for (let n = 0; n < exercises.length; n++) {
      if (n + 1 < exercises.length && exercises[n].id === exercise.id) {
        return exercises[n + 1].id;
      }
    }

    return -1;
  }, [exercise, exercises]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        height: 73,
        backgroundColor: '#2B2B2B',
      }}>
      <Icon
        name="arrowleft"
        size={30}
        style={{margin: 20}}
        color={disabledPrevDisabled ? '#ccc' : '#000'}
        onPress={() => {
          if (disabledPrevDisabled) {
            return;
          }

          navigation.navigate('details', {
            id: preventExercisesId,
            date: selectedDay,
          });
        }}
      />
      <Icon
        name="close"
        size={30}
        style={{margin: 20}}
        onPress={() => {
          navigation.navigate('list');
        }}
      />
      <Icon
        name="arrowright"
        size={30}
        style={{margin: 20}}
        color={disabledNextDisabled ? '#ccc' : '#000'}
        onPress={() => {
          if (disabledNextDisabled) {
            return;
          }

          navigation.navigate('details', {
            id: nextExercisesId,
            date: selectedDay,
          });
        }}
      />
      <MaterialCommunityIconsIcon
        name="clock"
        size={30}
        style={{margin: 20, position: 'absolute', right: 20}}
        onPress={() => {
          navigation.navigate('statistic-details', {
            id: exercise.ExerciseId,
          });
        }}
      />
    </View>
  );
};

export default Navigation;
