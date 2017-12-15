import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {createTransform, persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage'

import reducer from './reducer'

const transformSets = createTransform(
  (state, key) => key === 'favoriteStations' ? [...state] : state,
  (state, key) => key === 'favoriteStations' ? new Set(state) : state
)

const config = {key: 'root', storage, transforms: [transformSets]}

const persistentReducer = persistReducer(config, reducer)

export default function configureStore() {
  const store = createStore(persistentReducer, applyMiddleware(thunk))
  const persistor = persistStore(store)
  return {persistor, store}
}
