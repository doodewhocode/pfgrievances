import React, { useState } from "react";
import pdf from "../../assets/form/New-Joint-Declaration-Form.pdf"
import { PDFDocument } from 'pdf-lib'
let reqList = [
    { id: "1", value: "Name Change Correction" },
    { id: "2", value: "DOB Correction" },
    { id: "3", value: "PF Partial Withdrawal with Adhaar" },
    { id: "4", value: "Fund Transfer" },
    { id: "5", value: "Password change Mobile Number Lost " },
    { id: "6", value: "Password change with Mobile Number" },
    { id: "7", value: "UAN Activation" },
    { id: "8", value: "KYC Activation" },
    { id: "9", value: "Mark Exit through Employee Portal" },
    { id: "10", value: "Nominee Updation" },
    { id: "11", value: "Death Case" },
    { id: "12", value: "To Apply Pension Benefit Online (Scheme Ceritificate)" }
]

let formList = [
    { id: "1", form: [{ id: "1", value: "New Joint Declaration Form", loc: "/assets/form/New-Joint-Declaration-Form.pdf" }, { id: "2", value: "Form 5", loc: "/assets/form/New-Joint-Declaration-Form.pdf" }] }
]


function Form(props) {
    const [selectedForm, setSelectedForm] = useState({})
    const [selectedPDF, setSelectedPDF] = useState("")
    const [currentPdf, setCurrentPdf] = useState("")
    function onChangeHandler() {

    }
    function onChangeDropdown(e) {
        let obj = reqList.find((obj) => obj.id == e.target.value)
        setSelectedForm(obj)
    }
    function onSelectPDF(value) {
        console.log(value)
        //setSelectedPDF(value)
        //loadPDF("../.." + value)
    }
    function onClickDownloadPDF() {

    }
    function formHTML() {
        return formList.map((e, key) => {
            if (selectedForm !== {}) {
                if (e.id == selectedForm.id) {
                    return e.form.map((e, key) => {
                        return (<div key={key}>
                            <label>{key + ". " + e.value}</label>
                            <button className="btn btn-secondary btn-sm" onClick={() => { onSelectPDF(e.loc) }}>View</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => onClickDownloadPDF(e.loc)}>Download</button>
                            <button className="btn btn-secondary btn-sm">Upload</button>
                            <br /><span></span>
                        </div>)
                    })
                }
            }
        })
    }
    let pdfDoc = null
    async function loadPDF(url) {
        const arrayBuffer = await fetch(url).then(res => res.arrayBuffer())
        pdfDoc = await PDFDocument.load(arrayBuffer);
        console.log(pdfDoc.saveAsBase64({ dataUri: true }));
        setCurrentPdf(await pdfDoc.saveAsBase64({ dataUri: true }))
    }
    return (
        <>
            <div class="section-gap"><br />
                <div class="grievance-section">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-7">
                                <div className={'col-md-12'}>
                                    <select className='form-control rounded-0' value={(selectedForm !== {}) ? selectedForm.id : ""} onChange={(e) => onChangeDropdown(e)}>
                                        <option>Select Type of Form</option>
                                        {reqList.map((e, key) => {
                                            return <option key={key} value={e.id}>{e.value}</option>;
                                        })
                                        }
                                    </select>
                                </div><br />
                                <div class="">
                                    <div class="online-header" style={{ fontSize: '25px' }}>{(selectedForm !== {}) ? selectedForm.value : ""}</div>
                                </div>
                                <div class="grievance-wrapper mt-2">
                                    <div class="header d-flex align-items-center justify-content-center" style={{ fontSize: '20px' }}>
                                        List of Documents
                                    </div><br />
                                    <form>
                                        {formList.map((e, key) => {
                                            if (selectedForm !== {}) {
                                                if (e.id == selectedForm.id) {
                                                    return e.form.map((e, key) => {
                                                        return (<div key={key}>
                                                            <label>{(key + 1) + ". " + e.value}</label>
                                                            <button className="btn btn-secondary btn-sm" onClick={() => onSelectPDF(e.loc)}>View</button>
                                                            <button className="btn btn-secondary btn-sm" onClick={() => onClickDownloadPDF(e.loc)}>Download</button>
                                                            <button className="btn btn-secondary btn-sm">Upload</button>
                                                            <br /><span></span>
                                                        </div>)
                                                    })
                                                }
                                            }
                                        })}
                                        {/* <a href=""></a> */}
                                        < hr />
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
                                    <div class="header d-flex align-items-center justify-content-center" style={{ fontSize: '20px' }}>
                                        Process Description
                                    </div>
                                    <div class="pt-3 pb-3 text-justify" style={{ fontSize: '13px' }}>
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
                                <div class="grievance-wrapper mt-2">
                                    <div class="header d-flex align-items-center justify-content-center" style={{ fontSize: '20px' }}>
                                        Additional Process by the client
                                    </div>
                                    <div class="pt-3 pb-3 text-justify" style={{ fontSize: '13px' }}>
                                        Please Attach the Documents in Profile Page<br /><br />
                                        • Upload Affidivet.<br />
                                        • Upload Birth Ceritificate.<br />
                                        • Upload 10th Marksheet.<br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {selectedPDF !== "" && <iframe src={currentPdf} width="800" height="600"></iframe>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form