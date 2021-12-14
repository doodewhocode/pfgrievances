import { POST_SIGNIN_BEGIN, POST_SIGNIN_SUCCESS, POST_SIGNIN_FAIL } from '../action/signinAction'
import { fromJS } from 'immutable'

let initialState = fromJS({});


export default (state = initialState, action) => {
  switch (action.type) {


    case 'POST_SIGNIN_BEGIN':
      return state.setIn(['post_signin', 'loading'], action.loading)
        .setIn(['post_signin', 'error'], action.error)
    case 'POST_SIGNIN_SUCCESS':
      return state.setIn(['post_signin', 'data'], action.data)
        .setIn(['post_signin', 'loading'], action.loading)
        .setIn(['post_signin', 'error'], action.error)
    case 'POST_SIGNIN_FAIL':
      return state.setIn(['post_signin', 'data'], action.data)
        .setIn(['post_signin', 'loading'], action.loading)
        .setIn(['post_signin', 'error'], action.error)

    case 'FORGOT_PWD_LOADING':
      return state.setIn(['forgot_pwd', 'loading'], action.loading)
        .setIn(['forgot_pwd', 'error'], action.error)
    case 'FORGOT_PWD':
      return state.setIn(['forgot_pwd', 'data'], action.data)
        .setIn(['forgot_pwd', 'loading'], action.loading)
        .setIn(['forgot_pwd', 'error'], action.error)
    case 'FORGOT_PWD_ERROR':
      return state.setIn(['forgot_pwd', 'data'], action.data)
        .setIn(['forgot_pwd', 'loading'], action.loading)
        .setIn(['forgot_pwd', 'error'], action.error)


    default:
      return state
  }
}