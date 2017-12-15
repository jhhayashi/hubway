import {compose, keyBy, map} from 'lodash/fp'

const request = (url, params) => fetch(url, params).then(desearalize)

const desearalize = res =>
  res.headers.get('Content-Type') && res.headers.get('Content-Type').includes('application/json')
    ? res.json()
    : res.text()

const keyById = keyBy('id')

const processStatus = status => ({
  id: status.station_id,
  bikesAvailable: status.num_bikes_available,
  docksAvailable: status.num_docks_available,
})

const processStatuses = compose(keyById, map(processStatus))

export const fetchStationStatuses = () => new Promise(
  resolve => setTimeout(() =>
    resolve(processStatuses(
      require('./data/station_status.json').data.stations
    )),
    1000
  )
)

const processMetadata = metadata => ({
  id: metadata.station_id,
  capacity: metadata.capacity,
  name: metadata.name,
})

const processAllMetadata = compose(keyById, map(processMetadata))

export const fetchStationMetadata = () => new Promise(
  resolve => resolve(processAllMetadata(require('./data/station_information.json').data.stations))
)
