// Vendor
import _ from 'lodash'
import React, { Component } from 'react'
import GlobalStyles from '../../Styles/GlobalStyles'
import { AppRegistry, View, StyleSheet, Text, Picker} from 'react-native'

// Custom
import constants from '../../constants'
import AppStore from '../../Stores/AppStore'
import StoreHelpers from '../../Stores/StoreHelpers'
import HorizontalLine from '../General/HorizontalLine'
import { setBookCurrency } from '../../Stores/General/GeneralActions'

const styles = StyleSheet.create({})

export default class Balances extends Component{

	// Logic
	constructor(props) {
		super(props)
		this.state = {
			bookCurrency: StoreHelpers.getGeneralStore().bookCurrencies,
		}
	}

	changeBookCurrency() {
		this.changeState(setBookCurrency, 'bookCurrency', 'someValue')
	}

	changeState(action, key, value) {
		let newState = {}
		newState[key] = value
		AppStore.dispatch(action(value))
		this.setState(previousState => {
			return _.assign({}, previousState, newState)
		})
	}

	createCurrencyLabel(currency) {
		return currency.replace('_', '/').toUpperCase();
	}

	Picker(currency) {
		return (
			<Picker.Item 
				key={currency} 
				label={this.createCurrencyLabel(currency)} 
				value={currency} 
			/>
		)
	}

	Pickers() {
		let pickers = []
		let self = this
		constants.BOOK_CURRENCIES.forEach(function(currency) {
			pickers.push(self.Picker(currency))
		})
		return (
			<Picker 
				selectedValue={this.state.bookCurrency}
				// onValueChange={this.changeBookCurrency()}
			>
				{pickers}
			</Picker>
		)
	}

	render() {
		return (
			<View style={[GlobalStyles.box]}>
				{this.Pickers()}
			</View>
		)
	}
}