// Vendor
import { ADD_API_KEY, ADD_SECRET, ADD_CLIENT_ID } from './AuthActions'
import _ from 'lodash'

// Custom
import Config from './../../Config'

const initialState = {
	apiKey: Config.API_KEY,
	secret: Config.SECRET,
	clientID: Config.CLIENT_ID
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
		case ADD_CLIENT_ID:
			return mutateState(state, {
				clientID: action.clientID
			})
	}
	return state
}