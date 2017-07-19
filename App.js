import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  loading: {},
  priceView: {},
  mainView: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
  center: {
    alignItems: 'center'
  }
});

class CurrentPrice extends Component {

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
      return (<Text>Loading...</Text>); 
    }
    return (
      <View style={styles.priceView, styles.center}>
        <Text>{this.state.data.last}</Text>
      </View>
    )
  }
}

export default class Main extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <CurrentPrice />
      </View>
    );
  }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Main);