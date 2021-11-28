import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { fetchUserById } from '../../redux/action/trackAction'
import { updateUser, uploadDoc } from '../../redux/action/registerAction'
import Confirmation from '../../components/confirmation'

let initializeObj = {
    "firstName": "",
    "lastName": "",
    "dob": "",
    "uanNo": "",
    "pfNo": "",
    "employerName": "",
    emailId: "",
    phNo: "",

    hrEmailId: "",
    hrMobileNo: "",
    userType: "employee",

    //employer
    seRegNo: "",
    panNo: "",
    pfRegNo: "",
    esicRegNo: "",
    pfOfficeAddr: "",
    esicOfficeAddr: "",

    //docs 
    panImg: {},
    aadharImg: {},
    additionalDoc: {
        tenThMarksheet: {},
        birthCert: {},
        affidivet: {}
    }
}

let validationList = ['firstName', 'dob', 'emailId', 'phNo']
function Profile(props) {
    const [user, setUser] = useState(initializeObj)
    const [showModal, setShowModal] = useState(false)
    const [doc, setDoc] = useState({
        panImg: {},
        aadharImg: {},
        tenThMarksheet: {},
        birthCert: {},
        affidivet: {}
    })

    const [docStatus, setDocStatus] = useState({
        panImg: false,
        aadharImg: false,
        tenThMarksheet: false,
        birthCert: false,
        affidivet: false
    })

    useEffect(() => {
        let userId = JSON.parse(localStorage.getItem('auth'))['userId']
        props.fetchUserById(userId)
    }, [])

    useEffect(() => {
        if (!props.user_by_id_loading) {
            if (!props.user_by_id.toJS().error) {
                let obj = props.user_by_id.toJS()['data']
                setUser((prevState) => {
                    for (var key in obj) {
                        prevState[key] = obj[key]
                    }
                    return ({ ...prevState })
                })

            }
        }
    }, [props.user_by_id_loading])

    useEffect(() => {
        if (!props.update_user_loading) {
            if (!props.update_user.toJS().error) {
                let obj = props.update_user.toJS()['data']
                setUser((prevState) => {
                    for (var key in obj) {
                        prevState[key] = obj[key]
                    }
                    return ({ ...prevState })
                })
                setShowModal(false)
            }
        }
    }, [props.update_user_loading])


    useEffect(() => {
        if (!props.upload_user_doc_loading) {
            if (!props.upload_user_doc.toJS().error) {

                let obj = props.upload_user_doc.toJS()['data']
                setUser((prevState) => {
                    for (var key in obj) {
                        prevState[key] = obj[key]
                    }
                    return ({ ...prevState })
                })
            }
        }
    }, [props.upload_user_doc_loading])


    const onFileChange = event => {
        let id = event.target.id, file = event.target.files[0]
        setDoc(prevState => {
            prevState[id] = file
            return ({ ...prevState })
        })
        setDocStatus(prevState => {
            prevState[id] = true
            return ({ ...prevState })
        })
    };

    function onChangeHandler(e) {
        let key = e.target.id, value = e.target.value
        setUser(prevState => {
            prevState[key] = value
            return ({ ...prevState })
        })
    }

    function isValidForm(form) {
        for (let i = 0; i < validationList.length; i++) {
            if (form[validationList[i]].trim().length == 0) {
                return false;
            }
        }
        return true;
    }

    function uploadDoc(type) {
        let formData = new FormData()
        //if (Object.keys(doc[type]).length > 0) {
        formData.set(type, doc[type])
        let isValid = isValidForm(user)
        if (isValid) {
            let obj = user
            for (let key in user) {
                formData.set(key, user[key])
            }
            props.uploadDoc(formData)
        }
        //}
    }

    function onClickSave() {
        let isValid = isValidForm(user)
        if (isValid) {
            let obj = docStatus
            for (let key in obj) {
                if (obj[key]) {
                    console.log("Please make sure press upload button to attach selected file")
                } else {
                    setShowModal(true)
                }
            }
        }
    }

    function handleConfirmation(value) {
        if (value === 'yes') {
            props.updateUser(user)
        } else {

        }
    }

    function handleClose() {
        setShowModal(false)
    }
    return (
        <>
            <div class="header-body ">
                <Confirmation showModal={showModal} handleClose={handleClose} title={'Confirmation'} handleConfirmationMessage={handleConfirmation} >
                    Are you sure you save the changes?
                </Confirmation>
                <div class="row">
                    <div class="col-xl-12 m-auto">
                        <div class="profile-wrapper mt-5">
                            <div class="profile-head d-flex align-items-center pl-4"> Profile </div>
                            <div className="col-md-12">
                                <div class="input-group mb-3 flex-nowrap mt-4">
                                    <div class="form-group w-100">
                                        <label>Name As in Adhaar<span class="mandatory">*</span></label>
                                        <input type="text" class="form-control" placeholder="Enter Name" disabled id={'firstName'} value={user.firstName} onChange={onChangeHandler} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Date of Birth As per Adhaar<span class="mandatory">*</span></label>
                                        <input type="date" class="form-control" placeholder="Enter Date of Birth" id={'dob'} value={user.dob} onChange={onChangeHandler} />
                                    </div>
                                </div>

                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>UAN Number</label>
                                        <input type="text" class="form-control" id={'uanNo'} value={user.uanNo} placeholder="Enter UAN Number" onChange={onChangeHandler} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>PF Account Number<span class="mandatory">*</span></label>
                                        <input type="text" class="form-control" id={'pfNo'} value={user.pfNo} placeholder="Enter PF Account Number" onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div class="form-group w-100">
                                    <label>Employer / Company Name </label>
                                    <input type="text" class="form-control" id={'employerName'} value={user.employerName} placeholder="Enter Employer / Company Name" onChange={onChangeHandler} />
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Registered Email ID </label>
                                        <input type="email" class="form-control" id={'emailId'} value={user.emailId} placeholder="Enter Registered Email ID" onChange={onChangeHandler} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Phone Number</label>
                                        <input type="text" class="form-control" id={'phNo'} value={user.phNo} placeholder="Enter Phone Number" onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div class="input-group flex-nowrap ">
                                    <div class="form-group w-100">
                                        <label>Pan Card* </label>
                                        <div className={'col-md-8'}> <input class="w-100" type="file" id={'panImg'} name="file" onChange={onFileChange} /><button className={'btn btn-secondary btn-sm'} onClick={() => uploadDoc("panImg")}>upload</button></div>
                                        <br />
                                        {Object.keys(user['panImg']).length > 0 && <span>* Pan Card Uploaded </span>}
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Aadhaar Card* </label>
                                        <div className={'col-md-8'}>  <input class="w-100" type="file" id={'aadharImg'} name="file" onChange={onFileChange} /> <button className={'btn btn-secondary btn-sm'} onClick={() => uploadDoc("aadharImg")}> upload</button></div>
                                        <br />
                                        {Object.keys(user['aadharImg']).length > 0 && <span>* Aadhaar Card Uploaded </span>}
                                    </div>
                                </div>
                                <hr />
                                <div class="pb-3">Additional Documents</div>
                                <div class="input-group flex-nowrap ">
                                    <div class="form-group w-100">
                                        <label>Affidivet </label>
                                        <div className={'col-md-8'}>   <input class="w-100" type="file" id={'tenThMarksheet'} name="file" onChange={onFileChange} /><button className={'btn btn-secondary btn-sm'} onClick={() => uploadDoc("tenThMarksheet")}> upload</button></div>
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Birth ceritificate </label>
                                        <div className={'col-md-8'}>   <input class="w-100" type="file" id={'birthCert'} name="file" onChange={onFileChange} /><button className={'btn btn-secondary btn-sm'} onClick={() => uploadDoc("birthCert")}> upload</button></div>
                                    </div>
                                </div>
                                <div class="input-group flex-nowrap ">
                                    <div class="form-group w-100">
                                        <label>10th Marksheet </label>
                                        <div className={'col-md-8'}>    <input class="w-100" type="file" id={'affidivet'} name="file" onChange={onFileChange} /><button className={'btn btn-secondary btn-sm'} onClick={() => uploadDoc("affidivet")}> upload</button></div>
                                    </div>
                                </div>
                                <div class="pb-3">HR Contact Details</div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Mobile Number </label>
                                        <input type="email" class="form-control" id={'hrEmailId'} value={user.hrEmailId} placeholder="Enter Mobile Number" onChange={onChangeHandler} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Email ID </label>
                                        <input type="text" class="form-control" id={'hrMobileNo'} value={user.hrMobileNo} placeholder="Enter Email ID" onChange={onChangeHandler} />
                                    </div>
                                </div>
                                <div class="d-flex  align-items-center justify-content-end pb-2">
                                    <button type="button" class="btn-sm btn-common ml-2" onClick={onClickSave}>Save</button>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3"></div>
                    </div>
                </div>

            </div>

        </>

    )

}

const mapStoreToProps = state => ({
    user_by_id_loading: state.trackReducer.getIn(['user_by_id', 'loading'], true),
    user_by_id: state.trackReducer.getIn(['user_by_id'], new Map()),

    update_user_loading: state.registerReducer.getIn(['update_user', 'loading'], true),
    update_user: state.registerReducer.getIn(['update_user'], new Map()),

    upload_user_doc_loading: state.registerReducer.getIn(['upload_user_doc', 'loading'], true),
    upload_user_doc: state.registerReducer.getIn(['upload_user_doc'], new Map())
})
const mapDispatchToProps = {
    fetchUserById,
    updateUser,
    uploadDoc
}

export default connect(mapStoreToProps, mapDispatchToProps)(Profile)