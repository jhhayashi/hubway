import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from 'react-native'

const StationOption = props => (
  <View style={styles.container}>
    <Text style={styles.icon}>{props.isSelected && '*'}</Text>
    <Text>{props.name}</Text>
  </View>
)

StationOption.propTypes = {
  isSelected: PropTypes.bool,
  name: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    marginRight: 10,
  }
})

export default StationOption
