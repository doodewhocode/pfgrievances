import React, { useEffect } from 'react'
import logo from '../../assets/images/logo.png'

import { Link } from "react-router-dom";
import "./navbar.scss"
import "./sidenav.scss"

function Header(props) {
    return (
        <div>
            <div class="navbar navbar-expand-md bg-inverse fixed-top scroll">
                <div class="container">
                    <a class="navbar-brand p-0" href="#">
                        <img src={logo} alt="Comply-HR Logo" />
                    </a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav w-100 justify-content-end">
                            <li class="nav-item" role="presentation">
                                <Link class="nav-link p-0" to="/home">Home</Link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <Link class="nav-link p-0" to="/aboutus">About Us</Link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <Link class="nav-link p-0" to="/contact">Contact Us</Link>
                            </li>
                            <li class="nav-item" role="presentation">
                                <Link class="nav-link p-0" to="/login#login">Login</Link>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>           
        </div>
    )
}
export default Header