import React from "react";

function Profile(props) {

    return (
        <>

            <div class="header-body ">
                <div class="row">
                    <div class="col-xl-12 m-auto">
                        <div class="profile-wrapper mt-5">
                            <div class="profile-head d-flex align-items-center pl-4">
                                Profile
                            </div>
                            <form>
                                <div class="input-group mb-3 flex-nowrap mt-4">
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
                                        <label>* Pan Card Uploaded </label>
                                    </div>
                                    <div class="form-group w-100 ml-3">
                                        <label>* Aadhaar Card Uploaded </label>
                                    </div>
                                </div>
                                <hr/>
                                <div class ="pb-3">Additional Documents</div>
                                <div class ="input-group flex-nowrap ">
                                <div class ="form-group w-100">
                                <label>Affidivet </label>
                                <input class ="w-100" type ="file" name="file"/>
                                </div>
                                <div class ="form-group w-100 ml-3">
                                <label>Birth ceritificate </label>
                                <input class ="w-100" type ="file" name="file"/>
                                </div>
                                </div>
                                <div class ="input-group flex-nowrap ">
                                <div class ="form-group w-100">
                                <label>10th Marksheet </label>
                                <input class ="w-100" type ="file" name="file"/>
                                </div>
                                </div>
                                <div class ="pb-3">HR Contact Details</div>
                                <div class ="input-group mb-3 flex-nowrap">
                                <div class ="form-group w-100">
                                <label>Mobile Number </label>
                                <input type ="email" class ="form-control" placeholder="Enter Mobile Number"/>
                                </div>
                                <div class ="form-group w-100 ml-3">
                                <label>Email ID </label>
                                <input type ="text" class ="form-control" placeholder="Enter Email ID"/>
                                </div>
                                </div>
                                <div class ="d-flex  align-items-center justify-content-end pb-2">
                                <button type ="button" class ="btn-sm btn-secondary">Edit</button>
                                <button type ="button" class ="btn-sm btn-common ml-2">Save</button>
                                </div>
                            </form>
                        </div>
                        <div class="mt-3"></div>
                    </div>
                </div>

            </div>

        </>

    )

}

export default Profile