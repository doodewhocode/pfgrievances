import { fromJS } from 'immutable'
let initialState = fromJS({});
function TrackReducer(state = initialState, action) {
    switch (action.type) {
        case 'GRIV_BY_ID_LOADING':
            return state.setIn(['griv_by_id', 'loading'], action.loading)
                .setIn(['griv_by_id', 'error'], action.error)
        case 'GRIV_BY_ID':
            return state.setIn(['griv_by_id', 'data'], action.data)
                .setIn(['griv_by_id', 'loading'], action.loading)
                .setIn(['griv_by_id', 'error'], action.error)
        case 'GRIV_BY_ID_ERROR':
            return state.setIn(['griv_by_id', 'data'], action.data)
                .setIn(['griv_by_id', 'loading'], action.loading)
                .setIn(['griv_by_id', 'error'], action.error)

        case 'USER_BY_ID_LOADING':
            return state.setIn(['user_by_id', 'loading'], action.loading)
                .setIn(['user_by_id', 'error'], action.error)
        case 'USER_BY_ID':
            return state.setIn(['user_by_id', 'data'], action.data)
                .setIn(['user_by_id', 'loading'], action.loading)
                .setIn(['user_by_id', 'error'], action.error)
        case 'USER_BY_ID_ERROR':
            return state.setIn(['user_by_id', 'data'], action.data)
                .setIn(['user_by_id', 'loading'], action.loading)
                .setIn(['user_by_id', 'error'], action.error)

        case 'UPDATE_QUERY_LOADING':
            return state.setIn(['update_query', 'loading'], action.loading)
                .setIn(['update_query', 'error'], action.error)
        case 'UPDATE_QUERY':
            return state.setIn(['update_query', 'data'], action.data)
                .setIn(['update_query', 'loading'], action.loading)
                .setIn(['update_query', 'error'], action.error)
        case 'UPDATE_QUERY_ERROR':
            return state.setIn(['update_query', 'data'], action.data)
                .setIn(['update_query', 'loading'], action.loading)
                .setIn(['update_query', 'error'], action.error)

        case 'FILE_BY_ID_LOADING':
            return state.setIn(['file_by_id', 'loading'], action.loading)
                .setIn(['file_by_id', 'error'], action.error)
        case 'FILE_BY_ID':
            return state.setIn(['file_by_id', 'data'], action.data)
                .setIn(['file_by_id', 'loading'], action.loading)
                .setIn(['file_by_id', 'error'], action.error)
        case 'FILE_BY_ID_ERROR':
            return state.setIn(['file_by_id', 'data'], action.data)
                .setIn(['file_by_id', 'loading'], action.loading)
                .setIn(['file_by_id', 'error'], action.error)

        case 'FILE_BY_NAME_LOADING':
            return state.setIn(['file_by_name', 'loading'], action.loading)
                .setIn(['file_by_name', 'error'], action.error)
        case 'FILE_BY_NAME':
            return state.setIn(['file_by_name', 'data'], action.data)
                .setIn(['file_by_name', 'loading'], action.loading)
                .setIn(['file_by_name', 'error'], action.error)
        case 'FILE_BY_NAME_ERROR':
            return state.setIn(['file_by_name', 'data'], action.data)
                .setIn(['file_by_name', 'loading'], action.loading)
                .setIn(['file_by_name', 'error'], action.error)

        default:
            return state
    }
}

export default TrackReducer