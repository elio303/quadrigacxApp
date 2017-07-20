// Vendor
import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet, Text, TextInput, Button} from 'react-native'
import AppReducers from '../../Stores/AppReducers'
import { createStore } from 'redux'

// Custom
import HorizontalLine from '../General/HorizontalLine'
import Api from '../../Services/Api.js'
import { addApiKey, addSecret } from '../../Stores/Auth/AuthActions'

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
    height: 150,
  },
  loginInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: 50,
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

	constructor(props) {
		super(props)

		this.state = {
			apiKey: '',
			secret: ''
		}
	}

	login() {
		// // Setuo Store
		// let store = createStore(AppReducers)
		// console.log(store.getState()) // Inital Store

		// let unsubscribe = store.subscribe(() =>
		// 	console.log(store.getState()) // Updated Store
		// )

		// store.dispatch(addApiKey(this.state.apiKey))
		// store.dispatch(addSecret(this.state.secret))
		console.log(this.state)

		Api.getUserBalance()
			.then((json) => {
				console.log(json)
				return json
			})
			.catch(err => {
				console.error(err)
				throw err
			})
	}

  	render() {
	    return (
	      	<View>
	        	<Text style={styles.loginTitle}>QuadrigaCX</Text>
	        		<View style={styles.loginBox}>
						<TextInput 
							style={styles.loginInput} 
							placeholder="API Key" 
							onChangeText={(apiKey) => this.setState({apiKey})}
							value={this.state.apiKey} />

						<HorizontalLine />

						<TextInput 
							style={styles.loginInput} 
							placeholder="Secret" 
							secureTextEntry
							value={this.state.secret} />
	        		</View>
	        		<View style={styles.buttonView}>
						<Button color="white" title="Log in" onPress={this.login} />
			        </View>
	      	</View>
		)
  	}
}

AppRegistry.registerComponent('AwesomeProject', () => Login);