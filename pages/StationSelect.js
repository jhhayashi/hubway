import React from 'react'
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'
import {filter, get, map} from 'lodash/fp'

import {StationOption} from '../components'

const FAVORITE_STATIONS = new Set(['74', '68'])

export default class StationSelect extends React.Component {
  static navigationOptions = {
    title: 'Add Stations',
  }

  state = {
    status: null,
    metadata: null,
    filteredStations: null,
  }

  onSearch = query => {
    if (!query) {
      this.setState({filteredStations: this.state.metadata})
      return
    }
    const regex = new RegExp(query, 'i')
    this.setState({
      filteredStations: filter(station => regex.test(station.name), this.state.metadata),
    })
  }

  hasLoaded = () => this.state.status && this.state.metadata

  renderStation = metadata => (
    <StationOption
      key={metadata.id}
      isSelected={FAVORITE_STATIONS.has(metadata.id)}
      {...metadata}
      {...get(metadata.id, this.state.status)}
    />
    )

  render() {
    // TODO use FlatView
    return (
      <View style={styles.container}>
        <TextInput onChangeText={this.onSearch} />
        <ScrollView>
          {this.hasLoaded()
            ? map(this.renderStation, this.state.filteredStations)
            : <Text>Loading...</Text>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
