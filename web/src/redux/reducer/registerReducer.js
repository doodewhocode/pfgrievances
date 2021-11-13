import { fromJS } from 'immutable'
let initialState = fromJS({});
function RegisterReducer(state = initialState, action) {
    switch (action.type) {
        case 'EMPLOYEE_REG_LOADING':
            return state.setIn(['employee_reg', 'loading'], action.loading)
                .setIn(['employee_reg', 'error'], action.error)
        case 'EMPLOYEE_REG':
            return state.setIn(['employee_reg', 'data'], action.data)
                .setIn(['employee_reg', 'loading'], action.loading)
                .setIn(['employee_reg', 'error'], action.error)
        case 'EMPLOYEE_REG_ERROR':
            return state.setIn(['employee_reg', 'data'], action.data)
                .setIn(['employee_reg', 'loading'], action.loading)
                .setIn(['employee_reg', 'error'], action.error)

        case 'EMPLOYER_REG_LOADING':
            return state.setIn(['employer_reg', 'loading'], action.loading)
                .setIn(['employer_reg', 'error'], action.error)
        case 'EMPLOYER_REG':
            return state.setIn(['employer_reg', 'data'], action.data)
                .setIn(['employer_reg', 'loading'], action.loading)
                .setIn(['employer_reg', 'error'], action.error)
        case 'EMPLOYER_REG_ERROR':
            return state.setIn(['employer_reg', 'data'], action.data)
                .setIn(['employer_reg', 'loading'], action.loading)
                .setIn(['employer_reg', 'error'], action.error)
        default:
            return state
    }
}

export default RegisterReducer