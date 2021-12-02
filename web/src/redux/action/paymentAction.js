import serverCall from '../../modules/serverCall'

export const initiatePayment = (payload) => {
    return dispatch => {
        dispatch({ type: 'INIT_PAYMENT_LOADING', loading: true, error: false })
        return serverCall({
            method: 'post',
            url: '/initiate_payment',
            data: payload
        }).then(res => {
            return dispatch({ type: 'INIT_PAYMENT', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'INIT_PAYMENT_ERROR', loading: false, data: err, error: true })
        })
    }
}