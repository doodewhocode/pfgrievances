import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Header from '../header'
import { registerEmployee } from '../../redux/action/registerAction'
import Confirmation from '../../components/confirmation'
import Toast from '../../components/toast'


let validationList = ['firstName', 'dob', 'pfNo', 'uanNo', 'emailId', 'phNo', 'userType', 'password', 'confirmPassword']

let initializeObj = {
    "firstName": "",
    "lastName": "",
    "dob": "",
    "uanNo": "",
    "pfNo": "",
    "employerName": "",
    emailId: "",
    phNo: "",
    panImg: "",
    aadharImg: "",
    hrEmailId: "",
    hrMobileNo: "",
    password: "",
    confirmPassword: "",
    userType: "employee"
}

function EmployeeSignUp(props) {
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
        console.log("asdfasd")
        let isValid = isValidForm(form)
        if (isValid) {
            setShowModal(true)
        } else {
            setToast(prevState => {
                prevState.message = "Please fill the * mandatory fields"
                prevState.type = "info"
                prevState.visible = true
                return ({ ...prevState })
            })

            setTimeout(() => {
                setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
            }, 2000)
        }
    }

    function onClear() {
        console.log("asdfasd")
        setForm((prevState) => {
            for (var key in initializeObj) {
                prevState[key] = initializeObj[key]
            }
            return ({ ...prevState })
        })
        console.log(form)

    }

    function handleConfirmation(value) {
        if (value === 'yes') {
            props.registerEmployee(form)
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
                                        <label>Name As in Adhaar<span class="mandatory">*</span></label>
                                        <input id={'firstName'} type="text" class="form-control" placeholder="Enter Name" value={form.firstName} onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Date of Birth As per Adhaar<span class="mandatory">*</span></label>
                                        <input id={'dob'} type="date" class="form-control" placeholder="Enter Date of Birth" value={form.dob} onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>UAN Number<span class="mandatory">*</span></label>
                                        <input id={'uanNo'} type="text" class="form-control" placeholder="Enter UAN Number" value={form.uanNo} onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>PF Account Number<span class="mandatory">*</span></label>
                                        <input id={'pfNo'} type="text" value={form.pfNo} class="form-control" placeholder="Enter PF Account Number"
                                            onChange={(e) => {
                                                if (isNaN(Number(e.target.value))) {
                                                    return;
                                                } else onChangeHandler(e)
                                            }} />
                                    </div>
                                </div>

                                <div class="form-group w-100">
                                    <label>Employer / Company Name </label>
                                    <input id={'employerName'} type="text" class="form-control" value={form.employerName} placeholder="Enter Employer / Company Name" onChange={(e) => onChangeHandler(e)} />
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Registered Email ID<span class="mandatory">*</span> </label>
                                        <input id={'emailId'} type="email" class="form-control" value={form.emailId} placeholder="Enter Registered Email ID" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Phone Number<span class="mandatory">*</span></label>
                                        <input id={'phNo'} type="text" class="form-control" value={form.phNo} placeholder="Enter Phone Number" onChange={(e) => {
                                            if (isNaN(Number(e.target.value))) {
                                                return;
                                            } else onChangeHandler(e)
                                        }} />
                                    </div>
                                </div>
                                {/* <div class="input-group flex-nowrap ">
                                    <div class="form-group w-100">
                                        <label>Upload Pan Card<span class="mandatory">*</span> </label>
                                        <input id={'panImg'} class="w-100" type="file" name="file" id={'panImg'} onChange={(e) => onFileChange(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Upload Aadhar card<span class="mandatory">*</span> </label>
                                        <input id={'aadharImg'} class="w-100" type="file" name="file" id={'aadharImg'} onChange={(e) => onFileChange(e)} />
                                    </div>
                                </div> */}
                                <div class="pb-3">HR Contact Details</div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Mobile Number </label>
                                        <input id={'hrEmailId'} type="email" class="form-control" value={form.hrEmailId} placeholder="Enter Mobile Number" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Email ID </label>
                                        <input id={'hrMobileNo'} type="text" class="form-control" value={form.hrMobileNo} placeholder="Enter Email ID" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                </div>

                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Password <span class="mandatory">*</span> </label>
                                        <input id={'password'} type="password" class="form-control" value={form.password} placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Confirm Password<span class="mandatory">*</span> </label>
                                        <input id={'confirmPassword'} type="password" value={form.confirmPassword} class="form-control" placeholder="Password" onChange={(e) => onChangeHandler(e)} />
                                    </div>
                                </div>
                                <div class="d-flex  align-items-center justify-content-end pb-2">
                                    <button type="button" class="btn-sm btn-secondary" onClick={onClear} >Clear</button>
                                    <button type="button" class="btn-sm btn-common ml-2" onClick={onSubmit} >Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

const mapStoreToProps = state => ({
    employee_reg_loading: state.registerReducer.getIn(['employee_reg', 'loading'], true),
    employee_reg: state.registerReducer.getIn(['employee_reg'], new Map())

})
const mapDispatchToProps = {
    registerEmployee
}

export default connect(mapStoreToProps, mapDispatchToProps)(EmployeeSignUp)