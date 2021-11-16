import serverCall from '../../modules/serverCall'
import axios from 'axios'

export const registerEmployee = (payload) => {
    return dispatch => {
        dispatch({ type: 'EMPLOYEE_REG_LOADING', loading: true, error: false })
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:7000/employee_register',
        //     data: formData,
        //     headers: { 'Content-Type': 'multipart/form-data' }
        //   });
        return axios.post("https://complyhrapi.herokuapp.com/employee_register",payload, {}).then(res => {
            return dispatch({ type: 'EMPLOYEE_REG', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'EMPLOYEE_REG_ERROR', loading: false, data: err, error: true })
        })
    }
}


export const registerEmployer = (payload) => {
    return dispatch => {
        dispatch({ type: 'EMPLOYER_REG_LOADING', loading: true, error: false })
        return axios.post("https://complyhrapi.herokuapp.com/employer_register",payload, {}).then(res => {
            return dispatch({ type: 'EMPLOYER_REG', loading: false, data: res.data, error: false })
        }).catch(err => {
            dispatch({ type: 'EMPLOYER_REG_ERROR', loading: false, data: err, error: true })
        })
    }
}