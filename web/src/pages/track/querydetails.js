import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateQuery } from '../../redux/action/trackAction'
import Confirmation from '../../components/confirmation'

let arr = [{ key: -1, value: 'New' },
{ key: 0, value: 'Confirmed' },
{ key: 1, value: 'Processing' },
{ key: 2, value: 'Completed' }
]
function QueryDetails(props) {
    const [query, setQuery] = useState(props.data)
    const [comment, setComment] = useState('')
    const [confirmationFlg, setConfirmationFlg] = useState(false)
    let userName = JSON.parse(localStorage.getItem('auth'))['userName']
    let userType = JSON.parse(localStorage.getItem('auth'))['userType']
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
                let commentsArr = prevState.comments
                prevState.comments = commentsArr.push({
                    user: (userType !== 'employer' && userType !== 'admin') ? userName : userType,
                    date: new Date(),
                    comment
                })
                return ({ ...prevState })
            })
            props.updateQuery(query)
        }
    }

    function confirmationHandler() {
        if (query) {
            setQuery(prevState => {
                prevState.orderLevel = 5
                return ({ ...prevState })
            })
            props.updateQuery(query)
        }
    }

    function closeHandler() {
        setConfirmationFlg(false)
    }



    return (
        <>
            <br />
            {confirmationFlg && <Confirmation
                showModal={confirmationFlg}
                handleClose={(e) => closeHandler()}
                handleConfirmationMessage={(e) => confirmationHandler(e)}
                title={'Confirmation'}
            > <span>Are you sure you want to cancel the order</span>

            </Confirmation>}

            {(userType == 'employer' && userType == 'admin') &&
                <div className={'row pull-right'}>
                    <div className={'col-md-10'}> <select className={'form-control rounded-0'} id={'orderLevel'} value={query && query.orderLevel} onChange={(e) => onChangeHandler(e)}>
                        <option value='' >Select</option>
                        {arr.map(item => <option value={item.key}>{item.value}</option>)}
                    </select></div> <div className={'col-md-2'}>
                        <button className={'btn btn-danger btn-sm rounded-0'} onClick={() => updateOrderStatus()}>Save</button></div>
                </div>
            }
            <div className="row">
                <div className="col-md-6">
                    <h4>Request Information</h4><hr />
                    <ul>
                        <li><strong>User ID :</strong>{query && query.userId}</li>
                        <li><strong>Grievance ID:</strong> {query && query.grivId}</li>
                        <li><strong>Grievance Type:</strong>{query && query.grivType}</li>
                        <li><strong>Note :</strong>{query && query.note}  </li>                        
                        <li><strong>Status :</strong>{query && query.status}</li>
                        <li><strong>Doc :</strong>grivDoc1</li>
                        <li><strong>Start Date :</strong>{query && query.startDate}</li>
                        <li><strong>Land Mark :</strong>{query && query.userId}</li>
                        <li><strong>Status :</strong>{query && query.status}</li>
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
                            <button className={'btn btn-danger rounded-0 btn-sm'} onClick={() => cancelOrder()}>Cancel Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const mapStoreToProps = state => ({

})
const mapDispatchToProps = {
    updateQuery
}

export default connect(mapStoreToProps, mapDispatchToProps)(QueryDetails)