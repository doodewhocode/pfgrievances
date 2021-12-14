import serverCall from '../../modules/serverCall'

export const signin = (fullname, email, password, verifyPassword) => dispatch => {
  dispatch({ type: POST_SIGNIN_BEGIN, loading: true, error: false })
  return serverCall({
    method: 'POST', url: '/signin',
    data: {
      fullname, email, password, verifyPassword
    }
  }).then(res => {
    dispatch({ type: POST_SIGNIN_SUCCESS, loading: false, data: res.data, error: false })
    return res
  }).catch(error => {
    dispatch({ type: POST_SIGNIN_FAIL, loading: false, data: error, error: true })
    throw error
  })
}

export const forgotpassword = (payload) => dispatch => {
  dispatch({ type: 'FORGOT_PWD_LOADING', loading: true, error: false })
  return serverCall({
    method: 'POST', url: '/forgotpasswordResponse',
    data: payload
  }).then(res => {
    dispatch({ type: 'FORGOT_PWD', loading: false, data: res.data, error: false })
    return res
  }).catch(error => {
    dispatch({ type: 'FORGOT_PWD_ERROR', loading: false, data: error, error: true })
    throw error
  })
}

export const POST_SIGNIN_BEGIN = 'POST_SIGNIN_BEGIN'
export const POST_SIGNIN_SUCCESS = 'POST_SIGNIN_SUCCESS'
export const POST_SIGNIN_FAIL = 'POST_SIGNIN_FAIL'