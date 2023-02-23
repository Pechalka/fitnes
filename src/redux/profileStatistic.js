import http from '../http';

const initState = {
  isLoading: false,
  exercises: {},
  userResult: [],
  allexercises: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'PROFILE_STATISTIC_LOADED': {
      const {exercises, userResult, allexercises} = action.payload;
      return {
        ...state,
        exercises,
        userResult,
        allexercises,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

import moment from 'moment';

import {getUser} from './app';

export const getUserStatistic = (state) => state.profileStatistic;

export const getStatisticByExercise = (exerciseId) => (state) => {
  const {userResult, allexercises} = state.profileStatistic;

  const exercise = allexercises.find((x) => x.id === +exerciseId);

  if (!exercise) {
    return {
      title: 'Статистика',
      items: {},
    };
  }

  const results = userResult.filter((x) => x.ExerciseId === +exerciseId);

  const gropByDate = results.reduce((acc, item) => {
    if (!acc[item.date]) {
      return {
        ...acc,
        [item.date]: [item],
      };
    }

    return {
      ...acc,
      [item.date]: [...acc[item.date], item],
    };
  }, {});

  const items = Object.entries(gropByDate).reduce((acc, [key, arr]) => {
    return {
      ...acc,
      [key]: {
        date: key,
        day: moment(key, 'YYYY-MM-DD').format('DD'),
        month: moment(key, 'YYYY-MM-DD').format('MMM'),
        dayOfWeek: moment(key, 'YYYY-MM-DD').format('ddd'),
        year: moment(key, 'YYYY-MM-DD').format('YYYY'),
        sets: Array.from({length: arr.length}, (_, i) => i + 1),
        showTime: arr[0].type === 'time',
        showReps: arr[0].type === 'reps',
        showWight: arr[0].weight > 0,
        reps: arr.map((x) => x.reps),
        weights: arr.map((x) => x.weight),
        times: arr.map((x) => x.time),
        results: arr
          .map((x) => {
            if (x.type === 'time') {
              return x.time + 'sec';
            }
            if (x.weight > 0) {
              return x.reps + ' x ' + x.weight + 'kg';
            }
            return x.reps + 'x';
          })
          .join(', '),
      },
    };
  }, {});

  return {
    title: exercise.title,
    items: items,
  };
};

export const loadStatistic = (exercise, date) => (dispatch, getState) => {
  console.log('loadStatistic ');

  const state = getState();
  const UserId = getUser(state).id;

  Promise.all([
    http.get('/api/exercises'),
    http.get('/api/userResult?UserId=' + UserId),
  ]).then(([exercises, userResult]) => {
    const exercisesMap = exercises.reduce((acc, item) => {
      return {
        ...acc,
        [item.id]: item,
      };
    }, {});

    const result = userResult.reduce((acc, item) => {
      const max = userResult
        .filter((x) => x.ExerciseId === item.ExerciseId)
        .reduce((a, b) => {
          if (b.type === 'time') {
            return a > b.time ? a : b.time;
          } else {
            return b.weight > 0
              ? a > b.weight
                ? a
                : b.weight
              : a > b.pres
              ? a
              : b.reps;
          }
        }, 0);

      const units =
        item.type === 'time' ? 'сек' : item.weight > 0 ? 'кг' : 'раз';

      return {
        ...acc,
        [item.ExerciseId]: {
          id: item.ExerciseId,
          title: exercisesMap[item.ExerciseId].title,
          units,
          max,
        },
      };
    }, {});

    dispatch({
      type: 'PROFILE_STATISTIC_LOADED',
      payload: {
        exercises: result,
        userResult,
        allexercises: exercises,
      },
    });
  });
};
