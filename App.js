import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, TextInput, Button} from 'react-native'

var api = require('./API.js')


const styles = StyleSheet.create({
  loading: {},
  priceView: {
    backgroundColor: 'skyblue',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  averageView: {
    backgroundColor: 'skyblue',
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'powderblue',
    marginTop: 30,
    padding: 20
  },
  center: {
    alignItems: 'center'
  },
  subView: {
    backgroundColor: 'skyblue',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  textInput: {
    borderColor: 'gray',
    height: 20,
    width: 100,
    borderWidth: 1,
    backgroundColor: 'white'
  }
});

class CurrentPrice extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.priceView}>
        <Text>Last: {this.props.data.last}</Text>
        <Text>High: {this.props.data.high}</Text>
        <Text>Low: {this.props.data.low}</Text>
      </View>
    )
  }
}

class VolumeAndAverage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.averageView}>
        <Text>Average: {this.props.data.vwap}</Text>
        <Text>Volume: {this.props.data.volume}</Text>
      </View>
    )
  }
}

class Login extends Component {

  constructor(props) {
    super(props)
  }

  login() {
    api.getUserBalance()
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
      <View style={styles.subView}>
        <Button title="Log in" onPress={this.login} />
      </View>
    )
  }
}

class Buy extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.subView}>
        <Text>Buy Price: {this.props.data.bid}</Text>
        <TextInput style={styles.textInput} />
      </View>
    )
  }
}

class Sell extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.subView}>
        <Text>Sell Price: {this.props.data.ask}</Text>
      </View>
    )
  }
}

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
    if (this.state.isLoading) {
      return (
        <View style={styles.priceView, styles.center}>
          <Text>Loading...</Text>
        </View>
      ); 
    }
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.mainView}>
          <CurrentPrice data={this.state.data} />
          <VolumeAndAverage data={this.state.data} />
          <Buy data={this.state.data} />
          <Sell data={this.state.data} />
        </View>
      );
    }
    return (
      <View style={styles.mainView}>
        <Login />
      </View>
    )
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Main);