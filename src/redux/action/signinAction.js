import serverCall from '../../modules/serverCall'

export const signin = (fullname, email, password, verifyPassword) => dispatch => {
  dispatch({ type: POST_SIGNIN_BEGIN, })
  return serverCall({
    method: 'POST', url: '/signin',
    data: {
      fullname, email, password, verifyPassword
    }
  }).then(res => {
    dispatch({ type: POST_SIGNIN_SUCCESS, payload: res })
    return res
  }).catch(error => {
    dispatch({ type: POST_SIGNIN_FAIL, payload: { error } })
    throw error
  })
}

export const forgotpassword = (payload) => dispatch => {
  dispatch({ type: 'FORGOT_PWD_LOADING' })
  return serverCall({
    method: 'POST', url: '/forgotpasswordResponse',
    data: payload
  }).then(res => {
    dispatch({ type: 'FORGOT_PWD', payload: res })
    return res
  }).catch(error => {
    dispatch({ type: 'FORGOT_PWD_ERROR', payload: { error } })
    throw error
  })
}

export const POST_SIGNIN_BEGIN = 'POST_SIGNIN_BEGIN'
export const POST_SIGNIN_SUCCESS = 'POST_SIGNIN_SUCCESS'
export const POST_SIGNIN_FAIL = 'POST_SIGNIN_FAIL'