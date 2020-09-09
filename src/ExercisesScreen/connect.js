import { connect } from 'react-redux'

import { addExercise } from '../redux/main'


export default connect((state) => ({
	exercises: state.exercises
}), { addExercise })