import React, { Component } from 'react';
import { AppRegistry, Text, View, AsyncStorage } from 'react-native';

var CurrentPrice = React.createClass({

  getInitialState() {
    return {
      isLoading: true,
      data: {}
    };
  },

  componentWillMount() {
    let book = 'eth_cad'
    fetch('https://api.quadrigacx.com/v2/ticker?book=' + book)
        .then((res) => {res.json()})
        .then((json) => {
          AsyncStorage.setState({
            isLoading: false,
            data: json
          })
        })
  },

  render() {
    if (this.state.isLoading) {
      return (<Text>Loading...</Text>); 
    }
    return (<Text>{this.state.data}</Text>)
  }
})

export default class Main extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <CurrentPrice />
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Main);