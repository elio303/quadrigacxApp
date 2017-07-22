// Action Types
export const ADD_USER_BALANCE_RESPONSE = 'ADD_USER_BALANCE_RESPONSE'

// Action Creators
export function addUserBalanceResponse(userBalanceResponse) {
	return {type: ADD_USER_BALANCE_RESPONSE, userBalanceResponse}
}
