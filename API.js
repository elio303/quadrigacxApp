import hmacSHA256 from 'crypto-js/hmac-sha256'

module.exports = {

	get(url, params) {
		var esc = encodeURIComponent;
		var query = Object.keys(params)
		    .map(key => esc(key) + '=' + esc(params[key]))
		    .join('&');

		return fetch(url + '?' + query, {
			headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
	    	}
  		}).then((res) => res.json())
	},

	post(url, body) {
		return fetch('https://api.quadrigacx.com/v2/balance', {
	      	headers: {
	        	'Accept': 'application/json',
	        	'Content-Type': 'application/json'
	      	},
			method: 'POST',
			body: JSON.stringify(body)
	    }).then((res) => res.json())
	},

	authPost(url, body) {
		let finalBody = Object.assign({}, body, this.getAuthBody())
		return this.post(url, finalBody)
	},

	getAuthBody() {
		let nonce = (Math.floor(Date.now() / 1000)).toString()
		let key = 'lqAnkzhqFE'
		let secret = '613b8789fa10fb63f29196e50720574a'
		let clientId = '342728'
		let signature = hmacSHA256(nonce + clientId + key, secret).toString()
		return {
		  key: key,
		  nonce: nonce,
		  signature: signature
		}
	},

	getTicker(book) {
		console.log(book)
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

	getOpenOrders(book) {
		return this.get('https://api.quadrigacx.com/public/orders?book=' + book)
	},

	getUserBalance() {
		return this.authPost('https://api.quadrigacx.com/v2/balance', {})
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

	lookupOrder(id) {
		return this.authPost('https://api.quadrigacx.com/v2/lookup_order', {
			id
		})
	},

}



