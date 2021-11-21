import serverCall from '../../modules/serverCall'

export const fetchGrivById = (id) => {
    return dispatch => {
        dispatch({ type: 'GRIV_BY_ID_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/getgrivbyid?id=' + id,
        }).then(res => {
            return dispatch({ type: 'GRIV_BY_ID', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'GRIV_BY_ID_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const fetchUserById = (id) => {
    return dispatch => {
        dispatch({ type: 'USER_BY_ID_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/fetchuserbyid?id=' + id,
        }).then(res => {
            return dispatch({ type: 'USER_BY_ID', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'USER_BY_ID_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const updateQuery = (id) => {
    return dispatch => {
        // dispatch({ type: 'GRIV_BY_ID_LOADING', loading: true, error: false })
        // return serverCall({
        //     method: 'GET',
        //     url: '/getgrivbyid?id=' + id,
        // }).then(res => {
        //     return dispatch({ type: 'GRIV_BY_ID', loading: false, data: res.data, error: false })
        // }).catch(err => {
        //     dispatch({ type: 'GRIV_BY_ID_ERROR', loading: false, data: err, error: true })
        // })
    }
}