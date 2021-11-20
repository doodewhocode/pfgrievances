import { combineReducers } from 'redux'
import token from './tokenReducer'
import signin from './signinReducer'
import RegisterReducer from './registerReducer'
import FormReducer from './formReducer'
import DashboardReducer from './dashboardReducer'

export default combineReducers({
  registerReducer: RegisterReducer,
  loginReducer: token,
  formReducer: FormReducer,
  dashboardReducer: DashboardReducer,
  signin
})