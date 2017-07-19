import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  loading: {},
  priceView: {
    backgroundColor: 'skyblue',
    margin: 10,
    padding: 10,
    alignItems: 'center'
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
  }
});

class CurrentPrice extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.subView}>
        <Text>Last: {this.props.data.last}</Text>
        <Text>High: {this.props.data.high}</Text>
        <Text>Low: {this.props.data.low}</Text>
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
      isLoading: true
    }
  }

  componentWillMount() {
    let self = this
    let book = 'eth_cad'
    fetch('https://api.quadrigacx.com/v2/ticker?book=' + book)
      .then((res) => res.json())
      .then((json) => {
        self.setState({
          isLoading: false,
          data: json
        })
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
    return (
      <View style={styles.mainView}>
        <CurrentPrice data={this.state.data} />
        <Buy data={this.state.data} />
        <Sell data={this.state.data} />
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Main);