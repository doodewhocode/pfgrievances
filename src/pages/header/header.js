import React, {useEffect} from 'react'

function Header(props){
	return(
<div>
    <div class="navbar navbar-expand-md bg-inverse fixed-top scroll">
        <div class="container">
            <a class="navbar-brand p-0" href="#">
                <img src="./assets/logo.png" alt="Comply-HR Logo"/>
            </a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav w-100 justify-content-end">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active p-0" href="#home">Home</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link p-0" href="./aboutus.html">About Us</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link p-0" href="./contact.html">Contact Us</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link p-0" href="#login">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <header class="pf-banner" id="home">
        <div class="pf-background"></div>
        <div class="pf-carousel">
            <div class="carousel-slide">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-12 col-xs-12">
                            <div class="banner-content">
                                <h2 class="title">Comply HR is a one stop shop for all your PF Grievances.</h2>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 col-xs-12 p-0">
                            <div class="banner-img" style={{width: "650px"}}>
                                <img src="./assets/261-2614319_office-team-business-people-white-background.png"
                                    alt="Banner-Image"/>
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
                                <h2 class="title pb-5" style={{paddingBottom: "50px"}}>PF Query process made simple
                                    with our solution</h2>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 col-xs-12 pt-5">
                            <div class="banner-img m-auto">
                                <img src="./assets/business-png-9395.png" alt="Banner-Image"/>
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
<h2 class="title" style={{paddingBottom: "50px"}}>Get your PF Grievances solved with
                                    our Expert Team </h2>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12 col-xs-12 p-0">
                            <div class="banner-img m-auto" style={{width: "400px"}}>
                                <img src="./assets/PngItem_1542519.png" alt="Banner-Image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </header>
	</div>
	)
	}
	export default Header