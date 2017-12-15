import React from 'react'
import {StackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'

import {Home, StationSelect} from './pages'
import configureStore from './redux/store'

const {persistor, store} = configureStore()

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
    <PersistGate persistor={persistor}>
      <MainNavigator />
    </PersistGate>
  </Provider>
)
