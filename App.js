// Vendor
import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, TextInput, Button} from 'react-native'
import AppStore from './Stores/AppStore'
import StoreHelpers from './Stores/StoreHelpers'

// Custom
import Login from './Components/Login/Login'
import Api from './Services/Api.js'

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
      isLoading: false,
      isAuthenticated: !StoreHelpers.getApiStore().userBalanceResponse.error // Computed property from store
    }

    // Enable this for debugging
    
    console.log(this.state)

    AppStore.subscribe(() => {
     console.log(AppStore.getState())
    })

  }

  render() {
    return (
      <View style={styles.mainView}>
        <Login />
      </View>
    )
  }
}

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => Main);