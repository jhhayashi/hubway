import React from 'react'
import PropTypes from 'prop-types'
import {Button, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native'
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
    loaded: false,
  }

  componentDidMount() {
    Promise.all([
      this.props.getStationStatuses(),
      this.props.getStationMetadata(),
    ]).then(() => {
      this.setState({loaded: true})
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
    if (!this.state.loaded) {
      return <Text>Loading...</Text>
    }

    return (
      <ScrollView style={styles.container}>
        {[...this.props.favoriteStations].map(this.renderStation)}
      </ScrollView>
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
})

export default connect(identity, {getStationMetadata, getStationStatuses})(Home)
