import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { fetchUserById } from '../../redux/action/trackAction'
import { updateUser } from '../../redux/action/registerAction'


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
    userType: "employee",

    //employer
    seRegNo: "",
    panNo: "",
    pfRegNo: "",
    esicRegNo: "",
    pfOfficeAddr: "",
    esicOfficeAddr: "",
}
function Profile(props) {
    const [user, setUser] = useState(initializeObj)
    useEffect(() => {
        let userId = JSON.parse(localStorage.getItem('auth'))['userId']
        props.fetchUserById(userId)
    }, [])

    useEffect(() => {
        if (!props.user_by_id_loading) {
            if (!props.user_by_id.toJS().error) {
                console.log(props.user_by_id.toJS())
                setUser(props.user_by_id.toJS()['data'])
            }
        }
    }, [props.user_by_id_loading])

    useEffect(() => {
        if (!props.update_user_loading) {
            if (!props.update_user.toJS().error) {
                console.log(props.update_user.toJS())
                setUser(props.update_user.toJS()['data'])
            }
        }
    }, [props.update_user_loading])


    

    return (
        <>
            <div class="header-body ">
                <div class="row">
                    <div class="col-xl-12 m-auto">
                        <div class="profile-wrapper mt-5">
                            <div class="profile-head d-flex align-items-center pl-4"> Profile </div>
                            <div className="col-md-12">
                                <div class="input-group mb-3 flex-nowrap mt-4">
                                    <div class="form-group w-100">
                                        <label>Name As in Adhaar<span class="mandatory">*</span></label>
                                        <input type="text" class="form-control" placeholder="Enter Name" disabled id={'firstName'} value={user.firstName} />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Date of Birth As per Adhaar<span class="mandatory">*</span></label>
                                        <input type="date" class="form-control" placeholder="Enter Date of Birth" id={'dob'} value={user.dob} />
                                    </div>
                                </div>

                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>UAN Number</label>
                                        <input type="text" class="form-control" id={'uanNo'} value={user.uanNo} placeholder="Enter UAN Number" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>PF Account Number<span class="mandatory">*</span></label>
                                        <input type="text" class="form-control" id={'pfNo'} value={user.pfNo} placeholder="Enter PF Account Number" />
                                    </div>
                                </div>
                                <div class="form-group w-100">
                                    <label>Employer / Company Name </label>
                                    <input type="text" class="form-control" id={'employerName'} value={user.employerName} placeholder="Enter Employer / Company Name" />
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Registered Email ID </label>
                                        <input type="email" class="form-control" id={'emailId'} value={user.emailId} placeholder="Enter Registered Email ID" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Phone Number</label>
                                        <input type="text" class="form-control" id={'phNo'} value={user.phNo} placeholder="Enter Phone Number" />
                                    </div>
                                </div>
                                <div class="input-group flex-nowrap ">
                                    <div class="form-group w-100">
                                        <label>Pan Card* </label>
                                        <input class="w-100" type="file" name="file" />
                                        <span>* Pan Card Uploaded </span>
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Aadhaar Card* </label>
                                        <input class="w-100" type="file" name="file" />
                                        <span>* Aadhaar Card Uploaded </span>
                                    </div>
                                </div>
                                <hr />
                                <div class="pb-3">Additional Documents</div>
                                <div class="input-group flex-nowrap ">
                                    <div class="form-group w-100">
                                        <label>Affidivet </label>
                                        <input class="w-100" type="file" name="file" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Birth ceritificate </label>
                                        <input class="w-100" type="file" name="file" />
                                    </div>
                                </div>
                                <div class="input-group flex-nowrap ">
                                    <div class="form-group w-100">
                                        <label>10th Marksheet </label>
                                        <input class="w-100" type="file" name="file" />
                                    </div>
                                </div>
                                <div class="pb-3">HR Contact Details</div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Mobile Number </label>
                                        <input type="email" class="form-control" id={'hrEmailId'} value={user.hrEmailId} placeholder="Enter Mobile Number" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Email ID </label>
                                        <input type="text" class="form-control" id={'hrMobileNo'} value={user.hrMobileNo} placeholder="Enter Email ID" />
                                    </div>
                                </div>
                                <div class="d-flex  align-items-center justify-content-end pb-2">
                                    <button type="button" class="btn-sm btn-common ml-2">Save</button>
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
    update_user: state.registerReducer.getIn(['update_user'], new Map())
})
const mapDispatchToProps = {
    fetchUserById,
    updateUser
}

export default connect(mapStoreToProps, mapDispatchToProps)(Profile)