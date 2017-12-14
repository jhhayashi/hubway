import * as api from '../api'

const action = (type, payload = {}) => ({type, payload})

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const addFavorite = stationId => action(ADD_FAVORITE, {id: stationId})
export const removeFavorite = stationId => action(REMOVE_FAVORITE, {id: stationId})

export const FETCH_STATUS = 'FETCH_STATUS'
export const RECEIVE_STATUS = 'RECEIVE_STATUS'
export const REJECT_STATUS = 'REJECT_STATUS'

export const getStationStatuses = () => dispatch => {
  dispatch(action(FETCH_STATUS))
  return api.fetchStationStatuses()
    .then(stations => dispatch(action(RECEIVE_STATUS, {stations})))
    .catch(err => dispatch(action(REJECT_STATUS, {err})))
}

export const FETCH_METADATA = 'FETCH_METADATA'
export const RECEIVE_METADATA = 'RECEIVE_METADATA'
export const REJECT_METADATA = 'REJECT_METADATA'

export const getStationMetadata = () => dispatch => {
  dispatch(action(FETCH_METADATA))
  return api.fetchStationMetadata()
    .then(stations => dispatch(action(RECEIVE_METADATA, {stations})))
    .catch(err => dispatch(action(REJECT_METADATA, {err})))
}
