import PropTypes from 'prop-types'
import React from 'react'
import {Text, View} from 'react-native'

const Station = props => (
  <View>
    <Text>{props.name}</Text>
    <Text>Bikes: {props.bikesAvailable}</Text>
    <Text>Docks: {props.docksAvailable}</Text>
  </View>
)

Station.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  bikesAvailable: PropTypes.number,
  docksAvailable: PropTypes.number,
}

export default Station
