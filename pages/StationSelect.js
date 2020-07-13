import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native'
import {connect} from 'react-redux'
import {filter, get, identity, map, pick, values} from 'lodash/fp'

import {addFavorite, getStationMetadata, getStationStatuses, removeFavorite} from '../redux/actions'
import {StationOption} from '../components'

const getKey = get('id')

function StationSelect(props) {

  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!props.stationMetadata) props,getStationMetadata()
    if (!props.stationStatus) props.getStationStatuses()
  })

  const onSearch = query => setQuery(query)

  const onStationPress = stationId => () => {
    if (props.favoriteStations.has(stationId)) {
      props.removeFavorite(stationId)
    } else {
      props.addFavorite(stationId)
    }
  }

  const renderStation = ({item: metadata}) => (
    <StationOption
      key={metadata.id}
      isSelected={props.favoriteStations.has(metadata.id)}
      onPress={onStationPress(metadata.id)}
      {...metadata}
    />
  )

  const regex = new RegExp(query, 'i')
  const filteredStations = query
    ? filter(station => regex.test(station.name), props.stationMetadata)
    : props.stationMetadata

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.filterInput}
        onChangeText={onSearch}
        placeholder="Search..."
        clearButtonMode="always"
        returnKeyType="search"
      />
      {(props.stationStatus && props.stationMetadata)
          ? (
            <FlatList
              data={values(filteredStations)}
              keyExtractor={getKey}
              renderItem={renderStation}
            />
          ) : <Text>Loading...</Text>
      }
    </View>
  )
}

StationSelect.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  favoriteStations: PropTypes.instanceOf(Set),
  getStationMetadata: PropTypes.func.isRequired,
  getStationStatuses: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  stationMetadata: PropTypes.object,
  stationStatus: PropTypes.object,
}

StationSelect.navigationOptions = {
  title: 'Add Stations',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterInput: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: '#666',
    borderWidth: 1,
    margin: 10,
  },
})

export default connect(
  identity,
  {addFavorite, getStationMetadata, getStationStatuses, removeFavorite}
)(StationSelect)
