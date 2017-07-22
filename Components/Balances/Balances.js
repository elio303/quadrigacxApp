// Vendor
import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet, Text} from 'react-native'

// Custom
import StoreHelpers from '../../Stores/StoreHelpers'
import HorizontalLine from '../General/HorizontalLine'

const styles = StyleSheet.create({
	balancesBox: {
	    margin: 20,
    	padding: 10,
    	borderRadius: 10,
    	backgroundColor: 'white',
	    justifyContent: 'space-between',
	},
	balanceView: {
	    flexDirection: 'row',
	    margin: 5,
	},
	title: {
		fontSize: 20,
	},
	titleView: {
		margin: 5,
		alignItems: 'center',
	}
})

export default class Balances extends Component{

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

	Title() {
		return (
			<Text style={styles.title}>Balances</Text>
		)
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
				<View style={styles.titleView}>
					{this.Title()}
				</View>
				<HorizontalLine />
				<View style={styles.balanceView}>
					{this.Currencies()}
					{this.Balances()}
				</View>
			</View>
		)
	}
}