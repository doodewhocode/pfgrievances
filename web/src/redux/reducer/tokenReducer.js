import {
  POST_TOKEN_BEGIN,
  POST_TOKEN_SUCCESS,
  POST_TOKEN_FAIL,
  INSERT_TOKEN_SUCCESS,
  INSERT_TOKEN_FAIL
} from '../action/tokenAction'

const initialState = {
  login: {
    loading: true,
    error: false,  
    data: {}
  },
  insert_token_error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_TOKEN_BEGIN:
      return {
        ...state,
        login: {
          loading: true,
          error: false,  
          data: {}
        }
        
      }
    case POST_TOKEN_SUCCESS:
      return {
        ...state,
        login: {
          loading: false,
          error: false,  
          data: action.payload.data.user_token
        }        
      }
    case POST_TOKEN_FAIL:
      return {
        ...state,
        login: {
          loading: false,
          error: true,  
          data: action.payload.error.response.data
        }        
      }
    case INSERT_TOKEN_SUCCESS:
      return {
        ...state,
        user_token: action.payload,
        insert_token_error: false
      }
    case INSERT_TOKEN_FAIL:
      return {
        ...state,
        insert_token_error: true
      }
    default:
      return state
  }
}