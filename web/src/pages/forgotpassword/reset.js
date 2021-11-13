import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { checkResetToken, resetPassword } from '../../redux/action/resetAction'

function Reset(props) {
    const [checkToken, setCheckToken] = useState(false)
    const [state, setState] = useState({ password: '', confirmpassword: '' })

    useEffect(() => {
        props.checkResetToken(props.match.params.token);
    }, [])

    useEffect(() => {
        if (!props.check_reset_token_loading) {

            if (!props.check_reset_token.toJS().error) {
                console.log(props.check_reset_token.toJS().data)
                setCheckToken(true)
            }
        }
    }, [props.check_reset_token_loading])

    function onChangeHandler(e) {
        let id = e.target.id, value = e.target.value
        setState(prevState => {
            prevState[id] = value
            return ({ ...prevState })
        })
    }

    function onSubmitHandler() {
        let isValid = validateForm(state)
        if (isValid) {
            props.resetPassword(props.match.params.token, state)
        }else{
            alert('Please verify the password.')
        }
    }

    function validateForm(form) {
        let arr = ['password', 'confirmpassword']
        /* for (let i in arr) {
            if (!form[i]) {
                return false
            }
        } */
        if (form[arr[0]] !== form[arr[1]]) {
            return false
        }
        return true
    }

    return (
        <div><br /><br /><br /><br />
            <div className="jumbtron"><div className="container">
                <h4 class="postdata" style={{ textAlign: 'center' }}></h4>
                <div class="main-agileits">
                    <h2 class="sub-head">Reset Password</h2>
                    {checkToken ? <div class="sub-main">
                        <div>
                            <span class="senddata"></span><br />
                            <input placeholder="Enter Password" name="password" id="password" type="password" onChange={(e) => onChangeHandler(e)} required="" /><br /><br />
                            <input placeholder="Confirm Password" name="confirmpassword" id="confirmpassword" type="password" onChange={(e) => onChangeHandler(e)} required="" /><br /><br />
                            <button type="submit" className={'btn btn-sm btn-primary rounded-0'} name="submit" onClick={() => onSubmitHandler()} >RESET PASSWORD</button>
                        </div>
                    </div> : <div>{props.check_reset_token.toJS().data}</div>}
                </div>
            </div></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        check_reset_token_loading: state.ResetReducer.getIn(['check_reset_token', 'loading'], false),
        check_reset_token: state.ResetReducer.getIn(['check_reset_token'], Map())
    }
}
export default connect(mapStateToProps, { checkResetToken, resetPassword })(Reset)