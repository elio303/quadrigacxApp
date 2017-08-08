// Action Types
export const SET_BOOK_CURRENCY = 'SET_BOOK_CURRENCY'

// Action Creators
export function setBookCurrency(bookCurrency) {
	
	return {type: SET_BOOK_CURRENCY, bookCurrency}
}
