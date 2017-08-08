// Vendor
import _ from 'lodash'
import React, { Component } from 'react'
import { 
  AppRegistry, 
  Text, 
  View, 
  StyleSheet, 
  TextInput, 
  Button, 
  ActivityIndicator
} from 'react-native'

// Custom
import Api from './Services/Api.js'
import AppStore from './Stores/AppStore'
import Login from './Components/Login/Login'
import StoreHelpers from './Stores/StoreHelpers'
import Balances from './Components/Balances/Balances'
import CurrencySwitch from './Components/CurrencySwitch/CurrencySwitch'

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

  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  left: {
    alignSelf: 'flex-start',
  },

});

// Main App Component
export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isAuthenticated: false
    }

    // Enable logs for debugging
    
    console.log(this.state)

    AppStore.subscribe(() => {

      this.updateIsAuthenticated()

      console.log(AppStore.getState())
      console.log(this.state)

    })

  }

  updateIsAuthenticated() {
    this.changeState({
      isAuthenticated: StoreHelpers.isAuthenticated()
    })
  }

  setIsLoading(bool) {
    this.changeState({
      isLoading: bool
    })
  }

  changeState(object) {
    this.setState((previousState) => {
      return _.assign({}, previousState, object)
    })
  }

  Spinner() {
    return (
      <ActivityIndicator
      animating={this.state.isLoading}
      style={styles.spinner}
      size="large" />
    )
  }

  selectComponentToRender() {
    if (this.state.isLoading) {
      return (
        <View>
          {this.Spinner()}
        </View>
      )
    }

    if (!this.state.isAuthenticated) {
      return (
        <Login />
      )
    }
    return (
      <View style={styles.left}>
        <CurrencySwitch />
        <Balances />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.mainView}>
        {this.selectComponentToRender()}
      </View>
    )
  }
}