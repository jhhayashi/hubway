import PropTypes from 'prop-types'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

import Count from './Count'

const getCountVariant = (count, capacity) => {
  if (count < 3) return 'low'
  if (count > capacity * 0.8 || count >= 10) return 'high'
}

const Station = props => (
  <View style={styles.container}>
    <Text style={styles.title}>{props.name}</Text>
    <View style={styles.flexRight}>
      <Count
        label="Bikes"
        value={props.bikesAvailable}
        variant={getCountVariant(props.bikesAvailable, props.capacity)}
      />
      <Count
        label="Docks"
        value={props.docksAvailable}
        variant={getCountVariant(props.docksAvailable, props.capacity)}
      />
    </View>
  </View>
)

Station.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  bikesAvailable: PropTypes.number,
  docksAvailable: PropTypes.number,
  capacity: PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  flexRight: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
})

export default Station
