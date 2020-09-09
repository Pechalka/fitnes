import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import { reducer } from './main'


const configureStore =() => {
	const store = createStore(reducer, applyMiddleware(thunk))
	return store
}

export default configureStore