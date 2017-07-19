import React, { Component } from 'react'
import { AppRegistry, Text, View, StyleSheet, TextInput, Button} from 'react-native'

var api = require('./Api.js')


const styles = StyleSheet.create({
  loading: {},

  priceView: Object.assign({}, 
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }, 
    this.subView
  ),

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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center'
  },
  subView: {
    backgroundColor: 'skyblue',
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
    height: 150
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
  horizontalLine: {
    borderColor: 'ghostwhite',
    borderWidth: 1,
    width: 300
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
      <View>
        <View style={styles.loginBox}>
          <TextInput style={styles.loginInput} placeholder="API Key" />
          <View style={styles.horizontalLine} />
          <TextInput style={styles.loginInput} placeholder="Secret"/>
        </View>
        <View style={styles.subView}>
          <Button title="Log in" onPress={this.login} />
        </View>
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