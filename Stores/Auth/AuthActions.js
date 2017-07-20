// Action Types
export const ADD_API_KEY = 'ADD_API_KEY'
export const ADD_SECRET = 'ADD_SECRET'

// Action Creators
export function addApiKey(apiKey) {
	return {type: ADD_API_KEY, apiKey}
}

export function addSecret(secret) {
	return {type: ADD_SECRET, secret}
}
