import { combineReducers } from 'redux'
import token from './tokenReducer'
import signin from './signinReducer'
import RegisterReducer from './registerReducer'
import FormReducer from './formReducer'

export default combineReducers({
  registerReducer: RegisterReducer,
  loginReducer: token,
  formReducer: FormReducer,
  signin
})