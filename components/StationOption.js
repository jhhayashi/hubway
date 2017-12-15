import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Feather} from '@expo/vector-icons'

const StationOption = props => (
  <TouchableOpacity
    style={[styles.container, props.isSelected && styles.selected]}
    onPress={props.onPress}
  >
    <View style={styles.icon}>
      {props.isSelected && <Feather name="check" size={20} />}
    </View>
    <Text style={styles.fill}>{props.name}</Text>
  </TouchableOpacity>
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
    marginBottom: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    minHeight: 40,
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    minWidth: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 20,
  },
  selected: {
    backgroundColor: '#afa',
  },
})

export default StationOption
