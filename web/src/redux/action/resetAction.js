import serverCall from '../../modules/serverCall'

export const requestPasswordChange = (payload) => {
    return dispatch => {
        dispatch({ type: 'REQ_PWD_CHANGE_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/forgotpasswordResponse`, data: payload }).then(res => {
            return dispatch({ type: 'REQ_PWD_CHANGE', loading: false, data: res.data.order, error: false })
        }).catch(err => {
            dispatch({ type: 'REQ_PWD_CHANGE_ERROR', loading: false, data: getErrorMsg(err), error: true })
        })
    }
}

export const checkResetToken = (token) => {
    return dispatch => {
        dispatch({ type: 'CHECK_RESET_TOKEN_LOADING', loading: true, error: false })
        return serverCall({ method: 'GET', url: `/reset/` + token }).then(res => {
            return dispatch({ type: 'CHECK_RESET_TOKEN', loading: false, data: res.data.order, error: false })
        }).catch(err => {
            dispatch({ type: 'CHECK_RESET_TOKEN_ERROR', loading: false, data: getErrorMsg(err), error: true })
        })
    }
}

export const resetPassword = (token, payload) => {
    return dispatch => {
        dispatch({ type: 'RESET_PASSWORD_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/reset/` + token, data: payload }).then(res => {
            return dispatch({ type: 'RESET_PASSWORD', loading: false, data: res.data.order, error: false })
        }).catch(err => {
            dispatch({ type: 'RESET_PASSWORD_ERROR', loading: false, data: getErrorMsg(err), error: true })
        })
    }
}

function getErrorMsg(error) {
	let errorMsg = "Internal Server Error"
	if (error && error.response) {
		errorMsg = error.response.data
	}
	return errorMsg
}