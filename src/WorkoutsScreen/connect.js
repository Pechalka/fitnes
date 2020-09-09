import { connect } from 'react-redux'

import { addWorkout, addExerciseToWorkout, addSet } from '../redux/main'

export default connect((state) => ({
	workouts: state.workouts,
	exercises: state.exercises
}), { addWorkout, addExerciseToWorkout, addSet })