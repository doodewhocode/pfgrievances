import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUserById } from '../../redux/action/trackAction'
import { fetchFileById, fetchFileByName } from '../../redux/action/trackAction'

function UserDetails(props) {
    const [user, serUser] = useState({})
    const [currentPdf, setCurrentPdf] = useState("")
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

    useEffect(() => {
        if (!props.file_by_id_loading) {
            if (!props.file_by_id.toJS().error) {

                //console.log(props.file_by_id.toJS().data)
                const url = window.URL.createObjectURL(new Blob([props.file_by_id.toJS().data]));
                //let blob = new Blob([props.file_by_id.toJS().data])
                setCurrentPdf(props.file_by_id.toJS().data)
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

    function getFile(id) {
        props.fetchFileById(id)
    }

    function returnDocObj(user, type) {
        if (Object.keys(user).length > 0) {
            if (user[type] !== undefined) {
                if (Object.keys(user[type]).length > 0) {
                    return (<> <span > {user[type].id} , {user[type].date}</span> &nbsp; <a style={{
                        cursor: 'pointer',
                        color: '#007bff',
                        textDecoration: 'underline'
                    }} onClick={() => getFile(user[type].id)}>view</a></>)
                }
            }
        }
    }
    return (
        <>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <h4>User Information</h4><hr />
                    <ul className="tracklist">
                        <li><strong>User ID :</strong>{user && user._id}</li>
                        <li><strong>User Name:</strong> {user && user.firstName} , {user && user.lastName}</li>
                        <li><strong>Email ID:</strong>{user && user.emailId}</li>
                        <li><strong>dob :</strong>{user && user.dob}  </li>
                        <li><strong>phNo :</strong>{user && user.phNo}</li>
                        <li><strong>employerName :</strong>{user && user.employerName}</li>
                        <li><strong>pfNo :</strong>{user && user.pfNo}</li>
                        <li><strong>uanNo :</strong>{user && user.uanNo}</li>
                        <li><strong>userType :</strong>{user && user.userType}</li>
                        <li><strong>aadhar doc :</strong><br />{returnDocObj(user, "aadharImg")}</li>
                        <li><strong>pan doc :</strong><br />{returnDocObj(user, "panImg")}</li>
                        <li><strong>hrEmailId : </strong>{user && user.hrEmailId}</li>
                        <li><strong>hrMobileNo :</strong>{user && user.hrMobileNo}</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <iframe src={currentPdf} type="application/pdf" height="100%" width="100%" />
                </div>
            </div>
        </>

    )
}

const mapStoreToProps = state => ({
    user_by_id_loading: state.trackReducer.getIn(['user_by_id', 'loading'], true),
    user_by_id: state.trackReducer.getIn(['user_by_id'], new Map()),

    file_by_id_loading: state.trackReducer.getIn(['file_by_id', 'loading'], true),
    file_by_id: state.trackReducer.getIn(['file_by_id'], new Map())
})
const mapDispatchToProps = {
    fetchUserById, fetchFileById, fetchFileByName
}

export default connect(mapStoreToProps, mapDispatchToProps)(UserDetails)