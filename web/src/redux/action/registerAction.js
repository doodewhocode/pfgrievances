import serverCall from '../../modules/serverCall'
import axios from 'axios'

export const registerEmployee = (payload) => {
    return dispatch => {
        dispatch({ type: 'EMPLOYEE_REG_LOADING', loading: true, error: false })

        return axios({
            method: "post",
            url: "http://localhost:7000/employee_register",
            data: payload            
        }).then(res => {
            return dispatch({ type: 'EMPLOYEE_REG', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'EMPLOYEE_REG_ERROR', loading: false, data: err, error: true })
        })
    }
}


export const registerEmployer = (payload) => {
    return dispatch => {
        dispatch({ type: 'EMPLOYER_REG_LOADING', loading: true, error: false })
        return serverCall({ method: 'POST', url: `/product`, data: payload }).then(res => {
            return dispatch({ type: 'EMPLOYER_REG', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'EMPLOYER_REG_ERROR', loading: false, data: err, error: true })
        })
    }
}