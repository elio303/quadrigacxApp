// Vendor
import { ADD_USER_BALANCE_RESPONSE } from './ApiActions'
import _ from 'lodash'

// Custom
import Config from './../../Config'

function getDefaultResponseState() {
	return {
		error: {
			code: 0,
			message: "Default error state"
		}
	}
}

const initialState = {
	userBalanceResponse: getDefaultResponseState()
}

function mutateState(state, data) {
	return _.assign({}, state, data)
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ADD_USER_BALANCE_RESPONSE:
			return mutateState(state, {
				userBalanceResponse: action.userBalanceResponse
			})
	}
	return state
}