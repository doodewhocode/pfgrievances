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

export const updateQuery = (payload) => {
    return dispatch => {
        dispatch({ type: 'UPDATE_QUERY_LOADING', loading: true, error: false })
        return serverCall({
            method: 'POST',
            url: '/updatequery',
            data: payload
        }).then(res => {
            return dispatch({ type: 'UPDATE_QUERY', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'UPDATE_QUERY_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const fetchFileById = (id) => {
    return dispatch => {
        dispatch({ type: 'FILE_BY_ID_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/view/' + id,
        }).then(res => {
            return dispatch({ type: 'FILE_BY_ID', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'FILE_BY_ID_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const downloadFileById = (id) => {
    return dispatch => {
        dispatch({ type: 'DOWNLOAD_BY_ID_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/download/' + id,
        }).then(res => {
            return dispatch({ type: 'DOWNLOAD_BY_ID', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'DOWNLOAD_BY_ID_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const fetchFileByName = (id) => {
    return dispatch => {
        dispatch({ type: 'FILE_BY_NAME_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/file/' + id,
        }).then(res => {
            return dispatch({ type: 'FILE_BY_NAME', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'FILE_BY_NAME_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const updateFileQuery = (payload) => {
    return dispatch => {
        dispatch({ type: 'UPDATE_FILE_QUERY_LOADING', loading: true, error: false })
        return serverCall({
            method: 'POST',
            url: '/updatefilequery',
            data: payload
        }).then(res => {
            return dispatch({ type: 'UPDATE_FILE_QUERY', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'UPDATE_FILE_QUERY_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const clearFileLoadOnSwitch = () => dispatch => {
    dispatch({ type: 'FILE_BY_ID_LOADING', loading: true, error: false })
    dispatch({ type: 'FILE_BY_NAME_LOADING', loading: true, error: false })
    dispatch({ type: 'DOWNLOAD_BY_ID_LOADING', loading: true, error: false })
}