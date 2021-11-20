import { fromJS } from 'immutable'
let initialState = fromJS({});
function DashboardReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_EMPLOYEE_REQS_LOADING':
            return state.setIn(['empl_reqs', 'loading'], action.loading)
                .setIn(['empl_reqs', 'error'], action.error)
        case 'GET_EMPLOYEE_REQS':
            return state.setIn(['empl_reqs', 'data'], action.data)
                .setIn(['empl_reqs', 'loading'], action.loading)
                .setIn(['empl_reqs', 'error'], action.error)
        case 'GET_EMPLOYEE_REQS_ERROR':
            return state.setIn(['empl_reqs', 'data'], action.data)
                .setIn(['empl_reqs', 'loading'], action.loading)
                .setIn(['empl_reqs', 'error'], action.error)

        case 'GET_EMPLOYER_REQS_LOADING':
            return state.setIn(['emplr_reqs', 'loading'], action.loading)
                .setIn(['emplr_reqs', 'error'], action.error)
        case 'GET_EMPLOYER_REQS':
            return state.setIn(['emplr_reqs', 'data'], action.data)
                .setIn(['emplr_reqs', 'loading'], action.loading)
                .setIn(['emplr_reqs', 'error'], action.error)
        case 'GET_EMPLOYER_REQS_ERROR':
            return state.setIn(['emplr_reqs', 'data'], action.data)
                .setIn(['emplr_reqs', 'loading'], action.loading)
                .setIn(['emplr_reqs', 'error'], action.error)

        case 'GET_ADMIN_REQS_LOADING':
            return state.setIn(['admin_reqs', 'loading'], action.loading)
                .setIn(['admin_reqs', 'error'], action.error)
        case 'GET_ADMIN_REQS':
            return state.setIn(['admin_reqs', 'data'], action.data)
                .setIn(['admin_reqs', 'loading'], action.loading)
                .setIn(['admin_reqs', 'error'], action.error)
        case 'GET_ADMIN_REQS_ERROR':
            return state.setIn(['admin_reqs', 'data'], action.data)
                .setIn(['admin_reqs', 'loading'], action.loading)
                .setIn(['admin_reqs', 'error'], action.error)


        default:
            return state
    }
}

export default DashboardReducer