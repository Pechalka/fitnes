import { connect } from 'react-redux'

import { addExercise, removeExercise } from '../redux/main'


export default connect((state) => ({
	exercises: state.exercises
}), { addExercise, removeExercise })