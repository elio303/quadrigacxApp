import { combineReducers } from 'redux'
import AuthStore from './Auth/AuthReducers'
import ApiStore from './Api/ApiReducers'

export default combineReducers({
  AuthStore,
  ApiStore
})

