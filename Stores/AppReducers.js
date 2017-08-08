import { combineReducers } from 'redux'
import AuthStore from './Auth/AuthReducers'
import ApiStore from './Api/ApiReducers'
import GeneralStore from './General/GeneralReducers'

export default combineReducers({
  AuthStore,
  ApiStore,
  GeneralStore,
})

