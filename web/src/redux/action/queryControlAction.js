import serverCall from '../../modules/serverCall'

export const createQuery = (payload) => {
    return dispatch => {
        dispatch({ type: 'CREATE_QUERY_LOADING', loading: true, error: false })
        return serverCall({
            method: 'post',
            url: '/createquery',
            data: payload
        }).then(res => {
            return dispatch({ type: 'CREATE_QUERY', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'CREATE_QUERY_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const updateQuery = (payload) => {
    return dispatch => {
        dispatch({ type: 'UPDATE_QUERY_CTL_LOADING', loading: true, error: false })
        return serverCall({
            method: 'post',
            url: '/updatequeryctl',
            data: payload
        }).then(res => {
            return dispatch({ type: 'UPDATE_QUERY_CTL', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'UPDATE_QUERY_CTL_ERROR', loading: false, data: err, error: true })
        })
    }
}