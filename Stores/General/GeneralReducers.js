// Vendor
import { SET_BOOK_CURRENCY } from './GeneralActions'
import _ from 'lodash'

// Custom
import constants from '../../constants'

const initialState = {
	bookCurrency: 'eth_cad',
}

function mutateState(state, data) {
	return _.assign({}, state, data)
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_BOOK_CURRENCY:
			if (_.indexOf(constants.BOOK_CURRENCIES, action.bookCurrency) !== -1) {
				return mutateState(state, {
					bookCurrency: action.bookCurrency,
				})
			}
	}
	return state
}