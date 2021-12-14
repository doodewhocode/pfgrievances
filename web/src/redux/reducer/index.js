import { combineReducers } from 'redux'
import token from './tokenReducer'
import SignInReducer from './signinReducer'
import RegisterReducer from './registerReducer'
import FormReducer from './formReducer'
import DashboardReducer from './dashboardReducer'
import TrackReducer from './trackReducer'
import QueryControlReducer from './queryControlReducer'
import PaymentReducer from './paymentReducer'

export default combineReducers({
  registerReducer: RegisterReducer,
  loginReducer: token,
  formReducer: FormReducer,
  dashboardReducer: DashboardReducer,
  trackReducer: TrackReducer,
  queryControlReducer: QueryControlReducer,
  paymentReducer: PaymentReducer,
  signInReducer: SignInReducer
})