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

const StatisticData = ({navigation}) => {
  // const {params} = route;

  const route = useRoute();

  // const a = navigation.getParam('exerciseId');

  // const {params} = route;

  // const [exerciseId, setExerciseId] = useState(
  //   (params && params.exerciseId ? +params.exerciseId : '') || '',
  // );

  const {exercises} = useSelector(getUserStatistic);

  console.log('exercises ', exercises);

  const actions = useActions({loadStatistic}, []);

  React.useEffect(() => {
    console.log('loadStatistic ');
    actions.loadStatistic();
  }, []);

  const rows = Object.entries(exercises).map(([key, item]) => (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={() => navigation.navigate('statistic-details', {id: item.id})}
      key={item.id}>
      <Text style={{fontSize: 15}}>{item.title}</Text>
      <Text style={{fontSize: 15}}>
        {item.max}({item.units})
      </Text>
    </TouchableOpacity>
  ));

  return (
    <ScrollView
      style={{flex: 1, marginLeft: 20, marginRight: 20, marginTop: 20}}>
      {rows.length > 0 ? (
        rows
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Статистики нету</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default StatisticData;
