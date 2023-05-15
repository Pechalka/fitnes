import http from '../http';
import {debounce} from 'lodash';

const initState = {
  isLoading: false,
  sets: {},
  exercises: {},
  ExerciseId: -1,
  date: '',
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOAD_RESULTS_START': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'LOAD_RESULTS': {
      const {sets, ExerciseId, date, exercises} = action.payload;
      return {
        ...state,
        sets,
        ExerciseId,
        date,
        exercises,
        isLoading: false,
      };
    }

    case 'UPDATE_REPS': {
      const {reps, set, id} = action.payload;

      return {
        ...state,
        exercises: {
          ...state.exercises,
          [id]: {
            ...state.exercises[id],
            [set]: {
              ...state.exercises[id][set],
              reps,
            },
          },
        },
      };
    }
    case 'UPDATE_WIDTH': {
      const {weight, set, id} = action.payload;

      return {
        ...state,
        exercises: {
          ...state.exercises,
          [id]: {
            ...state.exercises[id],
            [set]: {
              ...state.exercises[id][set],
              weight,
            },
          },
        },
      };
    }
    case 'UPDATE_TIME': {
      const {time, set, id} = action.payload;

      return {
        ...state,
        exercises: {
          ...state.exercises,
          [id]: {
            ...state.exercises[id],
            [set]: {
              ...state.exercises[id][set],
              time,
            },
          },
        },
      };
    }

    case 'UPDATE_RESULT': {
      const {item, id} = action.payload;
      const newState = {
        ...state,
        exercises: {
          ...state.exercises,
          [id]: {
            ...state.exercises[id],
            [item.set]: {
              ...state.exercises[id][item.set],
              id: item.id,
            },
          },
        },
      };

      return newState;
    }
    default:
      return state;
  }
};

import {getUser} from './app';

export const getSets = (state) => state.setsReducer;

export const loadResults = (exercises, date) => (dispatch, getState) => {
  dispatch({
    type: 'LOAD_RESULTS_START',
  });
  const state = getState();
  const UserId = getUser(state).id;

  const requests = exercises.map((x) =>
    http.get(
      `/api/userResult?date=${date}&ExerciseId=${x.ExerciseId}&UserId=${UserId}`,
    ),
  );

  Promise.all(requests).then((data) => {
    console.log('>> ', data);

    let z = -1;
    const r = data.reduce((rr, results) => {
      const resultSet = results.reduce((acc, item) => {
        return {
          ...acc,
          [+item.set]: item,
        };
      }, {});

      z++;
      const sets = {};
      for (let n = 1; n <= exercises[z].sets; n++) {
        sets[+n] = resultSet[+n]
          ? {...resultSet[+n], ExerciseId: exercises[z].ExerciseId}
          : {
              set: n,
              reps: '',
              weight: '',
              time: '',
              type: exercises[z].type,
              ExerciseId: exercises[z].ExerciseId,
            };
      }
      return {
        ...rr,
        [exercises[z].id]: sets,
      };
    }, {});

    console.log('>> ', r);
    dispatch({
      type: 'LOAD_RESULTS',
      payload: {
        // ExerciseId: exercise.ExerciseId,
        date,
        // sets,
        exercises: r,
      },
    });
  });

  // const url =
  //   '/api/userResult?date=' +
  //   date +
  //   '&ExerciseId=' +
  //   exercise.ExerciseId +
  //   '&UserId=' +
  //   UserId;

  // http.get(url).then((results) => {
  //   const resultSet = results.reduce((acc, item) => {
  //     return {
  //       ...acc,
  //       [+item.set]: item,
  //     };
  //   }, {});

  //   const sets = {};
  //   for (let n = 1; n <= exercise.sets; n++) {
  //     sets[+n] = resultSet[+n]
  //       ? resultSet[+n]
  //       : {set: n, reps: '', weight: '', time: '', type: exercise.type};
  //   }

  //   dispatch({
  //     type: 'LOAD_RESULTS',
  //     payload: {
  //       ExerciseId: exercise.ExerciseId,
  //       date,
  //       sets,
  //     },
  //   });
  // });
};

//debounce

// const debouncedUpdateResult = (UserId, date, item, ExerciseId, dispatch) =>
//   debounce((UserId, date, item, ExerciseId, dispatch) => {
//     http.put('/api/userResult/' + item.id, {
//       reps: +item.reps,
//       weight: +item.weight,
//       time: +item.time,
//       ExerciseId: +item.ExerciseId,
//       UserId,
//       date,
//     });
//   }, 200);

export const updateResult = (item, ExerciseId) => (dispatch, getState) => {
  const state = getState();
  const {date} = state.setsReducer;
  const UserId = getUser(state).id;

  console.log('START', item);

  if (!item.id) {
    http
      .post('/api/userResult', {
        set: item.set,
        reps: +item.reps,
        weight: +item.weight,
        time: +item.time,
        type: item.type,
        date,
        ExerciseId: +item.ExerciseId,
        UserId,
      })
      .then((newItem) => {
        console.log('END CREATE', newItem);
        dispatch({
          type: 'UPDATE_RESULT',
          payload: {item: newItem, id: ExerciseId},
        });
      });
  } else {
    // debouncedUpdateResult(UserId, date, item, ExerciseId, dispatch);
    http
      .put('/api/userResult/' + item.id, {
        reps: +item.reps,
        weight: +item.weight,
        time: +item.time,
        ExerciseId: +item.ExerciseId,
        UserId,
        date,
      })
      .then((newItem) => {
        console.log('END UPDATE', item.id, newItem, item);
      });
    // .then((newItem) => {
    //   dispatch({
    //     type: 'UPDATE_RESULT',
    //     payload: {item: newItem, id: newItem.id},
    //   });
    // });
  }
};

export const updateTime = (value, item, id) => (dispatch) => {
  dispatch({
    type: 'UPDATE_TIME',
    payload: {
      set: item.set,
      time: value,
      id,
    },
  });
};

export const updateWeight = (value, item, id) => (dispatch) => {
  dispatch({
    type: 'UPDATE_WIDTH',
    payload: {
      set: item.set,
      weight: value,
      id,
    },
  });
};
export const updateReps = (value, item, id) => (dispatch) => {
  dispatch({
    type: 'UPDATE_REPS',
    payload: {
      set: item.set,
      reps: value,
      id,
    },
  });
};
