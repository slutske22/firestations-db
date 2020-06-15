import { combineReducers } from 'redux'
import { mapReducers } from './mapReducers'
import { navigationReducers } from './navigationReducers'

export default combineReducers({
   map: mapReducers,
   nav: navigationReducers
})