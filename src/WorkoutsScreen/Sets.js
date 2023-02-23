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
  StyleSheet,
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

const Sets = ({exercise, onLayout}) => {
  const actions = useActions(
    {updateResult, updateReps, updateWeight, updateTime},
    [],
  );

  const {exercises, isLoading} = useSelector(getSets);

  const sets = exercises['' + exercise.id] || {};

  if (exercise.exerciseType === 'warm-up') {
    return (
      <View style={{flex: 1, margin: 20}}>
        <Text>{exercise.description}</Text>
      </View>
    );
  }

  if (isLoading) {
    return null;
  }

  return (
    <View onLayout={onLayout}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{exercise.title}</Text>
      </View>
      <View style={styles.container}>
        {exercise.temp ? (
          <Text style={styles.tempLabel}>Темп: {exercise.temp}</Text>
        ) : null}
        <View style={styles.tableHead}>
          <Text style={[styles.thLabel, styles.th]}>Подход</Text>
          {exercise.showWidth ? (
            <Text style={[styles.thLabel, styles.th]}>Вес</Text>
          ) : null}
          {exercise.type === 'time' ? (
            <View style={styles.th}>
              <Text style={styles.thLabel}>Время</Text>
              {exercise.eachSide ? (
                <Text style={styles.eachSideLabel}>кажд.</Text>
              ) : null}
            </View>
          ) : null}
          {exercise.type === 'reps' ? (
            <View style={styles.th}>
              <Text style={styles.thLabel}>Кол-во</Text>
              {exercise.eachSide ? (
                <Text style={styles.eachSideLabel}>кажд.</Text>
              ) : null}
            </View>
          ) : null}
        </View>

        <View>
          {Object.entries(sets).map(([key, data]) => {
            return (
              <View key={key} style={styles.tableBody}>
                <Text style={styles.tdStep}>{key}</Text>
                {exercise.showWidth && (
                  <View style={styles.col}>
                    <TextInput
                      style={styles.textInput}
                      placeholder={'' + exercise.weight}
                      defaultValue={'' + data.weight}
                      keyboardType="numeric"
                      onChangeText={(value) =>
                        actions.updateWeight(value, data, exercise.id)
                      }
                      onBlur={() => actions.updateResult(data, exercise.id)}
                    />
                  </View>
                )}
                {exercise.type === 'time' && (
                  <View style={styles.col}>
                    <TextInput
                      style={styles.textInput}
                      placeholder={'' + exercise.time}
                      defaultValue={'' + data.time}
                      keyboardType="numeric"
                      onChangeText={(value) =>
                        actions.updateTime(value, data, exercise.id)
                      }
                      onBlur={() => actions.updateResult(data, exercise.id)}
                    />
                  </View>
                )}
                {exercise.type === 'reps' && (
                  <View style={styles.col}>
                    <TextInput
                      style={styles.textInput}
                      placeholder={'' + exercise.reps}
                      defaultValue={'' + data.reps}
                      onChangeText={(value) =>
                        actions.updateReps(value, data, exercise.id)
                      }
                      onBlur={() => actions.updateResult(data, exercise.id)}
                      keyboardType="numeric"
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 15,
    color: '#2B2B2B',
  },

  tempLabel: {
    position: 'absolute',
    top: 0,
    left: '50%',
    fontSize: 8,
    color: '#2B2B2B',
  },

  container: {
    backgroundColor: '#FBFBFB',
    borderWidth: 1,
    borderColor: '#FF7800',
    padding: 20,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
  },

  tableHead: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },

  th: {
    width: '33%',
    textAlign: 'center',
    alignItems: 'center',
  },
  thLabel: {
    fontSize: 12,
    color: '#2B2B2B',
  },

  eachSideLabel: {
    fontSize: 8,
    color: '#2B2B2B',
  },

  tableBody: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 18,
  },

  textInput: {
    height: 40,
    borderColor: '#2B2B2B',
    borderWidth: 1,
    width: 70,
    textAlign: 'center',
    borderRadius: 9,
  },

  tdStep: {
    width: '33%',
    textAlign: 'center',
    fontSize: 24,
    color: '#2B2B2B',
  },

  col: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sets;
