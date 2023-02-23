import {
  loadResults,
  updateResult,
  updateReps,
  updateWeight,
  updateTime,
  getSets,
  reducer as setsReducer,
} from './userResults';

import {
  loadStatistic,
  getStatisticByExercise,
  getUserStatistic,
  reducer as profileStatisticReducer,
} from './profileStatistic';

import {
  findCode,
  createUser,
  login,
  logout,
  updateUser,
  restoreState,
  getAppState,
  getUser,
  getWorkouts,
  reducer as AppReducer,
} from './app';

export {
  getUserStatistic,
  getStatisticByExercise,
  loadStatistic,
  loadResults,
  getSets,
  updateResult,
  updateReps,
  updateWeight,
  updateTime,
  findCode,
  createUser,
  login,
  logout,
  updateUser,
  restoreState,
  getAppState,
  getUser,
  getWorkouts,
};

import {combineReducers} from 'redux';

export const reducer = combineReducers({
  app: AppReducer,
  profileStatistic: profileStatisticReducer,
  setsReducer,
});
