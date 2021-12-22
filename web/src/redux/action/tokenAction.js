import { login } from '../../modules/serverCall'

export const postToken = (email, password) => dispatch => {
  dispatch({ type: POST_TOKEN_BEGIN, loading: true, error: false })
  return login(email, password).then(res => {
    dispatch({ type: POST_TOKEN_SUCCESS, loading: false, data: res.data, error: false })
    //return res
  }).catch(error => {
    dispatch({ type: POST_TOKEN_FAIL, loading: false, data: error, error: true })
    //throw error
  })
}

export const insertToken = () => dispatch => {
  dispatch({ type: 'INSERT_TOKEN_BEGIN', loading: true, error: false })
  let token
  if (localStorage.getItem('auth') !== 'undefined') {
    token = JSON.parse(localStorage.getItem('auth'))
    dispatch({ type: INSERT_TOKEN_SUCCESS, loading: false, data: token, error: false })
  } else {
    dispatch({ type: INSERT_TOKEN_FAIL, loading: false, data: "Login is invalid", error: true })
  }
}

export const logoutHandle = () => dispatch => {
  dispatch({ type: POST_TOKEN_BEGIN, loading: true, error: false })
  dispatch({ type: 'INSERT_TOKEN_BEGIN', loading: true, error: false })
}

export const POST_TOKEN_BEGIN = 'POST_TOKEN_BEGIN'
export const POST_TOKEN_SUCCESS = 'POST_TOKEN_SUCCESS'
export const POST_TOKEN_FAIL = 'POST_TOKEN_FAIL'
export const INSERT_TOKEN_SUCCESS = 'INSERT_TOKEN_SUCCESS'
export const INSERT_TOKEN_FAIL = 'INSERT_TOKEN_FAIL'