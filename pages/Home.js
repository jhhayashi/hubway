import React from 'react'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, ScrollView} from 'react-native'
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

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.loaded
          ? [...this.props.favoriteStations].map(this.renderStation)
          : <Text>Loading...</Text>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default connect(identity, {getStationMetadata, getStationStatuses})(Home)
