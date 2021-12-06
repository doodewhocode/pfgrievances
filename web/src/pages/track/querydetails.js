import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateQuery, fetchFileById, fetchFileByName } from '../../redux/action/trackAction'
import Confirmation from '../../components/confirmation'
import { history } from '../../modules/helpers'
import { PDFDocument } from 'pdf-lib'

let arr = [
    // { key: -2, value: 'Pending' },
    { key: -1, value: 'New' },
    { key: 0, value: 'In-Review' },
    { key: 1, value: 'In-Progress' },
    { key: 2, value: 'Completed' }
]
function QueryDetails(props) {
    const [query, setQuery] = useState(props.data)
    const [comment, setComment] = useState('')
    const [confirmationFlg, setConfirmationFlg] = useState(false)
    const [currentPdf, setCurrentPdf] = useState("")
    let userId = JSON.parse(localStorage.getItem('auth'))['userId']
    let userName = JSON.parse(localStorage.getItem('auth'))['userName']
    let userType = JSON.parse(localStorage.getItem('auth'))['userType']

    useEffect(() => {
        setQuery(prevState => {
            prevState = props.data
            return ({ ...prevState })
        })
    }, [props.data])
    let pdfDoc = null
    useEffect(async () => {
        if (!props.file_by_id_loading) {
            if (!props.file_by_id.toJS().error) {

                console.log(props.file_by_id.toJS().data)
                //const url = window.URL.createObjectURL(new Blob([props.file_by_id.toJS().data]));
                // const ab = toArrayBuffer(props.file_by_id.toJS().data['data'])
                // var bytes =new  Uint8Array(ab)
                // console.log(bytes)
                // pdfDoc = await PDFDocument.load(ab);
                //console.log(pdfDoc.saveAsBase64({ dataUri: true }));
                setCurrentPdf(props.file_by_id.toJS().data)
                //let blob = new Blob([props.file_by_id.toJS().data])
                //let pdfWindow = window.open("")
                //pdfWindow.document.write(`<iframe width='100%' height='100%' src= '${props.file_by_id.toJS().data}'></iframe>`)
                // var fileURL = URL.createObjectURL(blob);
                // const link = document.createElement('a');
                // link.href = fileURL;
                // link.setAttribute('download', "doc1.pdf"); //or any other extension
                // document.body.appendChild(link);
                // link.click()
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
    const onChangeHandler = (e) => {
        let id = e.target.id, value = e.target.value
        if (value) {
            setQuery(prevState => {
                prevState[id] = value
                return ({ ...prevState })
            })
        }
    }
    function updateOrderStatus() {
        if (query) {
            props.updateQuery(query)
        }
    }

    function cancelOrder() {
        setConfirmationFlg(true)

    }

    function postComment() {
        if (query && comment) {
            setQuery(prevState => {
                let commentsArr = (Array.isArray(prevState.comments)) ? prevState.comments : []
                commentsArr.push({
                    user: (userType !== 'employer' && userType !== 'admin') ? userName : userType,
                    date: new Date(),
                    comment
                })
                prevState.comments = commentsArr
                prevState['lastModifiedBy'] = userName
                return ({ ...prevState })
            })
            props.updateQuery(query)
        }
    }

    function updateStatus() {
        if (query && query.queryLevel) {
            setQuery(prevState => {
                let arr = (Array.isArray(prevState['trackStatus'])) ? prevState.trackStatus : []
                arr.push({
                    name: userName,
                    type: userType,
                    date: new Date(),
                    level: query.queryLevel
                })
                prevState.trackStatus = arr
                prevState['lastModifiedBy'] = userName
                return ({ ...prevState })
            })
            props.updateQuery(query)
        }
    }

    function confirmationHandler() {
        if (query) {
            setQuery(prevState => {
                prevState['lastModifiedBy'] = userName
                prevState['employerId'] = userId
                prevState['assignedTo'] = userName
                prevState['status'] = prevState.queryLevel
                return ({ ...prevState })
            })
            props.updateQuery(query)
        }
    }

    function closeHandler() {
        setConfirmationFlg(false)
    }

    function getFile(id) {
        props.fetchFileById(id)
    }


    function reUploadDoc() {
        history.push('/app/form/' + query._id)
    }
    return (
        <>
            <div>
                <br />
                {confirmationFlg && <Confirmation
                    showModal={confirmationFlg}
                    handleClose={(e) => closeHandler()}
                    handleConfirmationMessage={(e) => confirmationHandler(e)}
                    title={'Confirmation'}
                > <span>Are you sure you want to cancel the order</span>

                </Confirmation>}

                {(userType == 'employer' || userType == 'admin') &&
                    <div className={'row pull-right'}>
                        <div className={'col-md-10'}> <select className={'form-control rounded-0'} id={'queryLevel'} value={query && query.queryLevel} onChange={(e) => onChangeHandler(e)}>
                            <option value='' >Select</option>
                            {arr.map(item => <option value={item.key}>{item.value}</option>)}
                        </select></div> <div className={'col-md-2'}>
                            <button className={'btn btn-danger btn-sm rounded-0'} onClick={() => updateStatus()}>Save</button></div>
                    </div>
                }
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <h4>Request Information</h4><hr />
                        <ul className="tracklist">
                            <li><strong>User ID: </strong>{query && query.userId}</li>
                            <li><strong>Grievance ID: </strong> {query && query.grivId}</li>
                            <li><strong>Grievance Type: </strong>{query && query.grivType}</li>
                            <li><strong>Note: </strong>{query && query.note}  </li>
                            <li><strong>Status: </strong>{query && query.status}</li>
                            <li><strong>Doc 1: </strong>{(query && query.grivDoc1) && query.grivDoc1.map((obj, key) => <><br /> {(key + 1) + ". "} <span > {obj.id} , {obj.date}</span> &nbsp; <a style={{
                                cursor: 'pointer',
                                color: '#007bff',
                                textDecoration: 'underline'
                            }} onClick={() => getFile(obj.id)}>view</a></>
                            )}</li><br />
                            <li><strong>Doc 2: </strong>{(query && query.grivDoc2) && query.grivDoc2.map((obj, key) => <><br />  {(key + 1) + ". "} <span > {obj.id} , {obj.date}</span> &nbsp; <a style={{
                                cursor: 'pointer',
                                color: '#007bff',
                                textDecoration: 'underline'
                            }} onClick={() => getFile(obj.id)}>view</a></>
                            )}</li><br />
                            <li><strong>Start Date :</strong>{query && query.startDate}</li>
                            <li><strong>Payment Status</strong>{query && query.paymentStatus}</li>
                            <li><strong>Payment Method :</strong>{query && query.paymentMethod}</li>
                            <li><strong>Paid :</strong>{query && query.paidAmount}</li>
                        </ul>
                        <div className={'row '}>
                            <div className={'col-6 '}>
                                <textarea className={'form-control rounded-0'} value={comment} onChange={(e) => setComment(e.target.value)} />
                                <button className={'btn btn-danger rounded-0 btn-sm'} onClick={() => postComment()}>Post</button>
                            </div>
                            <div className="col-6 pull-right">
                                <button className={'btn btn-danger rounded-0 btn-sm'} onClick={() => cancelOrder()}>Cancel Request</button>
                            </div><br />
                            <div className="col-6 pull-right">
                                <button className={'btn btn-danger rounded-0 btn-sm'} onClick={() => reUploadDoc()}>Re-Submit Document</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <iframe src={currentPdf} type="application/pdf" height="100%" width="100%" />
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStoreToProps = state => ({
    update_query_loading: state.trackReducer.getIn(['update_query', 'loading'], true),
    update_query: state.trackReducer.getIn(['update_query'], new Map()),

    file_by_id_loading: state.trackReducer.getIn(['file_by_id', 'loading'], true),
    file_by_id: state.trackReducer.getIn(['file_by_id'], new Map())
})
const mapDispatchToProps = {
    updateQuery,
    fetchFileById,
    fetchFileByName
}

export default connect(mapStoreToProps, mapDispatchToProps)(QueryDetails)