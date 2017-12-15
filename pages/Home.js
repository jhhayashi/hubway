import React from 'react'
import PropTypes from 'prop-types'
import {Button, RefreshControl, StyleSheet, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'
import {get, identity} from 'lodash/fp'

import {getStationStatuses, getStationMetadata} from '../redux/actions'
import {Station} from '../components'

class Home extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: 'My Stations',
    headerRight: <Button onPress={() => navigation.navigate('StationSelect')} title="+" />,
  })

  static propTypes = {
    favoriteStations: PropTypes.instanceOf(Set),
    getStationMetadata: PropTypes.func.isRequired,
    getStationStatuses: PropTypes.func.isRequired,
    stationMetadata: PropTypes.object,
    stationStatus: PropTypes.object,
  }

  state = {
    refreshing: true,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.setState({refreshing: true})
    Promise.all([
      this.props.getStationStatuses(),
      this.props.getStationMetadata(),
    ]).then(() => {
      this.setState({refreshing: false})
    })
  }

  renderStation = id => (
    <Station
      key={id}
      id={id}
      {...get(id, this.props.stationStatus)}
      {...get(id, this.props.stationMetadata)}
    />
  )

  navigateToStationSelect = () => {
    this.props.navigation.navigate('StationSelect')
  }

  render() {
    if (!this.props.favoriteStations.size) {
      return (
        <TouchableOpacity style={styles.fullPageButton} onPress={this.navigateToStationSelect}>
          <Text>Press to add your favorite stations</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        {this.props.lastFetched && (
          <Text style={styles.timestamp}>
            Last Updated: {this.props.lastFetched.toLocaleString()}
          </Text>
        )}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.fetchData} />
          }
          style={styles.container}
        >
          {[...this.props.favoriteStations].map(this.renderStation)}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullPageButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestamp: {
    marginTop: 10,
    alignSelf: 'center',
  },
})

export default connect(identity, {getStationMetadata, getStationStatuses})(Home)
