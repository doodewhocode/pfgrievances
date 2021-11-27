import serverCall from '../../modules/serverCall'
import axios from 'axios'
let BASE_URL = 'http://localhost:7000'
//https://complyhrapi.herokuapp.com
export const registerEmployee = (payload) => {
    return dispatch => {
        dispatch({ type: 'EMPLOYEE_REG_LOADING', loading: true, error: false })
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:7000/employee_register',
        //     data: formData,
        //     headers: { 'Content-Type': 'multipart/form-data' }
        //   });
        return axios.post(BASE_URL + "/employee_register", payload, {}).then(res => {
            return dispatch({ type: 'EMPLOYEE_REG', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'EMPLOYEE_REG_ERROR', loading: false, data: err, error: true })
        })
    }
}


export const registerEmployer = (payload) => {
    return dispatch => {
        dispatch({ type: 'EMPLOYER_REG_LOADING', loading: true, error: false })
        return axios.post(BASE_URL + "/register", payload, {}).then(res => {
            return dispatch({ type: 'EMPLOYER_REG', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'EMPLOYER_REG_ERROR', loading: false, data: err, error: true })
        })
    }
}


export const updateUser = (payload)=>{
    return dispatch => {
        dispatch({ type: 'UPDATE_USER_LOADING', loading: true, error: false })
        return serverCall({
            method: 'POST',
            url: '/updateuser',
            data: payload
        }).then(res => {
            return dispatch({ type: 'UPDATE_USER', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'UPDATE_USER_ERROR', loading: false, data: err, error: true })
        })
    }
}