import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Map } from 'immutable'
import Profile from '../profile'
import Track from '../track'
import Form from '../form'
import Summary from './home'
import FormControl from '../formcontrol'
import Online from '../online';
import Users from '../users'
import EnableIframe from '../payment/enableIframe'
import PaymentStatus from '../payment/paymentstatus';

import "../header/sidenav.scss"
import "./dashboard.scss"


function SideNavbar(props) {
    let user = (localStorage.getItem('auth') != null && localStorage.getItem('auth') != 'undefined') ? JSON.parse(localStorage.getItem('auth')) : {}
    console.log(props)
    return (
        <>
            <div id="layoutSidenav">
                <nav id="layoutSidenav_nav" className="sidenav shadow-right sidenav-light">
                    <div className="sidenav-menu">
                        <div className="nav accordion" id="accordionSidenav">
                            <div className="sidenav-menu-heading">Core</div>                            
                            <Link className="nav-link" to="/app/home">
                                <div className="nav-link-icon"><i className={'fa fa-columns'}></i></div>Dashboards
                            </Link>
                            <a className="nav-link collapsed" href="javascript:void(0);" data-toggle="collapse"
                                data-target="#pfGrievances" aria-expanded="false" aria-controls="pfGrievances">
                                <div className="nav-link-icon"><i className="fa fa-file"></i></div> PF Grievances
                                <div className="sidenav-collapse-arrow">
                                    <i className="fa fa-angle-down"></i>
                                </div>
                            </a>
                            <div className="collapse" id="pfGrievances" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavLayout">
                                    <Link className="nav-link" to="/app/external"> online </Link>
                                    <Link className="nav-link" to="/app/form"> offline </Link>
                                    <div style={{ display: 'none' }}>
                                        <Link className="nav-link" target={'_blank'} to="/app/docsbytymtbl">List Documents</Link>
                                    </div>
                                </nav>
                            </div>
                            <div className="sidenav-menu-heading">Administrative</div>
                          
                            {(user['userType'] === 'admin') && <a className="nav-link collapsed" href="javascript:void(0);" data-toggle="collapse"
                                data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="nav-link-icon"><i className="fa fa-user-secret"></i></div> Admin
                                <div className="sidenav-collapse-arrow">
                                    <i className="fa fa-angle-down"></i>
                                </div>
                            </a>}
                            <div className="collapse" id="collapseLayouts" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavLayout">
                                    <Link className="nav-link" to="/app/usercontrol"> User Check</Link>
                                    <Link className="nav-link" to="/app/formcontrol">Query Control</Link>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="sidenav-footer">
                        <div className="sidenav-footer-content">
                            <div className="sidenav-footer-subtitle">Logged in as: </div>
                            <div className="sidenav-footer-title">{user['firstName'] + ", " + user['lastName']}</div>
                        </div>
                    </div>
                </nav>
                <div id="layoutSidenav_content">
                    <div className='container-fluid'>
                        <Switch>
                            <Route path="/app/home" component={Summary} />
                            <Route path="/app/profile" component={Profile} />
                            <Route path="/app/form" component={Form} />
                            <Route path="/app/track" component={Track} />
                            <Route path="/app/usercontrol" component={Users} />
                            <Route path="/app/formcontrol" component={FormControl} />
                           <Route Path="/app/external" component={Online} /> 
                            <Route path="/app/enableiframe" component={EnableIframe} />
                            <Route path="/app/payment" component={PaymentStatus} />
                            <Redirect from="/" to="/app/home" />
                        </Switch>
                    </div>
                    <footer className="footer mt-auto footer-light">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 small">Copyright © Cloud99 Solution 2021</div>
                                <div className="col-md-6 text-md-right small">
                                    <a href="#!">Privacy Policy</a>                                ·
                                    <a href="#!">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
function mapStateToProps(state) {
    return {
        login: state.loginReducer['login']
    }
}
export default withRouter(connect(mapStateToProps, {})(SideNavbar))