
const initState = {
	exercises: [
		{id: 1, name: 'Жим штанги'},
		{id: 2, name: 'Упражнение 1'},
		{id: 3, name: 'Упражнение 2'},
		{id: 4, name: 'Упражнение 3'},
		{id: 5, name: 'Упражнение 4'}
	],
	workouts: [
		{
			id: 2,
			name: '10.07.20',
			exercises: [
				{
					id:1,
					count: 3,
					weight: 10
				}
			]
		},
		{
			id: 3,
			name: '12.07.20',
			exercises: []
		}
	],
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
		case 'ADD_EXERCISE_TO_WORKOUT': {
			const { workoutId, id, count , weight } = action.payload

			// console.log(' _workouts >> ', action)

			const _workouts = state.workouts.map(w => {
				if (w.id === workoutId) {
					return {
						...w,
						exercises: w.exercises.concat({ id, count , weight})
					}
				}

				return w
			})


			return {
				...state,
				workouts: _workouts
			}
		}
		default:
			return state
	}
}



export const addExercise = (name) => (dispatch) => {
	dispatch({
		type: 'ADD_EXERCISE',
		payload: {
			name,
			id: new Date().getTime()
		}
	})
}


export const addWorkout = (name) => (dispatch) => {
	const newWorkout = {
		name,
		id: new Date().getTime(),
		exercises: []
	}
	dispatch({
		type: 'ADD_WORKOUT',
		payload: newWorkout
	})

	return newWorkout
}

export const addExerciseToWorkout = (workoutId, count, weight, id) => (dispatch)  => {
	console.log('xx ', workoutId)
	dispatch({
		type: 'ADD_EXERCISE_TO_WORKOUT',
		payload: { workoutId, id, count , weight }
	})
}

export const addSet = (workoutId, count, weight, id) => (dispatch) => {
	// dispatch({
	// 	type: 'ADD_EXERCISE_TO_WORKOUT',
	// 	payload: { workoutId, id, count , weight }
	// })
}




