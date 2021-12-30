import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { createQuery, updateQuery, deleteQuery, fetchAllQuery, deleteFilebyId } from '../../redux/action/queryControlAction'
import { fetchFileById, fetchFileByName, downloadFileById, clearFileLoadOnSwitch } from '../../redux/action/trackAction'
import Confirmation from '../../components/confirmation'
import Toast from '../../components/toast'

let validationList = ['queryName', 'queryDesc', 'price']
function FormControl(props) {
    let initialObj = {
        queryName: "",
        queryDesc: "",
        additionalDesc: "",
        price: "",
        docs: [],
        createdBy: (localStorage.getItem('auth') != null && localStorage.getItem('auth') != 'undefined') ? JSON.parse(localStorage.getItem('auth'))['userName'] : ""
    }
    const [state, setState] = useState(initialObj)
    const [deleteFile, setDeleteFile] = useState("")
    const [queryList, setQueryList] = useState([])
    const [selectedForm, setSelectedForm] = useState({})
    const [selectedType, setSelectType] = useState(true)
    const fileInputRef = useRef([]);
    const docInputRef = useRef([]);
    const [editFlg, setEditFlg] = useState(false)
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

    useEffect(() => {
        props.fetchAllQuery()
    }, [])


    useEffect(() => {
        if (!props.query_list_loading) {
            if (!props.query_list.toJS().error) {
                setQueryList(props.query_list.toJS().data)
                //console.log("props.query_list.toJS().data", props.query_list.toJS().data)
            }
        }

    }, [props.query_list_loading])

    function isValidForm(form) {
        for (let i = 0; i < validationList.length; i++) {
            if (form[validationList[i]].trim().length == 0) {
                return false;
            }
        }
        return true;
    }

    function onChangeDropdown(e) {
        let obj = queryList.find((obj) => obj._id == e.target.value)
        setSelectedForm(obj)
    }

    useEffect(() => {
        console.log("selectedForm", selectedForm)
        if (Object.keys(selectedForm).length !== 0) {
            setState((prevState) => {
                for (var key in state) {
                    prevState[key] = selectedForm[key]
                }
                return ({ ...prevState })
            })
        }

    }, [selectedForm])

    useEffect(() => {
        if (!props.create_query_loading) {
            if (!props.create_query.toJS().error) {
                //onClear();
                setToast(prevState => {
                    prevState.message = "New Query is Created Successfully"
                    prevState.type = "success"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            } else {
                setToast(prevState => {
                    prevState.message = "Failed to create new query, Please try again or contact support team."
                    prevState.type = "error"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            }
        }
    }, [props.create_query_loading])



    useEffect(() => {
        if (!props.update_query_ctl_loading) {
            if (!props.update_query_ctl.toJS().error) {
                //onClear();
                setToast(prevState => {
                    prevState.message = "Successfully updated"
                    prevState.type = "success"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            } else {
                setToast(prevState => {
                    prevState.message = "Update Failed, Please try again or contact support team."
                    prevState.type = "error"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            }
        }
    }, [props.update_query_ctl_loading])


    useEffect(() => {
        if (!props.delete_query_ctl_loading) {
            if (!props.delete_query_ctl.toJS().error) {
                //onClear();
                setShowModal((prev) => {
                    prev.visible = false
                    return ({ ...prev })
                })

                setToast(prevState => {
                    prevState.message = "Query Deleted Successfully"
                    prevState.type = "success"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)

            } else {
                setToast(prevState => {
                    prevState.message = "Failed to delete the query , Please try again or contact support team."
                    prevState.type = "error"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            }
        }
    }, [props.delete_query_ctl_loading])

    useEffect(() => {
        if (!props.delete_file_by_id_loading) {
            if (!props.delete_file_by_id.toJS().error) {
                //onClear();
                setShowModal((prev) => {
                    prev.visible = false
                    return ({ ...prev })
                })
                setToast(prevState => {
                    prevState.message = "Query Document Deleted Successfully"
                    prevState.type = "success"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            } else {
                setToast(prevState => {
                    prevState.message = "Failed to delete the query document , Please try again or contact support team."
                    prevState.type = "error"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            }
        }
    }, [props.delete_file_by_id_loading])


    useEffect(async () => {
        if (!props.file_by_id_loading) {
            if (!props.file_by_id.toJS().error) {
                let pdfWindow = window.open("")
                pdfWindow.document.write(`<object data='${props.file_by_id.toJS().data}' > <embed width='100%' height='100%' src= '${props.file_by_id.toJS().data}'></embed></object>`)
                //setCurrentPdf(props.file_by_id.toJS().data)
            }
        }
    }, [props.file_by_id_loading])



    function onClickAdd() {
        setEditFlg(true);
        if (state.docs.length < 3) {
            let arr = state.docs
            setState((prevState => {
                arr.push({
                    docId: (state.docs.length + 1).toString(),
                    docName: "",
                    file: ""
                })
                prevState.docs = arr
                return ({ ...prevState })
            }))
            //console.log("state", state)
            fileInputRef.current = fileInputRef.current.slice(0, state.docs.length)
            docInputRef.current = docInputRef.current.slice(0, state.docs.length)
        } else {
            console.log("query exists max doc upload limit")
        }
    }

    function onChangeHandler(e) {
        let id = e.target.id, value = e.target.value;
        setState((prevState) => {
            prevState[id] = value
            return ({ ...prevState })
        })
    }

    function onChangeDocName(e) {

        //console.log("obj", { id: e.target.id, value: e.target.name })
        setState((prevState) => {
            let temp = prevState.docs.map((obj, key) => {
                if (obj.docId === e.target.id) {
                    obj['docName'] = e.target.value
                }
                return obj
            })
            prevState.docs = temp
            return ({ ...prevState })
        })
        //console.log(state)
    }

    function fileUploadChange(e) {
        //console.log("obj", { id: e.target.id, value: e.target.name })
        //console.log("file", e.target.files)
        setState((prevState) => {
            let temp = prevState.docs.map((obj, key) => {
                if (obj.docId === e.target.id) {
                    obj['file'] = { id: e.target.id, value: e.target.value, file: e.target.files[0] }
                }
                return obj
            })
            prevState.docs = temp
            return ({ ...prevState })
        })
    }

    function onClickSubmit() {
        console.log("state", state)
        let formData = new FormData();
        let isValid = isValidForm(state)
        if (isValid) {
            for (let key in state) {
                console.log(key + ',' + state[key])
                if (key !== 'docs') {
                    formData.set(key, state[key])
                }
            }
            if (state.docs.length > 0) {
                var arr = state.docs
                arr = arr.map((obj, key) => {
                    return {
                        docId: obj.docId,
                        docName: obj.docName
                    }
                })
                console.log(arr);
                formData.append('docs', JSON.stringify(arr))
            }
            for (var i = 0; i < state.docs.length; i++) {
                console.log(state.docs[i].docId)
                formData.set("file" + (i + 1), state.docs[i].file['file'], state.docs[i].docId)
            }
            console.log("state", formData)
            props.createQuery(formData)
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

    function printFileName(id) {
        //console.log("hehe", id)
        let returnObj = {}
        returnObj = (state.docs.length > 0) ? state.docs.find((obj) => obj.docId == id) : {}
        //console.log("hehe obj", returnObj)
        return (Object.keys(returnObj).length !== 0 && returnObj !== undefined && returnObj) ? returnObj.file.value : ""
    }
    console.log("queryList", state)

    function onToggle(value) {
        setSelectType(value);
        setState((prevState) => {
            for (var key in state) {
                prevState[key] = initialObj[key]
            }
            return ({ ...prevState })
        })
    }

    function onClickDelete() {
        setShowModal(prevState => {
            prevState.message = "Are you sure you want delete the query ?"
            prevState.visible = true
            return ({ ...prevState })
        })
    }

    function onClear() {
        console.log("asdfasd")
        setState((prevState) => {
            for (var key in initialObj) {
                prevState[key] = initialObj[key]
            }
            return ({ ...prevState })
        })
        console.log(state)
    }

    function handleConfirmation(value) {
        if (value === 'yes') {
            if (Object.keys(selectedForm).length > 0) {
                if (selectedForm.queryId) {
                    if (showModal.type !== "" && showModal.type === "doc") {
                        props.deleteFilebyId(selectedForm._id, deleteFile)
                    } else
                        props.deleteQuery(selectedForm._id)
                }
            }
        } else {
            setShowModal(prev => { prev.visible = false; return ({ ...prev }) })
        }
    }
    function handleClose() {
        setShowModal(prev => { prev.visible = false; return ({ ...prev }) })
    }

    function getFile(id) {
        props.fetchFileById(id)
    }

    function downloadFile(id) {
        props.downloadFileById(id)
    }

    function deleteDoc(id) {
        setDeleteFile(id)
        setShowModal((prevState) => {
            prevState.message = "Are you sure, You want to delete the document ?"
            prevState.visible = true
            prevState.type = "doc"
            return ({ ...prevState })
        })
    }
    function comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.fileId != current.fileId
            }).length == 0;
        }
    }
    function loadQuery() {
        let temp = []
        
        if (Object.keys(selectedForm).length > 0) {
            selectedForm.docs.map((obj, key) => {
                temp.push(<div>&nbsp;&nbsp;{key + 1} . Document Name*: <span >{obj[key].docName} </span> , <span>{obj[key].date}</span>&nbsp;
                    <a style={{
                        cursor: 'pointer',
                        color: '#007bff',
                        textDecoration: 'underline'
                    }} onClick={() => getFile(obj[key].fileId)}>view</a>&nbsp;
                    <a style={{
                        cursor: 'pointer',
                        color: '#007bff',
                        textDecoration: 'underline'
                    }} onClick={() => downloadFile(obj[key].fileId)}>download</a>&nbsp;
                    <a style={{
                        cursor: 'pointer',
                        color: '#007bff',
                        textDecoration: 'underline'
                    }} onClick={() => deleteDoc(obj[key].fileId)}>delete</a>
                </div >)
            })
        }
        var onlyLeft = state.docs.filter(comparer(selectedForm.docs))
        onlyLeft.map((obj, key) => {
            temp.push(<div class="form-group row" key={key}>
                <label for="staticEmail" class="col-sm-2 col-form-label">{key + 1}. Document Name*:</label>
                <div class="col-sm-4">
                    <input type="text" id={obj.docId} class="form-control" ref={el => fileInputRef.current[key] = el} value={state.docs[key].docName} onChange={(e) => onChangeDocName(e)} />
                </div>
                <label for="staticEmail" class="col-sm-2 col-form-label">Upload Document*:</label>
                <div class="col-sm-4">
                    <input type="file" id={obj.docId} hidden ref={el => fileInputRef.current[key] = el} onChange={fileUploadChange} />
                    <button className="btn-secondary btn-sm" onClick={() => fileInputRef.current[key].click()}>Upload</button>
                    {/* <br /><span>{printFileName(obj.docId)}</span> */}
                </div>
            </div>)
        })
        return temp
    }

    useEffect(()=>{
        return()=>{
            props.clearFileLoadOnSwitch()
        }
    },[])

    return (
        <>
            <Toast message={toast.message} type={toast.type} visible={toast.visible} />
            <Confirmation showModal={showModal.visible} handleClose={handleClose} title={'Confirmation'} handleConfirmationMessage={handleConfirmation} >
                {showModal.message}
            </Confirmation>
            <div class="profile-wrapper">
                <div class="profile-head d-flex align-items-center justify-content-between pl-4">
                    <div> Query Control</div>
                    <ul class="nav nav-pills pull-right">
                        <li class="nav-item">
                            <a className={"nav-link " + (selectedType ? "active" : "")} href="#" onClick={() => { onToggle(true) }}>Create</a>
                        </li>
                        <li class="nav-item">
                            <a className={"nav-link " + (!selectedType ? "active" : "")} href="#" onClick={() => { onToggle(false) }}>Edit</a>
                        </li>
                    </ul>
                </div>
                <br />
                {!selectedType && <div class="form-group ">
                    <label for="queryName" class="col-sm-6 col-form-label">Select Query Type*:</label>
                    <div class="col-sm-6">
                        <select className='form-control rounded-0' value={(selectedForm !== {}) ? selectedForm._id : ""} onChange={(e) => onChangeDropdown(e)}>
                            {queryList.map((e, key) => {
                                return <option key={key} value={e._id}>{e.queryName}</option>
                            })
                            }
                        </select>
                    </div>
                </div>}
                <div className="col-md-12">
                    <div class="form-group row">
                        <label for="queryName" class="col-sm-2 col-form-label">Query Name*:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="queryName" value={state.queryName} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="queryDesc" class="col-sm-2 col-form-label">Query Description*:</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="queryDesc" value={state.queryDesc} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Additional Description</label>
                        <div class="col-sm-10">
                            <textarea type="password" class="form-control" id="additionalDesc" value={state.additionalDesc} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Price*:</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" id="price" value={state.price} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 >Define Documents</h6>
                        <button className="btn-primary btn-sm" onClick={() => onClickAdd()}> Add </button>
                    </div>


                    {selectedType &&
                        state.docs.map((obj, key) => {
                            return (<div class="form-group row" key={key}>
                                <label for="staticEmail" class="col-sm-2 col-form-label">{key + 1}. Document Name*:</label>
                                <div class="col-sm-4">
                                    <input type="text" id={obj.docId} class="form-control" ref={el => fileInputRef.current[key] = el} value={state.docs[key].docName} onChange={(e) => onChangeDocName(e)} />
                                </div>
                                <label for="staticEmail" class="col-sm-2 col-form-label">Upload Document*:</label>
                                <div class="col-sm-4">
                                    <input type="file" id={obj.docId} hidden ref={el => fileInputRef.current[key] = el} onChange={fileUploadChange} />
                                    <button className="btn-secondary btn-sm" onClick={() => fileInputRef.current[key].click()}>Upload</button>
                                    <br /><span>{printFileName(obj.docId)}</span>
                                </div>
                            </div>)


                        })
                    }
                    {!selectedType && loadQuery()}

                    <div class="d-flex  align-items-center justify-content-end pb-2">
                        <button type="button" class="btn-sm btn-secondary" onClick={onClear}>Clear</button>
                        {!selectedType && <button type="button" class="btn-sm btn-secondary" onClick={onClickDelete}>Delete</button>}
                        <button type="button" class="btn-sm btn-common ml-2" onClick={onClickSubmit}>Save</button>
                    </div>
                </div>
            </div>

        </>
    )
}

const mapStoreToProps = state => ({
    create_query_loading: state.queryControlReducer.getIn(['create_query', 'loading'], true),
    create_query: state.queryControlReducer.getIn(['create_query'], new Map()),
    //update
    update_query_ctl_loading: state.queryControlReducer.getIn(['update_query_ctl', 'loading'], true),
    update_query_ctl: state.queryControlReducer.getIn(['update_query_ctl'], new Map()),
    //delete
    delete_query_ctl_loading: state.queryControlReducer.getIn(['delete_query_ctl', 'loading'], true),
    delete_query_ctl: state.queryControlReducer.getIn(['delete_query_ctl'], new Map()),
    //file
    file_by_id_loading: state.trackReducer.getIn(['file_by_id', 'loading'], true),
    file_by_id: state.trackReducer.getIn(['file_by_id'], new Map()),

    download_by_id_loading: state.trackReducer.getIn(['download_by_id', 'loading'], true),
    download_by_id: state.trackReducer.getIn(['download_by_id'], new Map()),

    //fetch
    query_list_loading: state.queryControlReducer.getIn(['query_list', 'loading'], true),
    query_list: state.queryControlReducer.getIn(['query_list'], new Map()),

    //delete_file_by_id
    delete_file_by_id_loading: state.queryControlReducer.getIn(['delete_file_by_id', 'loading'], true),
    delete_file_by_id: state.queryControlReducer.getIn(['delete_file_by_id'], new Map()),
})
const mapDispatchToProps = {
    createQuery, updateQuery, deleteQuery, fetchAllQuery, fetchFileById,
    fetchFileByName, downloadFileById, deleteFilebyId, clearFileLoadOnSwitch
}

export default connect(mapStoreToProps, mapDispatchToProps)(FormControl)