import { fromJS } from 'immutable'
let initialState = fromJS({});
function PaymentReducer(state = initialState, action) {
    switch (action.type) {
        case 'INIT_PAYMENT_LOADING':
            return state.setIn(['init_payment', 'loading'], action.loading)
                .setIn(['init_payment', 'error'], action.error)
        case 'INIT_PAYMENT':
            return state.setIn(['init_payment', 'data'], action.data)
                .setIn(['init_payment', 'loading'], action.loading)
                .setIn(['init_payment', 'error'], action.error)
        case 'INIT_PAYMENT_ERROR':
            return state.setIn(['init_payment', 'data'], action.data)
                .setIn(['init_payment', 'loading'], action.loading)
                .setIn(['init_payment', 'error'], action.error)
        default:
            return state
    }
}

export default PaymentReducer