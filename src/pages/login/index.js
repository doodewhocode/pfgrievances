import React, {useEffect} from 'react'

function Login(){
    return (
	<>
   <section class="pf-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12 p-0">
                    <div>
                        <img src="./assets/business-people-png-13458.png" alt="Description-Image"/>
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
                                <input type="email" class="form-control" placeholder="Enter Email-Id"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" placeholder="Enter your Password"/>
                            </div>
                            <div class="d-flex justify-content-center pb-2"> (OR) </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Enter your Phone Number</label>
                                <input type="text" class="form-control" placeholder="Enter your Phone Number"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">OTP</label>
                                <input type="password" class="form-control" placeholder="Enter the OTP"/>
                            </div>
                            <div class="d-flex align-self-center justify-content-between mb-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                    <label class="form-check-label" for="defaultCheck1">
                                        Remember me </label>
                                </div>
                                <a target="blanck" href="#">Forget Password?</a>
                            </div>
                            <div class="d-flex  align-items-center justify-content-between pb-2">
                                <button type="button" class="btn btn-common ml-2"><a
                                        href="./employee_signup.html">Register</a></button>
                                <div class="d-flex  align-items-center">
                                    <button type="button" class="btn btn-secondary">Cancel</button>
                                    <button type="button" class="btn btn-common ml-2"><a
                                            href="./dashboard.html">Login</a></button>
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
                                <input type="email" class="form-control" placeholder="Enter Email-Id"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" placeholder="Enter your Password"/>
                            </div>
                            <div class="d-flex justify-content-center pb-2"> (OR) </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Enter your Phone Number</label>
                                <input type="text" class="form-control" placeholder="Enter your Phone Number"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">OTP</label>
                                <input type="password" class="form-control" placeholder="Enter the OTP"/>
                            </div>
                            <div class="d-flex align-self-center justify-content-between mb-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                    <label class="form-check-label" for="defaultCheck1">
                                        Remember me </label>
                                </div>
                                <a target="blanck" href="#">Forget Password?</a>
                            </div>
                            <div class="d-flex  align-items-center justify-content-between pb-2">
                                <button type="button" class="btn btn-common ml-2"><a
                                        href="./employer_signup.html">Register</a></button>
                                <div class="d-flex  align-items-center">
                                    <button type="button" class="btn btn-secondary">Cancel</button>
                                    <button type="button" class="btn btn-common ml-2"><a
                                            href="./dashboard.html">Login</a></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>	
	)
}
	
export default Login