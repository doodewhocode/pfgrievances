import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerEmployer } from '../../redux/action/registerAction'
import Confirmation from '../../components/confirmation'
import Toast from '../../components/toast'

import "./signup.scss"
import Header from '../header'
let validationList = ['firstName', 'emailId', 'phNo', 'userType', 'password', 'confirmPassword']
let initializeObj = {
    "firstName": "",
    "lastName": "",
    emailId: "",
    phNo: "",
    password: "",
    confirmPassword: "",
    userType: "admin"
}

function AdminSignUp(props) {
    const [form, setForm] = useState(initializeObj)
    const [showModal, setShowModal] = useState(false)
    const [toast, setToast] = useState({
        type: '',
        message: '',
        visible: false
    })

    useEffect(() => {
        if (!props.employee_reg_loading) {
            if (!props.employee_reg.toJS().error) {
                onClear();
                setToast(prevState => {
                    prevState.message = "Registration is completed"
                    prevState.type = "success"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            } else {
                setToast(prevState => {
                    prevState.message = "Registration is failed, Please try again."
                    prevState.type = "error"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            }
        }
    }, [props.employee_reg_loading])

    function validateEmail(email) { //Validates the email address
        var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) { //Validates the phone number
        var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
        return phoneRegex.test(phone);
    }

    function isValidForm(form) {
        for (let i = 0; i < validationList.length; i++) {
            if (form[validationList[i]].trim().length == 0) {
                return false;
            }
            if (validationList[i] === 'phNo') {
                return validatePhone(form[validationList[i]].trim())
            }
            if (validationList[i] === 'emailId') {
                return validateEmail(form[validationList[i]].trim())
            }
        }

        if (form['password'].trim() !== form['confirmPassword'].trim()) {
            return false
        }
        return true;
    }



    function onChangeHandler(e) {
        let key = e.target.id, value = e.target.value
        setForm(prevState => {
            prevState[key] = value
            return ({ ...prevState })
        })
    }

    function onSubmit() {
        let isValid = isValidForm(form)
        if (isValid) {
            setShowModal(true)

        } else {
            console.log("Please provide the mandatory information")
            setToast(prevState => {
                prevState.message = "Please fill the * mandatory fields"
                prevState.type = "info"
                prevState.visible = true
                return ({ ...prevState })
            })

            setTimeout(() => {
                setToast(prevState => {
                    prevState.visible = false
                    return ({ ...prevState })
                })
            }, 2000)
        }

    }

    function onClear() {

        setForm(prevState => {
            for (let key in initializeObj) {
                prevState[key] = initializeObj[key]
            }
            return ({ ...prevState })
        })
    }

    function handleConfirmation(value) {
        if (value === 'yes') {
            props.registerEmployer(form)
        } else {
            setShowModal(false)
        }
    }
    function handleClose() {
        setShowModal(false)
    }


    return (
        <>
            <Header />
            <Toast message={toast.message} type={toast.type} visible={toast.visible} />
            <Confirmation showModal={showModal} handleClose={handleClose} title={'Confirmation'} handleConfirmationMessage={handleConfirmation} >
                Are you sure you want to register with ComplyHR ?
            </Confirmation>
            <section class="pf-signup pt-5" id="particles-js">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 m-auto">
                            <div class="signup-wrapper mt-5 mb-5">
                                <div class="header d-flex align-items-center">Register</div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>First Name<span class="mandatory">*</span></label>
                                        <input type="text" id="firstName" class="form-control" placeholder="Enter First Name" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Last Name<span class="mandatory">*</span></label>
                                        <input type="text" id="lastName" class="form-control" placeholder="Enter Last Name" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Registered Email ID <span class="mandatory">*</span></label>
                                        <input type="email" id="emailId" class="form-control" placeholder="Enter Registered Email ID" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Phone Number<span class="mandatory">*</span></label>
                                        <input type="text" id="phNo" class="form-control" placeholder="Enter Phone Number" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Password <span class="mandatory">*</span></label>
                                        <input id={'password'} type="password" class="form-control" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Confirm Password <span class="mandatory">*</span></label>
                                        <input id={'confirmPassword'} type="password" class="form-control" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                </div>
                                <div class="d-flex  align-items-center justify-content-end pb-2">
                                    <button type="button" class="btn-sm btn-common ml-2" onClick={onSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div></div>
            </section>
        </>

    )
}

const mapStoreToProps = state => ({
    employee_reg_loading: state.registerReducer.getIn(['employee_reg', 'loading'], true),
    employee_reg: state.registerReducer.getIn(['employee_reg'], new Map())
})
const mapDispatchToProps = {
    registerEmployer
}

export default connect(mapStoreToProps, mapDispatchToProps)(AdminSignUp)