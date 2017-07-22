import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet, Text} from 'react-native'
import StoreHelpers from '../../Stores/StoreHelpers'

const styles = StyleSheet.create({
	balancesBox: {
	    margin: 10,
    	padding: 10,
    	borderRadius: 10,
    	backgroundColor: 'white',
	    justifyContent: 'space-between',
	    flexDirection: 'row',
	},
})

export default class HorizontalLine extends Component{

	currencies = [
		'BTC',
		'LTC',
		'ETH',
		'ETC',
		'USD',
		'CAD',
		'XAU',
	]

	getBalance(currency) {
		let lowerCaseCurrency = currency.toLowerCase()
		return StoreHelpers.getApiStore().userBalanceResponse[lowerCaseCurrency + '_balance']
	}

	Balance(currency, context) {
		return (
			<Text key={currency}>{context.getBalance(currency)}</Text>
		)
	}

	Currency(currency) {
		return (
			<Text key={currency}>{currency + ': '}</Text>
		)
	}

	Currencies() {
		return this.Objects(this.Currency)
	}

	Balances() {
		return this.Objects(this.Balance)
	}

	Objects(objectComponent) {
		let objects = []
		this.currencies.forEach((currency) => {
			objects.push(objectComponent(currency, this))
		})
		return (
			<View>
				{objects}
			</View>
		)
	}

	render() {
		return (
			<View style={styles.balancesBox}>
				{this.Currencies()}
				{this.Balances()}
			</View>
		)
	}
}