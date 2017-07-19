import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

var CurrentPrice = React.createClass({

  render() {
    let self = this

    self.state = {}
    self.state.loading = true

    let book = 'eth_cad'
    fetch('https://api.quadrigacx.com/v2/ticker?book=' + book)
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
          self.state.isLoading = false
          self.state.data = json
        })

    if (this.state.loading) {
      return (<Text>Loading...</Text>); 
    }
    console.log(this.state.data)
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