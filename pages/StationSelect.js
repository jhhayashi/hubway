import React from 'react'
import PropTypes from 'prop-types'
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'
import {connect} from 'react-redux'
import {filter, get, identity, map, pick} from 'lodash/fp'

import {addFavorite, getStationMetadata, getStationStatuses, removeFavorite} from '../redux/actions'
import {StationOption} from '../components'

class StationSelect extends React.Component {
  static navigationOptions = {
    title: 'Add Stations',
  }

  static propTypes = {
    addFavorite: PropTypes.func.isRequired,
    favoriteStations: PropTypes.instanceOf(Set),
    getStationMetadata: PropTypes.func.isRequired,
    getStationStatuses: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
    stationMetadata: PropTypes.object,
    stationStatus: PropTypes.object,
  }

  state = {
    filteredStations: this.props.stationMetadata,
  }

  componentDidMount() {
    if (!this.props.stationMetadata) this.props.getStationMetadata()
    if (!this.props.stationStatus) this.props.getStationStatuses()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.stationMetadata !== this.props.stationMetadata) {
      this.setState({filteredStations: newProps.stationMetadata})
    }
  }

  onSearch = query => {
    if (!query) {
      this.setState({filteredStations: this.props.stationMetadata})
      return
    }
    const regex = new RegExp(query, 'i')
    this.setState({
      filteredStations: filter(station => regex.test(station.name), this.props.stationMetadata),
    })
  }

  onStationPress = stationId => () => {
    if (this.props.favoriteStations.has(stationId)) {
      this.props.removeFavorite(stationId)
    } else {
      this.props.addFavorite(stationId)
    }
  }

  hasLoaded = () => this.props.stationStatus && this.props.stationMetadata

  renderStation = metadata => (
    <StationOption
      key={metadata.id}
      isSelected={this.props.favoriteStations.has(metadata.id)}
      onPress={this.onStationPress(metadata.id)}
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

export default connect(
  identity,
  {addFavorite, getStationMetadata, getStationStatuses, removeFavorite}
)(StationSelect)
