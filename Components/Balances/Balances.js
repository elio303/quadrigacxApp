// Vendor
import GlobalStyles from '../../Styles/GlobalStyles'
import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet, Text} from 'react-native'

// Custom
import AppStore from '../../Stores/AppStore'
import StoreHelpers from '../../Stores/StoreHelpers'
import HorizontalLine from '../General/HorizontalLine'

const styles = StyleSheet.create({
	balanceBox: {
		maxHeight: 180,
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

	// Logic
	constructor(props) {
		super(props)
		this.state = {
			balances: StoreHelpers.getApiStore().userBalanceResponse,
		}

		AppStore.subscribe(() => {
			this.updateBalances()
		})
	}

	currencies = [
		'BTC',
		'LTC',
		'ETH',
		'ETC',
		'USD',
		'CAD',
		'XAU',
	]

	updateBalances() {
		this.setState(previousState => {
			return _.assign({}, previousState, {
				balances: StoreHelpers.getApiStore().userBalanceResponse,
			})
		})
	}

	getBalance(currency) {
		let lowerCaseCurrency = currency.toLowerCase()
		return this.state.balances[lowerCaseCurrency + '_balance']
	}


	// Templating

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
			<View style={[GlobalStyles.box, styles.balanceBox]}>
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