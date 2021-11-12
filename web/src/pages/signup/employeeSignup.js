import React from 'react'
import Header  from '../header/header'

function EmployeeSignUp(props){
    return (
        <>
            <Header />  
            <section class="pf-signup pt-5" id="particles-js">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 m-auto">
                    <div class="signup-wrapper mt-5 mb-5">
                        <div class="header d-flex align-items-center">Register</div>
                        <div class="input-group mb-3 flex-nowrap">
                            <div class="form-group w-100">
                                <label>Name As in Adhaar<span class="mandatory">*</span></label>
                                <input type="text" class="form-control" placeholder="Enter Name"/>
                            </div>
                            <div class="form-group w-100 ml-3">
                                <label>Date of Birth As per Adhaar<span class="mandatory">*</span></label>
                                <input type="date" class="form-control" placeholder="Enter Date of Birth"/>
                            </div>
                        </div>
                        <div class="input-group mb-3 flex-nowrap">
                            <div class="form-group w-100">
                                <label>UAN Number</label>
                                <input type="text" class="form-control" placeholder="Enter UAN Number"/>
                            </div>
                            <div class="form-group w-100 ml-3">
                                <label>PF Account Number<span class="mandatory">*</span></label>
                                <input type="text" class="form-control" placeholder="Enter PF Account Number"/>
                            </div>
                        </div>
                        <div class="form-group w-100">
                            <label>Employer / Company Name </label>
                            <input type="text" class="form-control" placeholder="Enter Employer / Company Name"/>
                        </div>
                        <div class="input-group mb-3 flex-nowrap">
                            <div class="form-group w-100">
                                <label>Registered Email ID </label>
                                <input type="email" class="form-control" placeholder="Enter Registered Email ID"/>
                            </div>
                            <div class="form-group w-100 ml-3">
                                <label>Phone Number</label>
                                <input type="text" class="form-control" placeholder="Enter Phone Number"/>
                            </div>
                        </div>
                        <div class="input-group flex-nowrap ">
                            <div class="form-group w-100">
                                <label>Upload Pan Card<span class="mandatory">*</span> </label>
                                <input class="w-100" type="file" name="file"/>
                            </div>
                            <div class="form-group w-100 ml-3">
                                <label>Upload Aadhar card<span class="mandatory">*</span> </label>
                                <input class="w-100" type="file" name="file"/>
                            </div>
                        </div>
                        <div class="pb-3">HR Contact Details</div>
                        <div class="input-group mb-3 flex-nowrap">
                            <div class="form-group w-100">
                                <label>Mobile Number </label>
                                <input type="email" class="form-control" placeholder="Enter Mobile Number"/>
                            </div>
                            <div class="form-group w-100 ml-3">
                                <label>Email ID </label>
                                <input type="text" class="form-control" placeholder="Enter Email ID"/>
                            </div>
                        </div>
                        <div class="d-flex  align-items-center justify-content-end pb-2">
                            <button type="button" class="btn-sm btn-secondary">Save</button>
                            <button type="button" class="btn-sm btn-secondary ml-2">Edit</button>
                            <button type="button" class="btn-sm btn-common ml-2">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default EmployeeSignUp