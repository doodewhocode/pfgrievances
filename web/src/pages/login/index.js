import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import businessPeople from '../../assets/business-people-png-13458.png';
import Footer from '../footer/footer'
import Header from '../header'
import ofc from '../../assets/261-2614319_office-team-business-people-white-background.png'
import business from '../../assets/business-png-9395.png'
import PngItem from '../../assets/PngItem_1542519.png'
import { history } from '../../modules/helpers'
import { postToken } from '../../redux/action/tokenAction'
import Toast from '../../components/toast'

let validationList = ['emailId', 'password', 'phNo', 'otp']

let initializeObj = {
    "emailId": "",
    "password": "",
    "phNo": "",
    otp: ""
}

function Login(props) {
    const [form, setForm] = useState(initializeObj)
    const [toast, setToast] = useState({
        type: '',
        message: '',
        visible: false
    })
    function signUp(type) {
        if (type === 'employee') {
            history.push('/employee')
        } else if (type === 'employer') {
            history.push('/employer')
        } else {
            history.push('/forgotpassword')
        }
    }
    function validateEmail(email) { //Validates the email address
        var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) { //Validates the phone number
        var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/; // Change this regex based on requirement
        return phoneRegex.test(phone);
    }

    function isValidForm(form) {
        if (form['emailId'].trim().length !== 0 && form['password'].trim().length !== 0) {
            return validateEmail(form['emailId'])
        }
        if (form['phNo'].trim().length !== 0 && form['otp'].trim().length !== 0) {
            return validatePhone(form['phNo'].trim())
        }
    }
    function onChangeHandler(e) {
        let key = e.target.id, value = e.target.value
        setForm(prevState => {
            prevState[key] = value
            return ({ ...prevState })
        })
    }
    function loginSubmit() {
        let isValid = isValidForm(form)
        if (isValid) {
            props.postToken(form.emailId, form.password)
        }
    }
    useEffect(() => {
        if (!props.login['loading']) {
            if (!props.login['error']) {
                history.push('/app/')
            } else {
                setToast(prevState => {
                    prevState.message = "Login is failed, Please try again."
                    prevState.type = "error"
                    prevState.visible = true
                    return ({ ...prevState })
                })
                setTimeout(() => {
                    setToast(prevState => { prevState.visible = false; return ({ ...prevState }) })
                }, 2000)
            }
        }
    }, [props.login])
    console.log(props)

    return (
        <>
        <Toast message={toast.message} type={toast.type} visible={toast.visible} />
            <Header />
            <header class="pf-banner" id="home">
                <div class="pf-background"></div>
                <div id="myCarousel" class="pf-banner carousel slide" style={{ paddingTop: '100px' }} data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class=""></li>
                        <li data-target="#myCarousel" data-slide-to="1" class=""></li>
                        <li data-target="#myCarousel" data-slide-to="2" class="active"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item">
                            <div class="row">
                                <div class="col-lg-6 col-md-12 col-xs-12">
                                    <div class="banner-content">
                                        <h2 class="title">Comply HR is a one stop shop for all your PF Grievances.</h2>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12 col-xs-12 p-0">
                                    <div class="banner-img" style={{ width: "650px" }}>
                                        <img src={ofc} alt="Banner-Image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item active carousel-item-left">
                            <div class="row">
                                <div class="col-lg-6 col-md-12 col-xs-12">
                                    <div class="banner-content">
                                        <h2 class="title pb-5" style={{ paddingBottom: "50px" }}>PF Query process made simple
                                            with our solution</h2>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12 col-xs-12 pt-5">
                                    <div class="banner-img m-auto">
                                        <img src={business} alt="Banner-Image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item carousel-item-next carousel-item-left">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-xs-12">
                                        <div class="banner-content">
                                            <h2 class="title" style={{ paddingBottom: "50px" }}>Get your PF Grievances solved with
                                                our Expert Team </h2>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-xs-12 p-0">
                                        <div class="banner-img m-auto" style={{ width: "400px" }}>
                                            <img src={PngItem} alt="Banner-Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </header>
            <section class="pf-section">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-12 p-0">
                            <div>
                                <img src={businessPeople} alt="Description-Image" />
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 pl-5 align-self-center">
                            <div class="banner-content ">
                                <h2 class="title">Description-4</h2>
                                <p class="description">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Consequatur repellendus quaerat optio, quo distinctio ipsam tempora, officia eaque
                                    asperiores architecto odio nobis saepe! Eos rem inventore cupiditate cum, labore saepe.
                                    asperiores architecto odio nobis saepe! Eos rem inventore cupiditate cum, labore saepe.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section id="particles-js" class="login-section pt-5 pb-5">
                <div class="container" id="login">
                    <div class="row">
                        <div class="col-lg-6 col-md-12">
                            <div class="login-details m-auto">
                                <div class="header d-flex align-items-center">Employee / User Login</div>
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Enter Email-Id</label>
                                        <input type="email" id="emailId" onChange={(e) => onChangeHandler(e)} class="form-control" placeholder="Enter Email-Id" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" id="password" onChange={(e) => onChangeHandler(e)} class="form-control" placeholder="Enter your Password" />
                                    </div>
                                    <div class="d-flex justify-content-center pb-2"> (OR) </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Enter your Phone Number</label>
                                        <div class="input-group mb-3">
                                            <input type="text" id="phNo" onChange={(e) => onChangeHandler(e)} class="form-control" placeholder="Enter your Phone Number" />
                                            <div class="input-group-append">
                                                <span class="input-group-text btn-primary" style={{ padding: "0 0" }} id="basic-addon2">Get  OTP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">OTP</label>
                                        <input type="password" class="form-control" placeholder="Enter the OTP" />
                                    </div>
                                    <div class="d-flex align-self-center justify-content-between mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                            <label class="form-check-label" for="defaultCheck1">
                                                Remember me </label>
                                        </div>
                                        <a target="blanck" onClick={() => signUp('forgotpassword')}>Forget Password?</a>
                                    </div>
                                    <div class="d-flex  align-items-center justify-content-between pb-2">
                                        <button type="button" class="btn btn-common ml-2"><a
                                            onClick={() => signUp('employee')}>Register</a></button>
                                        <div class="d-flex  align-items-center">
                                            <button type="button" class="btn btn-secondary">Cancel</button>
                                            <button type="button" class="btn btn-common ml-2" onClick={() => loginSubmit()} >Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 ">
                            <div class="login-details m-auto">
                                <div class="header d-flex align-items-center">Employer Login</div>
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Enter Email-Id</label>
                                        <input type="email" class="form-control" placeholder="Enter Email-Id" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" placeholder="Enter your Password" />
                                    </div>
                                    <div class="d-flex justify-content-center pb-2"> (OR) </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Enter your Phone Number</label>
                                        <input type="text" class="form-control" placeholder="Enter your Phone Number" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">OTP</label>
                                        <input type="password" class="form-control" placeholder="Enter the OTP" />
                                    </div>
                                    <div class="d-flex align-self-center justify-content-between mb-4">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                            <label class="form-check-label" for="defaultCheck1">
                                                Remember me </label>
                                        </div>
                                        <a target="blanck" onClick={() => signUp('forgotpassword')}>Forget Password?</a>
                                    </div>
                                    <div class="d-flex  align-items-center justify-content-between pb-2">
                                        <button type="button" class="btn btn-common ml-2"><a
                                            onClick={() => signUp('employer')}>Register</a></button>
                                        <div class="d-flex  align-items-center">
                                            <button type="button" class="btn btn-secondary">Cancel</button>
                                            <button type="button" class="btn btn-common ml-2" onClick={() => loginSubmit()}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

const mapStoreToProps = state => ({
    login: state.loginReducer['login']
})
const mapDispatchToProps = {
    postToken
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login)