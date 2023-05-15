import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

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
  const [search, setSearch] = useState(false);

  // const a = navigation.getParam('exerciseId');

  // const {params} = route;

  // const [exerciseId, setExerciseId] = useState(
  //   (params && params.exerciseId ? +params.exerciseId : '') || '',
  // );

  const {exercises} = useSelector(getUserStatistic);

  const actions = useActions({loadStatistic}, []);

  React.useEffect(() => {
    actions.loadStatistic();
  }, []);

  const searchedItems = useMemo(() => {
    return Object.entries(exercises).filter(([key, item]) => {
      if (!search) {
        return true;
      }

      return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }, [exercises, search]);

  const rows = searchedItems.map(([key, item]) => (
    <TouchableOpacity
      style={{
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={() => navigation.navigate('statistic-details', {id: item.id})}
      key={item.id}>
      <Text style={{fontSize: 14}}>{item.title}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={{flex: 1, marginTop: 60}}>
      <Text
        style={{
          marginLeft: 30,
          fontSize: 24,
        }}>
        Статистика
      </Text>
      <View
        style={{
          marginRight: 55,
          // paddingRight: 55,
          marginLeft: 55,
          marginTop: 30,
          marginBottom: 40,
        }}>
        <TextInput
          style={{
            fontSize: 14,
            backgroundColor: '#A5A5A5',
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
          }}
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginLeft: 30,
          // marginRight: 30,
          paddingRight: 30,
          marginTop: 0,
        }}>
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
    </View>
  );
};

export default StatisticData;
