import {StackNavigator} from 'react-navigation'

import {Home, StationSelect} from './pages'

export default StackNavigator({
  Home: {
    screen: Home,
  },
  StationSelect: {
    screen: StationSelect,
  },
});
