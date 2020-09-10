
const initState = {
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
	workouts: [
		{
			id: 1,
			name: '01.09.20',
			exercises: [
				{
					id:6,
					count: -1,
					weight: 23
				},
				{
					id:6,
					count: -1,
					weight: 23
				},
				{
					id:6,
					count: -1,
					weight: 23
				},
				{
					id:7,
					count: -1,
					weight: 15
				},
				{
					id:7,
					count: -1,
					weight: 15
				},
				{
					id:7,
					count: -1,
					weight: 15
				},
				{
					id:8,
					count: -1,
					weight: 30
				},
				{
					id:8,
					count: -1,
					weight: 30
				},
				{
					id:8,
					count: -1,
					weight: 30
				},
				{
					id:9,
					count: -1,
					weight: 5
				},
				{
					id:9,
					count: -1,
					weight: 5
				},
				{
					id:9,
					count: -1,
					weight: 5
				},
				{
					id:10,
					count: -1,
					weight: 2.5
				},
				{
					id:10,
					count: -1,
					weight: 2.5
				},
				{
					id:10,
					count: -1,
					weight: 2.5
				}

			]
		},
		{
			id: 3,
			name: '08.09.20',
			exercises: [
				{
					id:2,
					count: 1,
					weight: 25
				},
				{
					id:3,
					count: 1,
					weight: 1
				},
				{
					id:4,
					count: 20,
					weight: 13
				},
				{
					id:4,
					count: 20,
					weight: 13
				},
				{
					id:1,
					count: -1,
					weight: 15
				},
				{
					id:1,
					count: -1,
					weight: 15
				},
				{
					id:1,
					count: -1,
					weight: 15
				},
				{
					id:5,
					count: -1,
					weight: 0
				},
				{
					id:5,
					count: -1,
					weight: 0
				},
				{
					id:5,
					count: -1,
					weight: 0
				}
			]
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




