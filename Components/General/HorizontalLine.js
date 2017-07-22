import React, { Component } from 'react'
import { AppRegistry, View, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
	horizontalLine: {
	    borderColor: 'ghostwhite',
	    borderWidth: 1,
	    width: 300
	},
})

export default class HorizontalLine extends Component{
	render() {
		return <View style={styles.horizontalLine} />
	}
}