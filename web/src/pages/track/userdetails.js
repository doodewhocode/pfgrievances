import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUserById } from '../../redux/action/trackAction'

function UserDetails(props) {
    const [user, serUser] = useState({})
    useEffect(() => {
        props.fetchUserById(props.userId)
    }, [props.userId])

    useEffect(() => {
        if (!props.user_by_id_loading) {
            if (!props.user_by_id.toJS().error) {
                console.log(props.user_by_id.toJS())
                serUser(props.user_by_id.toJS()['data'])
            }
        }
    }, [props.user_by_id_loading])
    return (
        <>

            <div className="row">
                <div className="col-md-6">
                    <h4>User Information</h4><hr />
                    <ul>
                        <li><strong>User ID :</strong>{user && user._id}</li>
                        <li><strong>User Name:</strong> {user && user.firstName} , {user && user.lastName}</li>
                        <li><strong>Email ID:</strong>{user && user.emailId}</li>
                        <li><strong>dob :</strong>{user && user.dob}  </li>
                        <li><strong>phNo :</strong>{user && user.phNo}</li>
                        <li><strong>employerName :</strong>{user && user.employerName}</li>

                        <li><strong>pfNo :</strong>{user && user.pfNo}</li>
                        <li><strong>uanNo :</strong>{user && user.uanNo}</li>
                        <li><strong>userType :</strong>{user && user.userType}</li>
                        <li><strong>aadhar doc</strong>{user && user.hrEmailId}</li>
                        <li><strong>pan doc</strong>{user && user.hrEmailId}</li>

                        <li><strong>hrEmailId</strong>{user && user.hrEmailId}</li>
                        <li><strong>hrMobileNo :</strong>{user && user.hrMobileNo}</li>

                    </ul>
                </div>
            </div>
        </>

    )
}

const mapStoreToProps = state => ({
    user_by_id_loading: state.trackReducer.getIn(['user_by_id', 'loading'], true),
    user_by_id: state.trackReducer.getIn(['user_by_id'], new Map())
})
const mapDispatchToProps = {
    fetchUserById
}

export default connect(mapStoreToProps, mapDispatchToProps)(UserDetails)