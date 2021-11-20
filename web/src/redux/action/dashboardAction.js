import serverCall from '../../modules/serverCall'

export const fetchEmployeeReqs = (id) => {
    return dispatch => {
        dispatch({ type: 'GET_EMPLOYEE_REQS_LOADING', loading: true, error: false })
        return serverCall({
            method: 'GET',
            url: '/getemployeereq?id=' + id,
        }).then(res => {
            return dispatch({ type: 'GET_EMPLOYEE_REQS', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'GET_EMPLOYEE_REQS_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const getEmployeeChart = (payload) => {
    return dispatch => {
        dispatch({ type: 'EMPLOYEE_CHART_LOADING', loading: true, error: false })
        return serverCall({
            method: 'post',
            url: '/employeechart',
            data: payload
        }).then(res => {
            return dispatch({ type: 'EMPLOYEE_CHART', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'EMPLOYEE_CHART_ERROR', loading: false, data: err, error: true })
        })
    }
}



export const fetchEmployerReqs = (payload) => {
    return dispatch => {
        dispatch({ type: 'GET_EMPLOYER_REQS_LOADING', loading: true, error: false })
        return serverCall({
            method: 'post',
            url: '/getemployerreq',
            data: payload
        }).then(res => {
            return dispatch({ type: 'GET_EMPLOYER_REQS', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'GET_EMPLOYER_REQS_ERROR', loading: false, data: err, error: true })
        })
    }
}

export const fetchAdminReqs = (payload) => {
    return dispatch => {
        dispatch({ type: 'GET_ADMIN_REQS_LOADING', loading: true, error: false })
        return serverCall({
            method: 'post',
            url: '/getadminreq',
            data: payload
        }).then(res => {
            return dispatch({ type: 'GET_ADMIN_REQS', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'GET_ADMIN_REQS_ERROR', loading: false, data: err, error: true })
        })
    }
}