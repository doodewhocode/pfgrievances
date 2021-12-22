import {
  POST_TOKEN_BEGIN,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAIL,
  INSERT_TOKEN_SUCCESS,
  INSERT_TOKEN_FAIL
} from '../action/tokenAction'
import { fromJS } from 'immutable'
let initialState = fromJS({});


export default (state = initialState, action) => {
  switch (action.type) {

    case 'POST_TOKEN_BEGIN':
      return state.setIn(['post_token', 'loading'], action.loading)
        .setIn(['post_token', 'error'], action.error)
    case 'POST_TOKEN_SUCCESS':
      return state.setIn(['post_token', 'data'], action.data)
        .setIn(['post_token', 'loading'], action.loading)
        .setIn(['post_token', 'error'], action.error)
    case 'POST_TOKEN_FAIL':
      return state.setIn(['post_token', 'data'], action.data)
        .setIn(['post_token', 'loading'], action.loading)
        .setIn(['post_token', 'error'], action.error)

        case 'INSERT_TOKEN_BEGIN':
          return state.setIn(['insert_token', 'loading'], action.loading)
            .setIn(['insert_token', 'error'], action.error)
        case 'INSERT_TOKEN_SUCCESS':
          return state.setIn(['insert_token', 'data'], action.data)
            .setIn(['insert_token', 'loading'], action.loading)
            .setIn(['insert_token', 'error'], action.error)
        case 'INSERT_TOKEN_FAIL':
          return state.setIn(['insert_token', 'data'], action.data)
            .setIn(['insert_token', 'loading'], action.loading)
            .setIn(['insert_token', 'error'], action.error)

  
    default:
      return state
  }
}