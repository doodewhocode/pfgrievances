import { combineReducers } from 'redux'
import token from './tokenReducer'
import signin from './signinReducer'
import RegisterReducer from './registerReducer'

export default combineReducers({
  RegisterReducer,
  token,
  signin 
})