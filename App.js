import React from 'react'
import {StackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'

import {Home, StationSelect} from './pages'
import store from './redux/store'

const MainNavigator = StackNavigator({
  Home: {
    screen: Home,
  },
  StationSelect: {
    screen: StationSelect,
  },
});

export default () => (
  <Provider store={store}>
    <MainNavigator />
  </Provider>
)
