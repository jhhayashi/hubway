import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import {Constants} from 'expo'
import {get} from 'lodash/fp'

import {getStationStatuses, getStationMetadata} from './api'
import {Station} from './components'

const FAVORITE_STATIONS = ['74', '68']

export default class App extends React.Component {
  state = {
    metadata: null,
    status: null,
  }

  componentDidMount() {
    Promise.all([
      getStationStatuses(),
      getStationMetadata(),
    ]).then(([status, metadata]) => {
      this.setState({status, metadata})
    })
  }

  hasLoaded = () => this.state.status && this.state.metadata

  renderStation = id => (
    <Station
      key={id}
      id={id}
      {...get(id, this.state.status)}
      {...get(id, this.state.metadata)}
    />
  )

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.hasLoaded()
            ? FAVORITE_STATIONS.map(this.renderStation)
          : <Text>Loading...</Text>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
});
