import { fromJS } from 'immutable'
let initialState = fromJS({});
function QueryControlReducer(state = initialState, action) {
    switch (action.type) {
        case 'CREATE_QUERY_LOADING':
            return state.setIn(['create_query', 'loading'], action.loading)
                .setIn(['create_query', 'error'], action.error)
        case 'CREATE_QUERY':
            return state.setIn(['create_query', 'data'], action.data)
                .setIn(['create_query', 'loading'], action.loading)
                .setIn(['create_query', 'error'], action.error)
        case 'CREATE_QUERY_ERROR':
            return state.setIn(['create_query', 'data'], action.data)
                .setIn(['create_query', 'loading'], action.loading)
                .setIn(['create_query', 'error'], action.error)
        default:
            return state
    }
}

export default QueryControlReducer