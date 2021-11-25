import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { createQuery } from '../../redux/action/queryControlAction'

let initialObj = {
    queryName: "",
    queryDesc: "",
    additionalDesc: "",
    price: "",
    docs: [],
    createdBy: JSON.parse(localStorage.getItem('auth'))['userName']
}

let validationList = ['queryName', 'queryDesc', 'price', 'docs']
function FormControl(props) {
    const [state, setState] = useState(initialObj)
    const fileInputRef = useRef([]);
    const docInputRef = useRef([]);
    function isValidForm(form) {
        for (let i = 0; i < validationList.length; i++) {
            if (form[validationList[i]].trim().length == 0) {
                return false;
            }
        }
        return true;
    }

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
            console.log("state", state)
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

        console.log("obj", { id: e.target.id, value: e.target.name })
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
        console.log(state)
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
                
                //formData.set['docs', arr.toString()]
            }
            for (var i = 0; i < state.docs.length; i++) {
                formData.set("file" + (i + 1), state.forms[i].file, state.forms[i].id)
            }
            props.createQuery(formData)
        }
    }

    function printFileName(id) {
        console.log("hehe", id)
        let returnObj = {}
        returnObj = (state.docs.length > 0) ? state.docs.find((obj) => obj.docId == id) : {}
        console.log("hehe obj", returnObj)
        return (returnObj !== {} && returnObj !== undefined && returnObj) ? returnObj.file.value : ""
    }


    return (
        <>
            <div class="profile-wrapper mt-5">
                <div class="profile-head d-flex align-items-center pl-4">
                    Query Control
                </div>
                <br />
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
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="price" value={state.price} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <div> <h6 >Define Documents</h6>
                        <button className="btn btn-danger btn-sm" onClick={() => onClickAdd()}> Add </button></div>

                    {state.docs.map((obj, key) => {
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
                    })}
                    <div class="d-flex  align-items-center justify-content-end pb-2">
                        <button type="button" class="btn-sm btn-secondary">Edit</button>
                        <button type="button" class="btn-sm btn-common ml-2" onClick={onClickSubmit}>Save</button>
                    </div>
                </div>
            </div>

        </>
    )
}

const mapStoreToProps = state => ({
    create_query_loading: state.queryControlReducer.getIn(['create_query', 'loading'], true),
    create_query: state.queryControlReducer.getIn(['create_query'], new Map())
})
const mapDispatchToProps = {
    createQuery
}

export default connect(mapStoreToProps, mapDispatchToProps)(FormControl)