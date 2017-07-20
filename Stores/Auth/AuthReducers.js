import { ADD_API_KEY, ADD_SECRET } from './AuthActions'
import _ from 'lodash'

const initialState = {
	apiKey: '',
	secret: ''
}

function mutateState(state, data) {
	return _.assign({}, state, data)
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_API_KEY:
			return mutateState(state, {
				apiKey: action.apiKey
			})
		case ADD_SECRET:
			return mutateState(state, {
				secret: action.secret
			})
	}
	return state
}