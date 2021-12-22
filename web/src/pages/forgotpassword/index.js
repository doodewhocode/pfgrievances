import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import Header from '../header'
import { forgotpassword } from '../../redux/action/signinAction'

function ForgotPassword(props) {
    const [email, setEmail] = useState("")
    useEffect(() => {
        if (!props.forgot_pwd_loading) {
            if (!props.forgot_pwd.toJS().error) {
                alert("Please check the email to reset the password.")
            }
        }
    }, [props.forgot_pwd_loading])

    function onResetClick() {
        console.log(email)
        props.forgotpassword({ email })
    }
    return (
        <>
            <Header /><br />
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header"><h3 className="text-center font-weight-light my-4" style={{ color: 'black' }}>Password Recovery</h3></div>
                        <div className="card-body">
                            <div className="small mb-3 text-muted">Enter your email address and we will send you a link to reset your password.</div>

                            <div className="form-floating mb-3">
                                <label for="email">Email address</label>
                                <input className="form-control" id="email" type="email" value={email} onChange={(e) => { console.log("asdf"); setEmail(e.target.value) }} placeholder="name@example.com" />

                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <Link className="small" to="/login">Return to login</Link>
                                <button className="btn btn-primary" onClick={onResetClick}>Reset Password</button>
                            </div>

                        </div>
                        <div className="card-footer text-center py-3">
                            <div className="small"><Link to="/home">Need an account? Sign up!</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        forgot_pwd_loading: state.signInReducer.getIn(['forgot_pwd', 'loading'], true),
        forgot_pwd: state.signInReducer.getIn(['forgot_pwd'], new Map())

    }
}

export default connect(mapStateToProps, { forgotpassword })(ForgotPassword)