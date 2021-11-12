import React from 'react'
import Header from '../header/header'

function EmployerSignUp(props) {
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
                                        <label>First Name<span class="mandatory">*</span></label>
                                        <input type="text" class="form-control" placeholder="Enter First Name" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Last Name<span class="mandatory">*</span></label>
                                        <input type="text" class="form-control" placeholder="Enter Last Name" />
                                    </div>
                                </div>
                                <div class="form-group w-100">
                                    <label>Employer / Company Name </label>
                                    <input type="text" class="form-control" placeholder="Enter Employer / Company Name" />
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>Registered Email ID </label>
                                        <input type="email" class="form-control" placeholder="Enter Registered Email ID" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Phone Number<span class="mandatory">*</span></label>
                                        <input type="text" class="form-control" placeholder="Enter Phone Number" />
                                    </div>
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>S&E Registraion Number </label>
                                        <input type="email" class="form-control" placeholder="Enter S&E Registraion Number" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>Pan Number </label>
                                        <input type="text" class="form-control" placeholder="Enter Pan Number" />
                                    </div>
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>PF Registraion Number / Allotment Number </label>
                                        <input type="text" class="form-control" placeholder="Enter PF Registraion Number" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>PF Office Full Address </label>
                                        <input type="text" class="form-control" placeholder="Enter PF Office Address" />
                                    </div>
                                </div>
                                <div class="input-group mb-3 flex-nowrap">
                                    <div class="form-group w-100">
                                        <label>ESIC Registraion Number / Allotment Number </label>
                                        <input type="email" class="form-control" placeholder="Enter ESIC Registraion Number" />
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>ESIC Office Full Address </label>
                                        <input type="text" class="form-control" placeholder="Enter ESIC Office Address" />
                                    </div>
                                </div>
                                <div class="form-group w-100">
                                    <label>Company Full Address </label>
                                    <input type="text" class="form-control" placeholder="Enter Company Full Address" />
                                </div>
                                <div class="d-flex  align-items-center justify-content-end pb-2">
                                    <button type="button" class="btn-sm btn-secondary">Save</button>
                                    <button type="button" class="btn-sm btn-secondary ml-2">Edit</button>
                                    <button type="button" class="btn-sm btn-common ml-2">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmployerSignUp