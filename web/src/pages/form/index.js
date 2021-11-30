import React, { useState, useRef, useEffect } from "react";
import { connect } from 'react-redux'
import { submitQuery } from '../../redux/action/formAction'
import pdf from "../../assets/form/New-Joint-Declaration-Form.pdf"
import { PDFDocument } from 'pdf-lib'
import { fetchGrivById, updateQuery, fetchFileById, fetchFileByName, updateFileQuery } from '../../redux/action/trackAction'

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

let validationList = ['grivId', 'grivType', 'userId', 'employerName']
function Form(props) {
    const [selectedForm, setSelectedForm] = useState({})
    const [selectedPDF, setSelectedPDF] = useState("")
    const [currentPdf, setCurrentPdf] = useState("")
    const [rowData, setRowData] = useState({})
    const [update, setUpdate] = useState(false)
    const [state, setState] = useState({
        forms: [],
        note: ""
    })
    const fileInputRef = useRef([]);

    useEffect(() => {
        formList.map((e, key) => {
            if (selectedForm !== {}) {
                if (e.id == selectedForm.id) {
                    fileInputRef.current = fileInputRef.current.slice(0, e.form.length)
                }
            }
        })
    }, [selectedForm])


    var pathParam = props.location.pathname.replace("/app/form", "")
    useEffect(() => {
        if (pathParam !== "") {
            props.fetchGrivById(props.location.pathname.replace("/app/form/", ""))
            setUpdate(true)
        }
    }, [])

    useEffect(async () => {
        if (!props.griv_by_id_loading) {
            if (!props.griv_by_id.toJS().error) {
                //console.log(props.griv_by_id.toJS())
                if (Object.keys(props.griv_by_id.toJS()['data']).length > 0) {
                    await existFormDecl(props.griv_by_id.toJS()['data'])
                    //setRowData(props.griv_by_id.toJS()['data'])
                    let obj = reqList.find((obj) => obj.id == rowData.grivId)
                    setSelectedForm(obj)
                }
            }
        }
    }, [props.griv_by_id_loading])

    useEffect(async () => {
        if (!props.file_by_id_loading) {
            if (!props.file_by_id.toJS().error) {
                let pdfWindow = window.open("")
                pdfWindow.document.write(`<iframe width='100%' height='100%' src= '${props.file_by_id.toJS().data}'></iframe>`)
            }
        }
    }, [props.file_by_id_loading])

    function existFormDecl(obj) {
        //let obj = props.griv_by_id.toJS()['data']
        setRowData((prevState) => {
            for (var key in obj) {
                prevState[key] = obj[key]
            }
            return ({ ...prevState })
        })

    }



    function onChangeHandler(e) {
        let id = e.target.id, value = e.target.value
        setState((prevState) => {
            prevState[id] = value = e.target.value
            return ({ ...prevState })
        })

    }
    function onChangeDropdown(e) {
        let obj = reqList.find((obj) => obj.id == e.target.value)
        setSelectedForm(obj)
    }
    function onSelectPDF(value) {
        setSelectedPDF(value)
        loadPDF("../.." + value)
    }
    function onClickDownloadPDF(value) {
        //var fileURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = "../.." + value;
        link.setAttribute('download', "doc1.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click()
    }

    function formHTML() {
        var list = null
        formList.map((e, key) => {
            if (selectedForm !== {}) {
                if (e.id == selectedForm.id) {
                    e.form.map((e, key) => {
                        list.push(<div key={key}>
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
        return list
    }
    let pdfDoc = null
    async function loadPDF(url) {
        url = 'https://pdf-lib.js.org/assests/dod_character.pdf'
        const arrayBuffer = await fetch(url).then(res => res.arrayBuffer())
        pdfDoc = await PDFDocument.load(arrayBuffer);
        //console.log(pdfDoc.saveAsBase64({ dataUri: true }));
        setCurrentPdf(await pdfDoc.saveAsBase64({ dataUri: true }))
    }

    function fileUploadChange(e) {
        //console.log("obj", { id: e.target.id, value: e.target.name })
        // console.log("file", e.target.files)
        setState((prevState) => {
            prevState.forms = [...prevState.forms, { id: e.target.id, value: e.target.value, file: e.target.files[0] }]
            return ({ ...prevState })
        })
    }

    function fileUploadAction() {
        return fileInputRef.current.click();
    }

    function printFileName(id) {
        //   console.log("hehe", id)
        let returnObj = {}
        returnObj = (state.forms.length > 0) ? state.forms.find((obj) => obj.id == id) : {}
        // console.log("hehe obj", returnObj)
        return (returnObj !== {} && returnObj !== undefined) ? returnObj.value : ""
    }

    function isValidForm(form) {
        for (let i = 0; i < validationList.length; i++) {
            if (form[validationList[i]].trim().length == 0) {
                return false;
            }
        }
        return true;
    }

    function getFile(id) {
        props.fetchFileById(id)
    }

    function onClickSave() {
        let obj = {
            grivId: (selectedForm != {}) ? selectedForm.id : "",
            grivType: (selectedForm != {}) ? selectedForm.value : "",
            userId: JSON.parse(localStorage.getItem('auth')).userId,
            employerName: JSON.parse(localStorage.getItem('auth')).employerName,
            note: state.note,
            status: "Pending",
            paymentStatus: false,
            paidAmount: "",
            paymentMethod: "",
            queryLevel: -2,
            endDate: '',
            comments: []
        }
        //console.log(obj)
        let formData = new FormData();
        let isValid = isValidForm(obj)
        if (isValid) {
            for (let key in obj) {
                //console.log(key + ',' + obj[key])
                if (key !== 'image') {
                    formData.set(key, obj[key])
                }
            }
            for (var i = 0; i < state.forms.length; i++) {
                formData.set("file" + (i + 1), state.forms[i].file, state.forms[i].id)
            }
            props.submitQuery(formData)
        }
    }

    function onClickUpdate() {
        if (state.forms.length > 0) {
            let formData = new FormData();
            console.log(rowData)
            var obj = rowData
            for (var key in obj) {
                if (key === "grivDoc1" || key === "grivDoc2") {
                    formData.set(key, JSON.stringify(obj[key]))
                } else
                    formData.set(key, obj[key])
            }
            for (var i = 0; i < state.forms.length; i++) {
                formData.set("file" + (i + 1), state.forms[i].file, state.forms[i].id)
            }
            props.updateFileQuery(formData)
        } else {

        }
    }
    function onClickSubmit() {
        let obj = {
            grivId: (selectedForm != {}) ? selectedForm.id : "",
            grivType: (selectedForm != {}) ? selectedForm.value : "",
            userId: JSON.parse(localStorage.getItem('auth')).userId,
            employerName: JSON.parse(localStorage.getItem('auth')).employerName,
            note: state.note,
            status: "New",
            paymentStatus: true,
            paidAmount: "200",
            paymentMethod: "CARD",
            queryLevel: -1,
            endDate: '',
            comments: []
        }
        //console.log(obj)
        let formData = new FormData();
        let isValid = isValidForm(obj)
        if (isValid) {
            for (let key in obj) {
                //console.log(key + ',' + obj[key])
                if (key !== 'image') {
                    formData.set(key, obj[key])
                }
            }
            for (var i = 0; i < state.forms.length; i++) {
                formData.set("file" + (i + 1), state.forms[i].file, state.forms[i].id)
            }
            props.submitQuery(formData)
        }
    }
    console.log("selectedForm", selectedForm)
    function existingDoc(formId) {
        let tempArr = rowData['grivDoc1'].concat(rowData['grivDoc2'])
        return tempArr.map((obj, key) => {
            if (formId == obj.formId)
                return (
                    <div> <a onClick={() => getFile(obj.id)}>{obj.id} </a> , <span>{obj.date}</span></div>
                )
        })
    }

    return (
        <>
            <div class="section-gap"><br />
                <div class="grievance-section">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-7">
                                <div className={'col-md-12'}>
                                    <select className='form-control rounded-0' value={(Object.keys(selectedForm).length > 0 && selectedForm !== undefined && selectedForm !== null) ? selectedForm.id : ""} onChange={(e) => onChangeDropdown(e)}>
                                        <option>Select Type of Query</option>
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
                                    <div>
                                        {/* {formHTML()} */}
                                        {formList.map((e, key) => {
                                            if (selectedForm !== {}) {
                                                if (e.id == selectedForm.id) {
                                                    return e.form.map((e, key) => {
                                                        return (<div key={key}>
                                                            <label>{(key + 1) + ". " + e.value}</label>
                                                            <button className="btn btn-secondary btn-sm" onClick={() => { onSelectPDF(e.loc) }}>View</button>
                                                            <button className="btn btn-secondary btn-sm" onClick={() => onClickDownloadPDF(e.loc)}>Download</button>
                                                            <div><input type="file" id={e.id} hidden ref={el => fileInputRef.current[key] = el} onChange={fileUploadChange} />
                                                                <button className="btn btn-secondary btn-sm" onClick={() => fileInputRef.current[key].click()}>Upload</button>
                                                                <br /><span>{printFileName(e.id)}</span>
                                                            </div>
                                                            {update && existingDoc(e.id)}
                                                        </div>)
                                                    })
                                                }
                                            }
                                        })}
                                        {/* <a href=""></a> */}<br />
                                        {(selectedForm !== {}) && <div>
                                            <div class="form-group w-100">
                                                <label for="note">Note (Optional):</label>
                                                <textarea id={'note'} class="form-control" value={state.note} style={{
                                                    height: '65px',
                                                    width: '400px'
                                                }} onChange={onChangeHandler}></textarea>
                                            </div>
                                            
                                            <label for="note">Processing Fee:</label>
                                            <span>200</span>
                                        </div>}
                                        < hr />
                                        <div class="d-flex  align-items-center justify-content-end pb-2">
                                            <button type="button" class="btn btn-secondary">Cancel</button>
                                            <button type="button" class="btn btn-secondary ml-2" onClick={onClickSave}>Save</button>
                                            {update && <button type="button" class="btn btn-secondary ml-2" onClick={onClickUpdate}>{(update && rowData['queryLevel'] === -2 ? "Submit" : "Update")}</button>}
                                            {!update && <button type="button" class="btn btn-common ml-2" onClick={onClickSubmit}>Submit</button>}
                                        </div>
                                    </div>
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
                            {currentPdf !== "" && <iframe src={pdfDoc} width="800" height="600"></iframe>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStoreToProps = state => ({
    sub_query_loading: state.formReducer.getIn(['sub_query', 'loading'], true),
    sub_query: state.formReducer.getIn(['sub_query'], new Map()),

    login: state.loginReducer['login'],

    griv_by_id_loading: state.trackReducer.getIn(['griv_by_id', 'loading'], true),
    griv_by_id: state.trackReducer.getIn(['griv_by_id'], new Map()),

    update_query_loading: state.trackReducer.getIn(['update_query', 'loading'], true),
    update_query: state.trackReducer.getIn(['update_query'], new Map()),

    file_by_id_loading: state.trackReducer.getIn(['file_by_id', 'loading'], true),
    file_by_id: state.trackReducer.getIn(['file_by_id'], new Map())

})
const mapDispatchToProps = {
    submitQuery,
    fetchGrivById,
    updateQuery,
    fetchFileById,
    fetchFileByName,
    updateFileQuery
}

export default connect(mapStoreToProps, mapDispatchToProps)(Form)