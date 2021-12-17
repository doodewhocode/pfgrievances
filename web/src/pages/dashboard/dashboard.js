import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import logo from '../../assets/images/logo.png'
import Profile from '../profile'
import Track from '../track'
import Form from '../form'
import Summary from './home'
import Auth from '../../modules/Auth'


function Dashboard(props) {


    return (
        <div class="app-wrapper">
            <div class="navbar navbar-expand-md bg-inverse fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand p-0" href="./index.html">
                        <img src={logo} alt="Comply-HR Logo" />
                    </a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav w-100 justify-content-end">
                            <li class="nav-item d-flex align-items-center ml-3" role="presentation">
                                <i class="icon-avatar icon-lg"></i>
                                <Link class="nav-item ml-2 p-0" to="/app/profile">Employee Name</Link>
                            </li>
                            <li class="nav-item d-flex align-items-center ml-3" role="presentation">
                                <i class="icon-logout icon-lg"></i>
                            </li>
                        </ul>
                        <ul class="navbar-nav align-items-center ml-auto">
                            <li class="nav-item dropdown no-caret mr-3 dropdown-notifications">
                                <a class="btn btn-icon btn-transparent-dark dropdown-toggle"
                                    id="navbarDropdownAlerts" href="javascript:void(0);" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-bell fa-fw"></i></a>
                                <div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts"><h6 class="dropdown-header dropdown-notifications-header">
                                    Alerts Center</h6><a class="dropdown-item dropdown-notifications-item" href="#!"><div class="dropdown-notifications-item-icon bg-warning"></div>
                                        <div class="dropdown-notifications-item-content">
                                            <div class="dropdown-notifications-item-content-details">December 29, 2019</div>
                                            <div class="dropdown-notifications-item-content-text">This is an alert message. It's nothing serious, but it requires your attention.</div></div></a><a class="dropdown-item dropdown-notifications-item" href="#!"><div class="dropdown-notifications-item-icon bg-info"></div><div class="dropdown-notifications-item-content"><div class="dropdown-notifications-item-content-details">December 22, 2019</div><div class="dropdown-notifications-item-content-text">
                                                A new monthly report is ready. Click here to view!</div></div>
                                    </a><a class="dropdown-item dropdown-notifications-item" href="#!">
                                        <div class="dropdown-notifications-item-icon bg-danger"></div>
                                        <div class="dropdown-notifications-item-content">
                                            <div class="dropdown-notifications-item-content-details">December 8, 2019</div>
                                            <div class="dropdown-notifications-item-content-text">Critical system failure, systems shutting down.</div></div></a><a class="dropdown-item dropdown-notifications-item" href="#!">
                                        <div class="dropdown-notifications-item-icon bg-success"></div>
                                        <div class="dropdown-notifications-item-content">
                                            <div class="dropdown-notifications-item-content-details">December 2, 2019</div>
                                            <div class="dropdown-notifications-item-content-text">New user request. Woody has requested
                                                access to the organization.</div></div></a><a class="dropdown-item dropdown-notifications-footer"
                                                    href="#!">View All Alerts</a></div></li><li class="nav-item dropdown no-caret mr-3
                           dropdown-notifications"><a class="btn btn-icon btn-transparent-dark dropdown-toggle"
                                    id="navbarDropdownMessages" href="javascript:void(0);" role="button" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false"><i class="fa fa-envelope fa-fw"></i></a>
                            </li><li class="nav-item dropdown no-caret mr-3 dropdown-user show">
                                <a class="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);"
                                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <img class="img-fluid" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" /></a><div class="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up show" aria-labelledby="navbarDropdownUserImage"><h6 class="dropdown-header d-flex align-items-center">
                                        <img class="dropdown-user-img" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" /><div class="dropdown-user-details"><div class="dropdown-user-details-name"></div><div class="dropdown-user-details-email">
                                        </div></div></h6><div class="dropdown-divider"></div><a class="dropdown-item" href="/app/userprofile">
                                        <div class="dropdown-item-icon">
                                        </div>Account</a>
                                    <a class="dropdown-item" onClick={() => Auth.logout()}><div class="dropdown-item-icon">
                                    </div>Logout</a></div></li></ul>
                    </div>
                </div>
            </div>


            <nav class="navbar-vertical sidenav navbar-hover">
                <div id="navbarHover">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link active d-flex align-items-center" to="/app/summary">
                                <i class="icon-dashboard"></i>
                                <div class="nav-link-text">My Dashboard</div>
                            </Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link  d-flex align-items-center justify-content-between" href="#"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="d-flex align-items-center">
                                    <i class="icon-copy"></i>
                                    <div class="nav-link-text">PF Grievances</div>
                                </div>
                                <div class="d-flex align-items-center ">
                                    <i class="icon-down_arrow mr-auto"></i>
                                </div>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#"
                                        style={{ padding: "10px" }}>
                                        <div class="nav-link-text">Online</div>
                                        <i class="icon-arrow" style={{ transform: "rotate(180deg)" }}></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><Link class="dropdown-item" to="/app/form">1. Name Change Correction </Link>
                                        </li>
                                        <li><a class="dropdown-item" href="#">2. DOB Correction </a></li>
                                        <li><a class="dropdown-item" href="#">3. PF Partial Withdrawal with Adhaar </a></li>
                                        <li><a class="dropdown-item" href="#">4. PF Partial Withdrawal with Adhaar</a></li>
                                        <li><a class="dropdown-item" href="#">5. Fund Transfer </a></li>
                                        <li><a class="dropdown-item" href="#">6. Password change Mobile Number Lost </a>
                                        </li>
                                        <li><a class="dropdown-item" href="#">7. Password change with Mobile Number</a></li>
                                        <li><a class="dropdown-item" href="#">8. UAN Activation </a></li>
                                        <li><a class="dropdown-item" href="#">9. KYC Activation </a></li>
                                        <li><a class="dropdown-item" href="#">10. Mark Exit through Employee Portal </a>
                                        </li>
                                        <li><a class="dropdown-item" href="#">11. Nominee Updation </a></li>
                                        <li><a class="dropdown-item" href="#">12.Death Case </a></li>
                                        <li><a class="dropdown-item" href="#">13.To Apply Pension Benefit Online (Scheme
                                            Ceritificate) </a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="dropdown-item d-flex align-items-center justify-content-between" href="#"
                                        style={{ padding: "10px" }}>
                                        <div class="nav-link-text">Offline</div>
                                        <i class="icon-arrow" style={{ transform: "rotate(180deg)" }}></i>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="./offline.html">1. Name Change Correction </a>
                                        </li>
                                        <li><a class="dropdown-item" href="#">2. DOE Correction </a></li>
                                        <li><a class="dropdown-item" href="#">3. Father Name Correction </a></li>
                                        <li><a class="dropdown-item" href="#">4. DOB Correction</a></li>
                                        <li><a class="dropdown-item" href="#">5. PF Partial Withdrawal Non Aadhaar </a></li>
                                        <li><a class="dropdown-item" href="#">6. PF Partial Withdrawal Aadhaar </a> </li>
                                        <li><a class="dropdown-item" href="#">7. PF Full Withdrawal with Aadhaar</a></li>
                                        <li><a class="dropdown-item" href="#">8. PF Full Withdrawal Non Aadhaar </a></li>
                                        <li><a class="dropdown-item" href="#">9. Fund Transfer </a></li>
                                        <li><a class="dropdown-item" href="#">10. Death Case</a>
                                        </li>
                                        <li><a class="dropdown-item" href="#">11. Nominee Updation </a></li>
                                        <li><a class="dropdown-item" href="#">12. Death Case </a></li>
                                        <li><a class="dropdown-item" href="#">13. Mark Exist</a></li>
                                        <li><a class="dropdown-item" href="#">13. Mobile Number Change Request</a></li>
                                        <li><a class="dropdown-item" href="#">13. PF Remittence</a></li>
                                        <li><a class="dropdown-item" href="#">13. To Apply Pension Benefit</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </nav>
            <div class="section-gap">
                <div class="dashboard">
                    <div class="container-fluid">
                        <Switch>
                            <Route path="/app/home" component={Summary} />
                            <Route path="/app/profile" component={Profile} />
                            <Route path="/app/form" component={Form} />
                            <Route path="/app/track" component={Track} />
                            <Route path="/app/track/:id" component={Track} />
                            <Redirect from="/" to="/app/home" />
                        </Switch>
                    </div>
                    <footer className="footer mt-auto footer-light">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 small">Copyright © complyhr 2021</div>
                                <div className="col-md-6 text-md-right small">
                                    <a href="#!">Privacy Policy</a>                                ·
                                    <a href="#!">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}
export default connect()(Dashboard)

