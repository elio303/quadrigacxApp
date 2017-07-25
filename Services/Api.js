// Vendor
import _ from 'lodash'
import hmacSHA256 from 'crypto-js/hmac-sha256'

// Custom
import AppStore from '../Stores/AppStore'
import { addUserBalanceResponse } from '../Stores/Api/ApiActions'


module.exports = {

	apiUrl() {
		return 'https://api.quadrigacx.com/v2'
	},

	headers() {
		return {
			headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
	    	}
		}
	}, 

	get(url, params) {
		var esc = encodeURIComponent;
		var query = Object.keys(params)
		    .map(key => esc(key) + '=' + esc(params[key]))
		    .join('&');

		return fetch(url + '?' + query, this.headers()).then((res) => res.json())
	},

	post(url, body) {
		return fetch(this.apiUrl() + '/balance', 
			_.assign({}, this.headers(), 
				{
					method: 'POST',
					body: JSON.stringify(body)
				}
			)
		).then((res) => res.json())
	},

	authPost(url, body) {
		let finalBody = Object.assign({}, body, this.getAuthBody())
		return this.post(url, finalBody)
	},

	getAuthBody() {
		let nonce = (Math.floor(Date.now() / 1000)).toString()
		let authStore = AppStore.getState().AuthStore
		let key = authStore.apiKey
		let secret = authStore.secret
		let clientId = authStore.clientID
		let signature = hmacSHA256(nonce + clientId + key, secret).toString()
		return {
		  key: key,
		  nonce: nonce,
		  signature: signature
		}
	},

	getTicker(book) {
		return this.get('https://api.quadrigacx.com/v2/ticker', {
			book
		})
	},

	getOrderBook(book, group) {
		return this.get('https://api.quadrigacx.com/v2/order_book', {
			book,
			group
		})
	},

	getTransactions(book, time) {
		return this.get('https://api.quadrigacx.com/v2/transactions', {
			book,
			time
		})
	},

	getUserBalance() {
		return this.authPost('https://api.quadrigacx.com/v2/balance', {})
			.then((response) => {
				AppStore.dispatch(addUserBalanceResponse(response))
			})
			.catch(err => {
				throw err
			})
	},

	getUserTransactions(offset, limit, sort, book) {
		return this.authPost('https://api.quadrigacx.com/v2/user_transactions', {
			offset,
			limit,
			sort,
			book
		})
	},

	getUserOpenOrders(book) {
		return this.authPost('https://api.quadrigacx.com/v2/open_orders', {
			book
		})
	},

	getUserLookupOrder(id) {
		return this.authPost('https://api.quadrigacx.com/v2/lookup_order', {
			id
		})
	},

}



