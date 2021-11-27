import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { createQuery, updateQuery, deleteQuery, fetchAllQuery } from '../../redux/action/queryControlAction'

let initialObj = {
    queryName: "",
    queryDesc: "",
    additionalDesc: "",
    price: "",
    docs: [],
    createdBy: JSON.parse(localStorage.getItem('auth'))['userName']
}

let validationList = ['queryName', 'queryDesc', 'price']
function FormControl(props) {
    const [state, setState] = useState(initialObj)
    const [queryList, setQueryList] = useState([])
    const [selectedForm, setSelectedForm] = useState({})
    const [selectedType, setSelectType] = useState(true)
    const fileInputRef = useRef([]);
    const docInputRef = useRef([]);


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
        let obj = queryList.find((obj) => obj.queryId == e.target.value)
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

    function onClickAdd() {
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
                formData.append('docs', arr)
            }
            for (var i = 0; i < state.docs.length; i++) {
                console.log(state.docs[i].docId)
                formData.set("file" + (i + 1), state.docs[i].file['file'], state.docs[i].docId)
            }
            console.log("state", formData)
            props.createQuery(formData)
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

    return (
        <>
            <div class="profile-wrapper mt-5">
                <div class="profile-head d-flex align-items-center pl-4">
                    Query Control
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
                    <label for="queryName" class="col-sm-6 col-form-label">Query Type*:</label>
                    <div class="col-sm-6">
                        <select className='form-control rounded-0' value={(selectedForm !== {}) ? selectedForm.queryId : ""} onChange={(e) => onChangeDropdown(e)}>
                            <option>Select Query Type</option>
                            {queryList.map((e, key) => {
                                return <option key={key} value={e.queryId}>{e.queryName}</option>
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
                    <div> <h6 >Define Documents</h6>
                        <button className="btn btn-danger btn-sm" onClick={() => onClickAdd()}> Add </button></div>

                    {state.docs.map((obj, key) => {
                        if (selectedType) {
                            return (<div class="form-group row" key={key}>
                                <label for="staticEmail" class="col-sm-2 col-form-label">{key + 1}. Document Name*:</label>
                                <div class="col-sm-4">
                                    <input type="text" id={obj.docId} class="form-control" ref={el => fileInputRef.current[key] = el} value={state.docs[key].docName} onChange={(e) => onChangeDocName(e)} />
                                </div>
                                <label for="staticEmail" class="col-sm-2 col-form-label">Upload Document*:</label>
                                <div class="col-sm-4">
                                    <input type="file" id={obj.docId} hidden ref={el => fileInputRef.current[key] = el} onChange={fileUploadChange} />
                                    <button className="btn btn-secondary btn-sm" onClick={() => fileInputRef.current[key].click()}>Upload</button>
                                    <br /><span>{printFileName(obj.docId)}</span>

                                </div>
                            </div>)
                        } else {
                            return (
                                <><span>{key + 1}. Document Name*:</span>{state.docs[key].docName}</>
                            )
                        }

                    })}
                    <div class="d-flex  align-items-center justify-content-end pb-2">
                        <button type="button" class="btn-sm btn-secondary">Clear</button>
                        {!selectedType && <button type="button" class="btn-sm btn-secondary">Delete</button>}
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
    //fetch
    query_list_loading: state.queryControlReducer.getIn(['query_list', 'loading'], true),
    query_list: state.queryControlReducer.getIn(['query_list'], new Map())

})
const mapDispatchToProps = {
    createQuery, updateQuery, deleteQuery, fetchAllQuery
}

export default connect(mapStoreToProps, mapDispatchToProps)(FormControl)