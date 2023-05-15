import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import {useSelector} from 'react-redux';
import {
  getStatisticByExercise,
  getUserStatistic,
  loadStatistic,
} from '../redux/main';
import {useActions} from '../hooks';
import {useFocusEffect} from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack';

import {useNavigation, useRoute} from '@react-navigation/native';

const StatisticDataDetails = ({navigation}) => {
  // const {params} = route;

  const route = useRoute();

  // const a = navigation.getParam('exerciseId');

  console.log('params ', route);

  const {params} = route;

  const [exerciseId, setExerciseId] = useState(params.id);

  const {exercises} = useSelector(getUserStatistic);
  const {title, items} = useSelector(getStatisticByExercise(exerciseId));

  const actions = useActions({loadStatistic}, []);

  React.useEffect(() => {
    actions.loadStatistic();
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      title: exerciseId ? title : 'Статистика',
      headerShown: true,
      headerLeft: (props) => {
        return (
          <HeaderBackButton
            {...props}
            labelVisible={false}
            onPress={() => {
              // setExerciseId('');
              // alert(params.date);
              // navigation.goBack();
              // navigation.setParams({date: null});
              // delete route.params?.date;
              // navigation.dangerouslyGetParent().setParams({date: null});

              //              console.log(' || >> ', navigation.dangerouslyGetParent().setParams({ date: null }));

              props.onPress();
            }}
          />
        );
      },
    });
  }, [navigation, exerciseId]);

  const rows = Object.entries(exercises).map(([key, item]) => (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={() => setExerciseId(key)}
      key={item.id}>
      <Text style={{fontSize: 15}}>{item.title}</Text>
      <Text style={{fontSize: 15}}>
        {item.max}({item.units})
      </Text>
    </TouchableOpacity>
  ));

  return (
    <ScrollView
      style={{
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
      }}>
      {Object.entries(items).map(([key, item]) => (
        <View
          key={key}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginBottom: 20,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 20,
                fontWeight: 'bold',
              }}>
              {item.day}
            </Text>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 20,
                fontWeight: 'bold',
              }}>
              {item.month}
            </Text>
            <Text>{item.dayOfWeek}</Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 12,
                marginTop: 10,
              }}>
              {item.year}
            </Text>
          </View>
          <ScrollView
            persistentScrollbar={true}
            horizontal={true}
            style={{
              backgroundColor: '#fff',
              // flex: 1,
              borderRadius: 10,
              minHeight: 50,
              marginLeft: 20,
              padding: 20,
              // flexWrap: 'wrap',
              // flexDirection: 'column',
            }}>
            <View>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Text
                  style={{
                    fontSize: 20,
                    lineHeight: 20,
                    fontWeight: 'bold',
                    marginRight: 'auto',
                    width: 100,
                  }}>
                  SET
                </Text>
                {item.sets.map((set, n) => (
                  <Text
                    key={n}
                    style={{
                      fontSize: 20,
                      lineHeight: 20,
                      marginRight: 20,
                      width: 50,
                    }}>
                    {set}
                  </Text>
                ))}
              </View>

              {item.showWight && (
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      lineHeight: 20,
                      fontWeight: 'bold',
                      marginRight: 'auto',
                      width: 100,
                    }}>
                    WEIGHT
                  </Text>
                  {item.weights.map((weight, n) => (
                    <Text
                      key={n}
                      style={{
                        fontSize: 20,
                        lineHeight: 20,
                        marginRight: 20,
                        width: 50,
                      }}>
                      {weight}
                    </Text>
                  ))}
                </View>
              )}

              {item.showReps && (
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      lineHeight: 20,
                      fontWeight: 'bold',
                      marginRight: 'auto',
                      width: 100,
                    }}>
                    REPS
                  </Text>
                  {item.reps.map((rep, n) => (
                    <Text
                      key={n}
                      style={{
                        fontSize: 20,
                        lineHeight: 20,
                        marginRight: 20,
                        width: 50,
                      }}>
                      {rep}
                    </Text>
                  ))}
                </View>
              )}

              {item.showTime && (
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      lineHeight: 20,
                      fontWeight: 'bold',
                      marginRight: 'auto',
                      width: 100,
                    }}>
                    TIME
                  </Text>
                  {item.times.map((time, n) => (
                    <Text
                      key={n}
                      style={{
                        fontSize: 20,
                        lineHeight: 20,
                        marginRight: 20,
                        width: 50,
                      }}>
                      {time}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

export default StatisticDataDetails;
