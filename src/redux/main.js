
import { AsyncStorage } from 'react-native';

const defaultState = {
	exercises: [
		{id: 1, name: 'Тяга шт к подб'},
		{id: 2, name: 'Жим в тр-ре'},
		{id: 3, name: 'Жим в смите'},
		{id: 4, name: 'Кросовер стоя'},
		{id: 5, name: 'Отжимания от лавки'},
		{id: 6, name: 'Тяга блока снизу'},
		{id: 7, name: 'Тяга шт в накл'},
		{id: 8, name: 'Тяга блока за голову'},
		{id: 9, name: 'Подем на биз Молоток'},
		{id: 10, name: 'Гиперэстенция'},
	],
	workouts: [],
}

const initState = {
	exercises: [],
	workouts: [],
}

export const reducer = (state = initState, action) => {
	switch(action.type) {
		case 'ADD_EXERCISE': {
			const { payload } = action
			return {
				...state,
				exercises: state.exercises.concat(payload)
			}
		}
		case 'ADD_WORKOUT': {
			const { payload } = action
			return {
				...state,
				workouts: state.workouts.concat(payload)
			}
		}
		case 'REMOVE_WORKOUT': {
			const { id } = action.payload
			return {
				...state,
				workouts: state.workouts.filter((x) => x.id !== id)
			}	
		}

		case 'REMOVE_EXERCISE': {
			const { id } = action.payload
			return {
				...state,
				exercises: state.exercises.filter((x) => x.id !== id)
			}
		}
		case 'START_EXERCISE_IN_WORKOUT': {
			const { workoutId, exerciseId } = action.payload
			const _workouts = state.workouts.map(w => {
				if (w.id === workoutId) {
					return {
						...w,
						exercises: {
							...w.exercises,
							[exerciseId]: []
						}
					}
				}

				return w
			})

			return {
				...state,
				workouts: _workouts
			}
		}
		case 'ADD_EXERCISE_TO_WORKOUT': {
			const { workoutId, id, count , weight } = action.payload

			const _workouts = state.workouts.map(w => {
				if (w.id === workoutId) {
					const sets = w.exercises[id].concat({ id, count, weight })
					return {
						...w,
						exercises: { ...w.exercises, [id]: sets }
					}
				}

				return w
			})


			return {
				...state,
				workouts: _workouts
			}
		}
		case 'RESTORE_STATE': {
			const newState = {
				...state,
				...action.payload
			}

			return newState
		}
		default:
			return state
	}
}


// const s = {
// 	workouts: [
// 		{
// 			id: 1,
// 			name: '21.12.2021',
// 			exercise: {
// 				'1':  [{
// 						count: 2,
// 						widght: 12
// 				}]
// 			}
// 		}
// 	]
// }

export const saveState = () => async (dispatch, getState) => {
	const state = getState()
	await AsyncStorage.setItem(
      '@data',
      JSON.stringify(state)
    );

    console.log('>> ', JSON.stringify(state))
}

// AsyncStorage.clear()

export const restoreState = () => async (dispatch, getState) => {
	const ss = await AsyncStorage.getItem('@data');
	console.log('>> ', JSON.parse(ss))

	// const { exercises, workouts } = ss
	const payload = ss ? JSON.parse(ss) : defaultState
	dispatch({
		type: 'RESTORE_STATE',
		payload 
	})
}


export const addExercise = (name) => (dispatch) => {
	dispatch({
		type: 'ADD_EXERCISE',
		payload: {
			name,
			id: new Date().getTime()
		}
	})
	dispatch(saveState())
}

export const removeWorkout = (id) => (dispatch) => {
	dispatch({
		type: 'REMOVE_WORKOUT',
		payload: {
			id
		}
	})
	dispatch(saveState())
}

export const removeExercise = (id) => (dispatch) => {
	dispatch({
		type: 'REMOVE_EXERCISE',
		payload: {
			id
		}
	})
	dispatch(saveState())
}

export const addWorkout = (name) => (dispatch) => {
	const newWorkout = {
		name,
		id: new Date().getTime(),
		exercises: {}
	}
	dispatch({
		type: 'ADD_WORKOUT',
		payload: newWorkout
	})
	dispatch(saveState())

	return newWorkout
}

export const startExerciseInWorkout = (workoutId, exerciseId) => (dispatch) => {
	dispatch({
		type: 'START_EXERCISE_IN_WORKOUT',
		payload: { workoutId, exerciseId }
	})
	dispatch(saveState())
}

export const addExerciseToWorkout = (workoutId, count, weight, id) => (dispatch)  => {
	dispatch({
		type: 'ADD_EXERCISE_TO_WORKOUT',
		payload: { workoutId, id, count , weight }
	})
	dispatch(saveState())
}









