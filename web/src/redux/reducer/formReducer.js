import { fromJS } from 'immutable'
let initialState = fromJS({});
function FormReducer(state = initialState, action) {
    switch (action.type) {
        case 'SUB_QUERY_LOADING':
            return state.setIn(['sub_query', 'loading'], action.loading)
                .setIn(['sub_query', 'error'], action.error)
        case 'SUB_QUERY':
            return state.setIn(['sub_query', 'data'], action.data)
                .setIn(['sub_query', 'loading'], action.loading)
                .setIn(['sub_query', 'error'], action.error)
        case 'SUB_QUERY_ERROR':
            return state.setIn(['sub_query', 'data'], action.data)
                .setIn(['sub_query', 'loading'], action.loading)
                .setIn(['sub_query', 'error'], action.error)
        default:
            return state
    }
}

export default FormReducer