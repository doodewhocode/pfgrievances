import React from "react";

function Form(props) {
    return (
        <>
            <div class="section-gap">
                <div class="offline-cardwrapper">
                    <div class="online-header pl-4">Name Correction</div>
                </div>
                <div class="grievance-section">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-7">
                                <div class="grievance-wrapper mt-5">
                                    <div class="header d-flex align-items-center justify-content-center">
                                        List of Documents
                                    </div>
                                    <form>
                                        <div class="pt-3 pb-2">
                                            <a class="w-100 attach-block d-flex align-items-center justify-content-between "
                                                role="presentation" href="./assets/New-Joint-Declaration-Form.pdf">
                                                <div style={{fontSize: '18px'}}>New Joint Declaration Form
                                                    <span class=" mandatory">*</span>
                                                </div>
                                                <i class="icon-attachdoc icon-lg"></i>
                                            </a>
                                        </div>
                                        <hr />
                                        <div class="pt-3 pb-2">
                                            <a class="w-100 attach-block d-flex align-items-center justify-content-between "
                                                role="presentation" href="./assets/New-Joint-Declaration-Form.pdf">
                                                <div style={{fontSize: '18px'}}>Form 5<span class=" mandatory">*</span>
                                                </div>
                                                <i class="icon-attachdoc icon-lg"></i>
                                            </a>
                                        </div>
                                        <hr />
                                        <div class="d-flex  align-items-center justify-content-end pb-2">
                                            <button type="button" class="btn btn-secondary">Cancel</button>
                                            <button type="button" class="btn btn-secondary ml-2">Save</button>
                                            <button type="button" class="btn btn-common ml-2">Submit</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                            <div class="col-5">
                                <div class="grievance-wrapper mt-5">
                                    <div class="header d-flex align-items-center justify-content-center">
                                        Process Description
                                    </div>
                                    <div class="pt-3 pb-3 text-justify" style={{ fontSize: '18px' }}>
                                        Make a joint request (Employer + Employee) for the EPF UAN Name Correction / DOB /
                                        Father’s Name or any other detail
                                        correction along with a document confirming the change (PAN, Passport etc) duly
                                        attested by the employer and the member.
                                        The letter from the employer should have company’s letter head. Also Submit Revised
                                        Form-2 with them to the PF office.<br /><br />

                                        • Download the Name Correction Form.<br />
                                        • Fill your details and print it.<br />
                                        • Sign the printed form and get it signed by your employer.<br />
                                        • Get it stamped with company seal.<br />
                                        • Attach the self-attested copy of identity proof with the application.</div>
                                </div>
                            </div>
                            <div class="col-5 ml-auto">
                                <div class="grievance-wrapper mt-5">
                                    <div class="header d-flex align-items-center justify-content-center">
                                        Additional Process by the client
                                    </div>
                                    <div class="pt-3 pb-3 text-justify" style={{ fontSize: '18px' }}>
                                        Please Attach the Documents in Profile Page<br /><br />
                                        • Upload Affidivet.<br />
                                        • Upload Birth Ceritificate.<br />
                                        • Upload 10th Marksheet.<br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form