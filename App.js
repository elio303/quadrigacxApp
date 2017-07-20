import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, TextInput, Button} from 'react-native'
import Login from './Components/Login/Login'

var api = require('./Api.js')


const styles = StyleSheet.create({

  mainView: {
    flex: 1,
    backgroundColor: '#3b5998',
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isLoggedIn: false
    }
  }

  componentWillMount() {
    let self = this
    let book = 'eth_cad'

    api.getTicker(book)
      .then((json) => {
        self.setState({
          isLoading: false,
          data: json
        })
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
        <Login />
      </View>
    )
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Main);