const initState = {
  isAppLoading: true,
  initialRouteName: 'Login',
  user: null,
  calendarExercises: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'APP_LOADED': {
      const {startScreen} = action.payload;

      return {
        ...state,
        isAppLoading: false,
        initialRouteName: startScreen,
      };
    }
    case 'LOAD_CALENDAR': {
      const {calendarExercises, user} = action.payload;

      return {
        ...state,
        calendarExercises: calendarExercises,
        user,
      };
    }

    case 'USER_UPDATED': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export const getAppState = (state) => {
  //isAppLoading initialRouteName
  return state.app;
};

export const getUser = (state) => state.app.user;

const sort = {
  'warm-up': 1,
  main: 2,
  conditions: 3,
};

export const getWorkouts = (state) => {
  const {calendarExercises} = state.app;
  const calendar = calendarExercises.reduce((acc, item) => {
    if (acc[item.date]) {
      acc[item.date] = [...acc[item.date], item];
    } else {
      acc[item.date] = [item];
    }

    return acc;
  }, {});

  const calendarSorted = Object.entries(calendar).reduce(
    (acc, [key, value]) => {
      value.sort((a, b) => {
        // console.log('>> ', a, b);

        if (sort[a.exerciseType] == sort[b.exerciseType]) {
          if (a.setName == b.setName) {
            return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
          }
          return a.setName > b.setName ? 1 : -1;
        }
        return sort[a.exerciseType] > sort[b.exerciseType] ? 1 : -1;
      });
      return {
        ...acc,
        [key]: value,
      };
    },
    {},
  );

  return calendarSorted;
};

import http from '../http';
import {AsyncStorage} from 'react-native';

export const findCode = (code) => (dispatch) => {
  return http.post('/api/findCode', {
    code,
  });
};

export const createUser = (email, password, _code) => (dispatch) => {
  return http
    .post('/api/users', {
      email,
      password,
      firstName: '',
      lastName: '',
      phone: '',
      gender: 'male',
      CalendarId: _code.CalendarId,
    })
    .then((user) => {
      return http.put('/api/codes/' + _code.id, {
        status: 'created',
        UserId: +user.id,
      });
    });
};

export const login = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    http
      .post('/api/login', {email, password})
      .then((data) => {
        if (data.success) {
          const {user} = data;
          AsyncStorage.setItem(
            'auth',
            JSON.stringify({
              calendar_id: user.CalendarId,
              user_id: user.id,
            }),
          ).then(() => {
            Promise.all([
              // http.get('/api/calendar/' + user.CalendarId),
              http.get('/api/calendarExercises?CalendarId=' + user.CalendarId),
              http.get('/api/users/' + user.id),
            ]).then(([calendarExercises, userData]) => {
              dispatch({
                type: 'LOAD_CALENDAR',
                payload: {
                  calendarExercises,
                  user: userData,
                },
              });
              resolve();
            });
          });
        } else {
          reject('неверный логин или пароль');
        }
      })
      .catch(() => {
        reject('неверный логин или пароль');
      });
  });
};

export const logout = (navigation) => (dispatch) => {
  AsyncStorage.removeItem('auth').then(() => {
    navigation.navigate('login');
  });
};

export const updateUser = (id, _data) => (dispatch) => {
  let status;

  return http
    .put('/api/users/' + id, _data, false)
    .then((response) => {
      status = response.status;
      return response.json();
    })
    .then((data) => {
      if (status !== 200) {
        return Promise.reject(data);
      } else {
        dispatch({
          type: 'USER_UPDATED',
          payload: _data,
        });
      }
    });
};

export const restoreState = () => (dispatch) => {
  AsyncStorage.getItem('auth')
    .then((authStr) => {
      if (authStr) {
        const auth = JSON.parse(authStr);
        Promise.all([
          http.get('/api/calendarExercises?CalendarId=' + auth.calendar_id),
          http.get('/api/users/' + auth.user_id),
        ]).then(([calendarExercises, user]) => {
          dispatch({
            type: 'LOAD_CALENDAR',
            payload: {
              calendarExercises,
              user,
            },
          });
          dispatch({
            type: 'APP_LOADED',
            payload: {
              startScreen: 'Workouts',
            },
          });
        });
      } else {
        dispatch({
          type: 'APP_LOADED',
          payload: {
            startScreen: 'login',
          },
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: 'APP_LOADED',
        payload: {
          startScreen: 'login',
        },
      });
    });
};
