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

import Sets from './Sets';
import SetNavigation from './SetNavigation';
import Navigation from './Navigation';

const DetailsWorkout = ({navigation, route}) => {
  const actions = useActions({loadResults}, []);

  const {
    params: {id, date},
  } = route;

  const exercises = useSelector(getWorkouts)[date];
  const {isLoading} = useSelector(getSets);

  const exercise = exercises.find((x) => x.id === +id);

  const setExercises = exercises.filter(
    (x) =>
      (x.setName !== 'none' && x.setName === exercise.setName) ||
      x.id === exercise.id,
  );

  useEffect(() => {
    actions.loadResults(setExercises, date);
  }, []);

  const [videoId, setVideoId] = useState(exercise.videoId);

  const handlExerciseSelect = (ex) => {
    setVideoId(ex.videoId);
    setExerciseId(ex.id);

    if (dataSourceCords[ex.id] && ref) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[ex.id].y,
        animated: true,
      });
    }
  };

  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        // TODO: FIX ME
        if (ref && dataSourceCords[exercise.id]) {
          ref.scrollTo({
            x: 0,
            y: dataSourceCords[exercise.id].y,
            animated: true,
          });
        }
      }, 1000);
    }
  }, [isLoading]);

  const [exerciseId, setExerciseId] = useState(exercise.id);

  const isMulti = setExercises.length > 1;

  const handelScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // console.log('offsetY ', offsetY);
    // if ()
    for (let key in dataSourceCords) {
      if (dataSourceCords[key]) {
        if (
          offsetY > dataSourceCords[key].y &&
          offsetY <= dataSourceCords[key].y + dataSourceCords[key].height
        ) {
          setExerciseId(+key);
        }
        // console.log('>>> ', offsetY, dataSourceCords[key]);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <YouTube
        videoId={videoId}
        play={false}
        fullscreen
        loop
        style={{alignSelf: 'stretch', height: 300}}
      />
      {isMulti ? (
        <SetNavigation
          setExercises={setExercises}
          handlExerciseSelect={handlExerciseSelect}
          exerciseId={exerciseId}
        />
      ) : null}
      <ScrollView
        ref={(ref) => setRef(ref)}
        onScrollEndDrag={handelScroll}
        style={{
          backgroundColor: '#F5F5F5',
        }}>
        {setExercises.map((ex, index) => (
          <Sets
            key={ex.id}
            exercise={ex}
            onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              dataSourceCords[ex.id] = {
                y: layout.y,
                height: layout.height,
                index,
              };
              setDataSourceCords(dataSourceCords);
            }}
          />
        ))}
      </ScrollView>
      <Navigation />
    </View>
  );
};

export default DetailsWorkout;
