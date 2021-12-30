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


export const deleteQuery = (id) => {
    return dispatch => {
        dispatch({ type: 'DELETE_QUERY_CTL_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/deletequeryctl?id=' + id
        }).then(res => {
            return dispatch({ type: 'DELETE_QUERY_CTL', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'DELETE_QUERY_CTL_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const fetchAllQuery = () => {
    return dispatch => {
        dispatch({ type: 'QUERY_LIST_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/fetchallquery'
        }).then(res => {
            return dispatch({ type: 'QUERY_LIST', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'QUERY_LIST_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const deleteFilebyId = (queryId, fileId) => {
    return dispatch => {
        dispatch({ type: 'DELETE_FILE_BY_ID_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/deletefilebyid?type=query&typeid=' + queryId + '&fileid=' + fileId
        }).then(res => {
            return dispatch({ type: 'DELETE_FILE_BY_ID', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'DELETE_FILE_BY_ID_ERROR', loading: false, data: err, error: true })
        })
    }
}