// Vendor
import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, TextInput, Button} from 'react-native'
import AppStore from './Stores/AppStore'

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
      isLoading: true,
      isLoggedIn: false,
      store: AppStore
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
        <Login store={this.state.store} />
      </View>
    )
  }
}

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => Main);