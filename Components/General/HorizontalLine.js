import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
	horizontalLine: {
	    borderColor: 'ghostwhite',
	    borderWidth: 0.5,
	    alignSelf: 'stretch',
	},
})

export default class HorizontalLine extends Component{
	render() {
		return <View style={styles.horizontalLine} />
	}
}