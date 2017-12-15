import {compose, keyBy, map} from 'lodash/fp'

const URLS = {
  stationMetadata: 'https://gbfs.thehubway.com/gbfs/en/station_information.json',
  stationStatus: 'https://gbfs.thehubway.com/gbfs/en/station_status.json',
}

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

const processStatuses = res => ({
  stations: compose(keyById, map(processStatus))(res.data.stations),
  // TODO add this when hubway's api returns correct value
  // date: new Date(res.last_updated),
  date: new Date(),
})

export const fetchStationStatuses = () => request(URLS.stationStatus).then(processStatuses)

const processMetadata = metadata => ({
  id: metadata.station_id,
  capacity: metadata.capacity,
  name: metadata.name,
})

const processAllMetadata = res => ({
  stations: compose(keyById, map(processMetadata))(res.data.stations),
  // TODO add this when hubway's api returns correct value
  // date: new Date(res.last_updated),
  date: new Date(),
})

export const fetchStationMetadata = () => request(URLS.stationMetadata).then(processAllMetadata)
