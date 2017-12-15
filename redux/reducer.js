import {reject} from 'lodash/fp'

import {ADD_FAVORITE, REMOVE_FAVORITE, RECEIVE_STATUS, RECEIVE_METADATA} from './actions'

const DEFAULT_STATE = {
  favoriteStations: new Set([]),
  stationStatus: {},
  stationMetadata: {},
}

const without = (val, set) => {
  const arr = reject(x => x === val, [...set])
  return new Set(arr)
}

const withVal = (val, set) => new Set([...set, val])

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {...state, favoriteStations: withVal(action.payload.id, state.favoriteStations)}
    case REMOVE_FAVORITE:
      return {...state, favoriteStations: without(action.payload.id, state.favoriteStations)}
    case RECEIVE_STATUS:
      return {...state, stationStatus: action.payload.stations}
    case RECEIVE_METADATA:
      return {...state, stationMetadata: action.payload.stations}
    default:
      return state
  }
}
