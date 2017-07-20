// Vendor
import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, TextInput, Button} from 'react-native'
import { createStore } from 'redux'

// Custom
import Login from './Components/Login/Login'
import Api from './Services/Api.js'
import { addApiKey, addSecret } from './Stores/Auth/AuthActions'
import AppReducers from './Stores/AppReducers'

// Setuo Store
let store = createStore(AppReducers)
console.log(store.getState()) // Inital Store

let unsubscribe = store.subscribe(() =>
  console.log(store.getState()) // Updated Store
)

// Styles
const styles = StyleSheet.create({

  mainView: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b5998',
  },

});

// Main App Component
export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoggedIn: false
    }
  }

  componentWillMount() {
    let book = 'eth_cad'

    Api.getTicker(book)
      .then((json) => {
        console.log(json)
      })
      .catch(err => {
        console.error(err)
        throw err
      })
    }
  

  render() {
    return (
      <View style={styles.mainView}>
        <Login store={store} />
      </View>
    )
  }
}

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => Main);