﻿import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { Map } from 'immutable'
import Profile from '../profile'
import Timeline from '../timeline'
import Form from '../form'
import Summary from './home'

function SideNavbar(props) {
    console.log(props)
    return (
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav className="sidenav shadow-right sidenav-light">
                    <div className="sidenav-menu">
                        <div className="nav accordion" id="accordionSidenav">
                            <div className="sidenav-menu-heading">Core</div>
                            <a className="nav-link" href="/app/home">
                                <div className="nav-link-icon"><i className={'fa fa-columns'}></i></div>Dashboards
                            </a>
                            <Link className="nav-link" to="/app/timetable">
                                <div className="nav-link-icon"><i class="fa fa-calendar" aria-hidden="true"></i></div>Timetable
                            </Link>
                            
                            <div className="sidenav-menu-heading">Administrative</div>
                            {(props.login['data'].userType === 'employee') &&
                                <a className="nav-link collapsed" href="javascript:void(0);" data-toggle="collapse"
                                    data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="nav-link-icon"><i className="fa fa-user-secret"></i></div> Faculty
                                    <div className="sidenav-collapse-arrow">
                                        <i className="fa fa-angle-down"></i>
                                    </div>
                                </a>}
                            <div className="collapse" id="collapseLayouts" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavLayout">
                                    <Link className="nav-link" to="/app/dailyreport"> Daily Finance Report</Link>
                                    <Link className="nav-link" to="/app/assignments">Assignments</Link>
                                    <Link className="nav-link" to="/app/examsetup">Exam Setup</Link>
                                    <Link className="nav-link" to="/app/examreport">Exam Report</Link>
                                    <Link className="nav-link" to="/app/docsbybatch"> Documents For Current Batch</Link>
                                    <div style={{ display: 'none' }}><Link className="nav-link" target={'_blank'} to="/app/docsbytymtbl">List Documents</Link></div>
                                </nav>
                            </div>

                        </div>
                    </div>
                    <div className="sidenav-footer">
                        <div className="sidenav-footer-content">
                            <div className="sidenav-footer-subtitle">Logged in as:</div>
                            <div className="sidenav-footer-title">{props.login['data'].firstName +", "+props.login['data'].lastName}</div>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
                <div className='container'>
                    <Switch>
                        <Route path="/app/home" component={Summary} />
                        <Route path="/app/profile" component={Profile} />
                        <Route path="/app/form" component={Form} />
                        <Route path="/app/timeline" component={Timeline} />
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
    )
}
function mapStateToProps(state) {
    return {
        login: state.loginReducer['login']
    }
}
export default withRouter(connect(mapStateToProps, {})(SideNavbar))