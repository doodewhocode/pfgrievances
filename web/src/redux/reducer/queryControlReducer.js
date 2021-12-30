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

        case 'UPDATE_QUERY_CTL_LOADING':
            return state.setIn(['update_query_ctl', 'loading'], action.loading)
                .setIn(['update_query_ctl', 'error'], action.error)
        case 'UPDATE_QUERY_CTL':
            return state.setIn(['update_query_ctl', 'data'], action.data)
                .setIn(['update_query_ctl', 'loading'], action.loading)
                .setIn(['update_query_ctl', 'error'], action.error)
        case 'UPDATE_QUERY_CTL_ERROR':
            return state.setIn(['update_query_ctl', 'data'], action.data)
                .setIn(['update_query_ctl', 'loading'], action.loading)
                .setIn(['update_query_ctl', 'error'], action.error)

        case 'DELETE_QUERY_CTL_LOADING':
            return state.setIn(['delete_query_ctl', 'loading'], action.loading)
                .setIn(['delete_query_ctl', 'error'], action.error)
        case 'DELETE_QUERY_CTL':
            return state.setIn(['delete_query_ctl', 'data'], action.data)
                .setIn(['delete_query_ctl', 'loading'], action.loading)
                .setIn(['delete_query_ctl', 'error'], action.error)
        case 'DELETE_QUERY_CTL_ERROR':
            return state.setIn(['delete_query_ctl', 'data'], action.data)
                .setIn(['delete_query_ctl', 'loading'], action.loading)
                .setIn(['delete_query_ctl', 'error'], action.error)

        case 'QUERY_LIST_LOADING':
            return state.setIn(['query_list', 'loading'], action.loading)
                .setIn(['query_list', 'error'], action.error)
        case 'QUERY_LIST':
            return state.setIn(['query_list', 'data'], action.data)
                .setIn(['query_list', 'loading'], action.loading)
                .setIn(['query_list', 'error'], action.error)
        case 'QUERY_LIST_ERROR':
            return state.setIn(['query_list', 'data'], action.data)
                .setIn(['query_list', 'loading'], action.loading)
                .setIn(['query_list', 'error'], action.error)


        case 'DELETE_FILE_BY_ID_LOADING':
            return state.setIn(['delete_file_by_id', 'loading'], action.loading)
                .setIn(['delete_file_by_id', 'error'], action.error)
        case 'DELETE_FILE_BY_ID':
            return state.setIn(['delete_file_by_id', 'data'], action.data)
                .setIn(['delete_file_by_id', 'loading'], action.loading)
                .setIn(['delete_file_by_id', 'error'], action.error)
        case 'DELETE_FILE_BY_ID_ERROR':
            return state.setIn(['delete_file_by_id', 'data'], action.data)
                .setIn(['delete_file_by_id', 'loading'], action.loading)
                .setIn(['delete_file_by_id', 'error'], action.error)

            
        default:
            return state
    }
}

export default QueryControlReducer