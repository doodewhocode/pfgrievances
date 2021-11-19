import serverCall from '../../modules/serverCall'

export const submitQuery = (payload) => {
    return dispatch => {
        dispatch({ type: 'SUB_QUERY_LOADING', loading: true, error: false })
        return serverCall({
            method: 'post',
            url: '/query',
            data: payload
        }).then(res => {
            return dispatch({ type: 'SUB_QUERY', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'SUB_QUERY_ERROR', loading: false, data: err, error: true })
        })
    }
}