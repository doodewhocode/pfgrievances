import { combineReducers } from 'redux'
import token from './tokenReducer'
import signin from './signinReducer'


export default combineReducers({
  token,
  signin 
})