import { POST_SIGNIN_BEGIN, POST_SIGNIN_SUCCESS, POST_SIGNIN_FAIL } from '../action/signinAction'

const initialState = {
  signin_loading: false,
  forgotpwd_loading: false,
  error: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_SIGNIN_BEGIN:
      return { ...state, signin_loading: true }
    case POST_SIGNIN_SUCCESS:
      return { ...state, signin_loading: false, }
    case POST_SIGNIN_FAIL:
      return { ...state, signin_loading: false, error: action.payload.error.response.data }
    case 'FORGOT_PWD_LOADING':
      return { ...state, forgotpwd_loading: true }
    case 'FORGOT_PWD':
      return { ...state, forgotpwd_loading: false, }
    case 'FORGOT_PWD_ERROR':
      return { ...state, forgotpwd_loading: false, error: action.payload.error.response.data }
    default:
      return state
  }
}