import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'

import {Home, StationSelect} from './pages'
import configureStore from './redux/store'

const {persistor, store} = configureStore()

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
  StationSelect: {
    screen: StationSelect,
  },
});

const AppContainer = createAppContainer(MainNavigator)

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
)
