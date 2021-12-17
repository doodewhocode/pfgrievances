import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import businessPeople from '../../assets/images/business-people-png-13458.png';
import Footer from '../footer/footer'
import Header from '../header'
import ofc from '../../assets/images/261-2614319_office-team-business-people-white-background.png'
import business from '../../assets/images/business-png-9395.png'
import PngItem from '../../assets/images/PngItem_1542519.png'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { history } from '../../modules/helpers'
import { postToken } from '../../redux/action/tokenAction'
import Toast from '../../components/toast'
import "./login.scss"




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
                history.push('/app/home')
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
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        fade: true,
        autoplay: true
    };
    return (
        <>
        <Toast message={toast.message} type={toast.type} visible={toast.visible} />
            <Header />
            <header class="pf-banner" id="home">
                <div class="pf-background"></div>
                <div class="pf-carousel">
                    <Slider {...settings}>
                        <div class="carousel-slide">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-xs-12">
                                        <div class="banner-content">
                                            <h2 class="title">ComplyHR is an one stop shop for all your PF Grievances</h2>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-xs-12 p-0">
                                        <div class="banner-img" style={{ width: "650px" }}>
                                            <img src={ofc} alt="Banner-Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-slide">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-xs-12">
                                        <div class="banner-content">
                                            <h2 class="title pb-5" style={{ paddingBottom: "50px" }}>Are you looking for Easy ,
                                                efficient, enactment on your PF Query resolutions ? Here we are.</h2>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-xs-12 pt-5">
                                        <div class="banner-img m-auto">
                                            <img src={business} alt="Banner-Image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-slide">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-xs-12">
                                        <div class="banner-content">
                                            <h2 class="title" style={{ paddingBottom: "50px" }}>Keep your easy step with our solutions
                                                driven team</h2>
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
                    </Slider>
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
                                <p class="description text-justify">PF Query is the vital task for all the industries for the
                                    mitigation,
                                    Grievances handled
                                    through software gives the
                                    smoother coordination and helps
                                    in effective resolutions across the
                                    boundaries , ultimate tracking , time tackling with cost effective
                                    <br />
                                    <br />
                                    PF members get the procedure knowledge and their timely updates with anticipation of quick
                                    resolutions with less
                                    dependency
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section class="login-section pt-5 pb-5">
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