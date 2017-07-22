// Vendor
import _ from 'lodash'
import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet, Text, TextInput, Button, Alert} from 'react-native'

// Custom
import Api from '../../Services/Api.js'
import AppStore from '../../Stores/AppStore'
import HorizontalLine from '../General/HorizontalLine'
import StoreHelpers from '../../Stores/StoreHelpers'
import { addApiKey, addSecret, addClientID } from '../../Stores/Auth/AuthActions'

const styles = StyleSheet.create({

  buttonView: {
    backgroundColor: '#355088',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  loginBox: {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: 200
  },
  loginInput: {
  	flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  loginTitle: {
    fontSize: 50,
    margin: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
});

export default class Login extends Component {

	// Logic
	constructor(props) {
		super(props)
		this.state = StoreHelpers.getAuthStore()
	}

	handleApiKeyChange({ nativeEvent }) {
		this.changeState(addApiKey, 'apiKey', nativeEvent.text)
	}

	handleSecretChange({ nativeEvent }) {
		this.changeState(addSecret, 'secret', nativeEvent.text)
	}

	handleClientIDChange({ nativeEvent }) {
		this.changeState(addClientID, 'clientID', nativeEvent.text)
	}

	changeState(action, key, value) {
		let newState = {}
		newState[key] = value
		AppStore.dispatch(action(value))
		this.setState(previousState => {
			return _.assign({}, previousState, newState)
		})
	}

	login() {
		Api.getUserBalance().then(() => {
			if (!StoreHelpers.isAuthenticated()) {
				let message = _.get(StoreHelpers.getApiStore(), 'userBalanceResponse.error.message');
				Alert.alert(
			  		'Error',
			  		message,
					{text: 'OK'},
				  	{ cancelable: false }
				)
			}
		})
	}



	// Templating
	LoginButton() {
		return (
			<View style={styles.buttonView}>
				<Button color="white" title="Log in" onPress={this.login} />
	        </View>
		)
	}

	LoginForm() {
		return (
			<View style={styles.loginBox}>

				{this.FormInput(this.state.clientID, 'Client ID', (e) => this.handleClientIDChange(e))}

				<HorizontalLine />

				{this.FormInput(this.state.apiKey, 'API Key', (e) => this.handleApiKeyChange(e))}

				<HorizontalLine />

				{this.FormInput(this.state.secret, 'Secret', (e) => this.handleSecretChange(e))}

    		</View>
		)
	}

	FormInput(value, placeholder, onChange) {
		return (
			<TextInput 
			value={value}
			style={styles.loginInput} 
			placeholder= {placeholder}
			onChange={onChange} />
		)
	}

	title(title) {
		return (
			<Text style={styles.loginTitle}>{title}</Text>
		)
	}

  	render() {
	    return (
	      	<View>
	        	{this.title('QuadrigaCX')}
        		{this.LoginForm()}
        		{this.LoginButton()}
	      	</View>
		)
  	}

}

AppRegistry.registerComponent('AwesomeProject', () => Login);