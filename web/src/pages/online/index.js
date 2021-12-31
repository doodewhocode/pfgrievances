import React, { useState, useRef, useEffect } from "react";
import { connect } from 'react-redux'
import { submitQuery } from '../../redux/action/formAction'
import { initiatePayment } from '../../redux/action/paymentAction'
import {
    fetchGrivById, updateQuery, fetchFileById, fetchFileByName,
    updateFileQuery, downloadFileById
} from '../../redux/action/trackAction'

import { fetchAllQuery } from '../../redux/action/queryControlAction'
import Confirmation from '../../components/confirmation'
import ProcessBox from '../../components/processbox'
import Toast from '../../components/toast'


let validationList = ['grivType', 'userId', 'employerName']
function Online(props) {
    const [queryList, setQueryList] = useState([])
    const [selectedForm, setSelectedForm] = useState({})
    const [currentPdf, setCurrentPdf] = useState("")
    const [rowData, setRowData] = useState({})
    const [update, setUpdate] = useState(false)
    const [docName, setDocName] = useState("")
    const [processModal, setProcessModal] = useState({
        message: "",
        visible: false,
    })
    const [showModal, setShowModal] = useState({
        message: "",
        visible: false,
        type: ""
    })
    const [toast, setToast] = useState({
        type: '',
        message: '',
        visible: false
    })
    const [state, setState] = useState({
        forms: [],
        note: ""
    })
    const fileInputRef = useRef([]);
    let pdfDoc = null

    let user = (localStorage.getItem('auth') != null && localStorage.getItem('auth') != 'undefined') ? JSON.parse(localStorage.getItem('auth')) : {}
    useEffect(() => {
        if (Object.keys(selectedForm).length > 0) {
            selectedForm.docs.map((e, key) => {
                fileInputRef.current = fileInputRef.current.slice(0, selectedForm.docs.length)
            })
        }
    }, [selectedForm])
    
    useEffect(async () => {
        await props.fetchAllQuery();        
    }, [])

    useEffect(async () => {
        if (!props.griv_by_id_loading) {
            if (!props.griv_by_id.toJS().error) {                
                if (Object.keys(props.griv_by_id.toJS()['data']).length > 0 && queryList.length > 0) {
                    await existFormDecl(props.griv_by_id.toJS()['data'])
                    setRowData(props.griv_by_id.toJS()['data'])
                    let obj = queryList.find((obj) => obj.queryId == rowData.grivId)
                
                    setSelectedForm(obj)
                }
            }
        }
    }, [props.griv_by_id_loading, queryList])

    useEffect(async () => {
        if (!props.file_by_id_loading) {
            if (!props.file_by_id.toJS().error) {
                
                setCurrentPdf(props.file_by_id.toJS().data)
            }
        }
    }, [props.file_by_id_loading])

    function toArrayBuffer(buf) {
        const ab = new ArrayBuffer(buf.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < buf.length; ++i) {
            view[i] = buf[i]
        }
        return ab;
    }


    useEffect(async () => {
        if (!props.download_by_id_loading) {
            if (props.download_by_id.toJS().error) {
                
            } else {
                let blob = new Blob([props.download_by_id.toJS().data])
                let pdfWindow = window.open("")
                pdfWindow.document.write(`<iframe width='100%' height='100%' src= '${props.download_by_id.toJS().data}'></iframe>`)
                var fileURL = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', docName + ".pdf"); //or any other extension
                document.body.appendChild(link);
                link.click()
            }
        }
    }, [props.download_by_id_loading])

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
        if (e.target.value !== "") {
            let obj = queryList.find((obj) => obj.queryId == e.target.value)
            setSelectedForm(obj)
        }
    }
    
    function onClickDownloadPDF(id, docName) {
        setDocName(docName)
        props.downloadFileById(id)
    }
    
    function fileUploadChange(e) {
        setState((prevState) => {
            prevState.forms = [...prevState.forms, { id: e.target.id, value: e.target.value, file: e.target.files[0] }]
            return ({ ...prevState })
        })
    }


    function printFileName(id) {
        let returnObj = {}
        returnObj = (state.forms.length > 0) ? state.forms.find((obj) => obj.id == id) : {}
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

    function downloadFile(id) {
        props.downloadFileById(id)
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

        let formData = new FormData();
        let isValid = isValidForm(obj)
        if (isValid) {
            for (let key in obj) {

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
            grivId: (selectedForm != {}) ? selectedForm.queryId : "",
            grivType: (selectedForm != {}) ? selectedForm.queryName : "",
            userId: JSON.parse(localStorage.getItem('auth')).userId,
            employerName: JSON.parse(localStorage.getItem('auth')).employerName,
            note: state.note,
            status: "New",
            paymentStatus: true,
            paidAmount: selectedForm.offlinePrice,
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
                    <div>&nbsp;&nbsp;{key + 1} . <span >{obj.id} </span> , <span>{obj.date}</span>&nbsp;
                        <a style={{
                            cursor: 'pointer',
                            color: '#007bff',
                            textDecoration: 'underline'
                        }} onClick={() => getFile(obj.id)}>view</a>&nbsp;
                        <a style={{
                            cursor: 'pointer',
                            color: '#007bff',
                            textDecoration: 'underline'
                        }} onClick={() => downloadFile(obj.id)}>download</a>
                    </div >
                )
        })
    }

    useEffect(() => {
        if (!props.init_payment_loading) {
            setProcessModal((prev) => {
                prev.visible = false
                return ({ ...prev })
            })
            if (!props.init_payment.toJS().error) {
                console.log(props.init_payment.toJS().data)
                onClear();
                window.open(props.init_payment.toJS().data)
            } else {
                setToast(prevState => {
                    prevState.message = "Error on processing payment. please try again or contact admin"
                    prevState.type = "error"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            }
        }
    }, [props.init_payment_loading])

    function onClear() {
        setState((prevState) => {
            prevState.forms = []
            prevState.note = ""
            return ({ ...prevState })
        })
        setSelectedForm({})
    }

    useEffect(() => {
        if (!props.query_list_loading) {
            if (!props.query_list.toJS().error) {
                setQueryList(props.query_list.toJS().data)
            }
        }
    }, [props.query_list_loading])

    useEffect(() => {
        if (!props.sub_query_loading) {
            setShowModal((prev) => {
                prev.visible = false
                return ({ ...prev })
            })
            if (!props.sub_query.toJS().error) {
                setProcessModal(prev => {
                    prev.visible = true
                    prev.message = "Processing payment, please wait..."
                    return ({ ...prev })
                })
                handleFinalPayment(props.sub_query.toJS().data['data'])
                setToast(prevState => {
                    prevState.message = "Your request saved successfully"
                    prevState.type = "success"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            } else {
                setToast(prevState => {
                    prevState.message = "Error while saving the requested query. please try again or contact admin"
                    prevState.type = "error"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            }
        }
    }, [props.sub_query_loading])

    function handleFinalPayment(data) {
        let obj = {
            txnid: data._id,
            amount: data.price,
            name: Object.keys(user).length > 0 && user['firstName'],
            email: Object.keys(user).length > 0 && user['emailId'],
            phone: Object.keys(user).length > 0 && user['phNo'],
            'udf1': "",
            'udf2': "",
            'udf3': "",
            'udf4': "",
            'udf5': "",
            'udf6': "",
            'udf7': "",
            'udf8': "",
            'udf9': "",
            'udf10': "",
            productinfo: selectedForm.queryName,
            surl: "http://localhost:7000/response",
            furl: "http://localhost:7000/response"
        }
        props.initiatePayment(obj)
    }  

    function handleClose() {
        setShowModal(prev => { prev.visible = false; return ({ ...prev }) })
    }

    function handleConfirmation(value) {
        if (value === 'yes') {
            if (Object.keys(selectedForm).length > 0) {
                onClickSubmit()
            }
        } else {
            setShowModal(prev => { prev.visible = false; return ({ ...prev }) })
        }
    }

    return (
        <>
            <ProcessBox showModal={processModal.visible} > {processModal.message}</ProcessBox>
            <Confirmation showModal={showModal.visible} handleClose={handleClose} title={'Confirmation'} handleConfirmationMessage={handleConfirmation} >
                {showModal.message}
            </Confirmation>
            <Toast message={toast.message} type={toast.type} visible={toast.visible} />
            <div class="grievance-section">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-7">
                            <div class="form-group ">
                                <label for="queryType" class="col-sm-4 col-form-label">Select Query Type*:</label>
                                <select placeholder="Select Query Type" className='form-control rounded-0' value={(Object.keys(selectedForm).length > 0 && selectedForm !== undefined && selectedForm !== null) ? selectedForm.queryId : ""} onChange={(e) => onChangeDropdown(e)}>
                                    <option value=""> Select </option>
                                    {queryList.map((e, key) => {
                                        return <option key={key} value={e.queryId}>{e.queryName}</option>;
                                    })
                                    }
                                </select>
                            </div>
                            <div class="mt-5">
                                <div class="online-header" style={{ fontSize: '25px' }}>{(Object.keys(selectedForm).length > 0) ? selectedForm.queryName : ""}</div>
                            </div>
                            <div class="grievance-wrapper mt-3">
                                <div class="header d-flex align-items-center justify-content-center" style={{ fontSize: '20px' }}>
                                    List of Documents
                                </div><br />
                                <div>

                                    {Object.keys(selectedForm).length > 0 && selectedForm.docs.map((e, key) => {
                                        return (<div key={key}>
                                            <label>{(key + 1) + ". " + e.docName}</label>&nbsp;&nbsp;
                                            {/* <button className="btn-sm btn-common" onClick={() => { onSelectPDF(e.loc) }}>View</button>&nbsp; */}
                                            <button className="btn-sm btn-common" onClick={() => onClickDownloadPDF(e.fileId, e.docName)}>Download</button>&nbsp;
                                            <input type="file" id={e.docId} hidden ref={el => fileInputRef.current[key] = el} onChange={fileUploadChange} />
                                            <button className="btn-sm btn-common" onClick={() => fileInputRef.current[key].click()}>Upload</button>
                                            <br /><span>{printFileName(e.docId)}</span>

                                            {update && existingDoc(e.docId)}
                                        </div>)
                                    })
                                    }
                                    <br />
                                    {(Object.keys(selectedForm).length > 0) && <div>
                                        <div class="form-group w-100">
                                            <label for="note">Note (Optional):</label>
                                            <textarea id={'note'} class="form-control" value={state.note} style={{
                                                height: '100px',
                                                width: '400px'
                                            }} onChange={onChangeHandler}></textarea>
                                        </div>

                                        <label for="note">Processing Fee:</label>
                                        <span>{Object.keys(selectedForm).length > 0 && selectedForm.offlinePrice}</span>
                                    </div>}
                                    < hr />
                                    <div class="d-flex  align-items-center justify-content-end pb-2">
                                        <button type="button" class="btn-sm btn-secondary">Cancel</button>
                                        <button type="button" class="btn-sm btn-secondary ml-2" onClick={onClickSave}>Save</button>
                                        {update && <button type="button" class="btn-sm btn-secondary ml-2" onClick={onClickUpdate}>{(update && rowData['queryLevel'] === -2 ? "Submit" : "Update")}</button>}
                                        {!update && <button type="button" class="btn-sm btn-common ml-2" onClick={() => setShowModal(prev => { prev.visible = true; prev.message = "Are you sure you want to proceed with the payment of " + selectedForm.offlinePrice + "  ?"; return ({ ...prev }) })}>Submit & Pay</button>}
                                    </div>
                                    <div class="d-flex align-items-center mt-5">
                                        {currentPdf !== "" && <iframe src={currentPdf} width="100%" height="100%"></iframe>}

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-5">
                            <div class="grievance-wrapper mt-5">
                                <div class="header d-flex align-items-center justify-content-center pt-5" style={{ fontSize: '20px' }}>
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
    file_by_id: state.trackReducer.getIn(['file_by_id'], new Map()),

    download_by_id_loading: state.trackReducer.getIn(['download_by_id', 'loading'], true),
    download_by_id: state.trackReducer.getIn(['download_by_id'], new Map()),

    init_payment_loading: state.paymentReducer.getIn(['init_payment', 'loading'], true),
    init_payment: state.paymentReducer.getIn(['init_payment'], new Map()),

    //fetch
    query_list_loading: state.queryControlReducer.getIn(['query_list', 'loading'], true),
    query_list: state.queryControlReducer.getIn(['query_list'], new Map())

})

const mapDispatchToProps = {
    submitQuery,
    fetchGrivById,
    updateQuery,
    fetchFileById,
    fetchFileByName,
    updateFileQuery,
    downloadFileById,
    initiatePayment,
    fetchAllQuery
}

export default connect(mapStoreToProps, mapDispatchToProps)(Online)