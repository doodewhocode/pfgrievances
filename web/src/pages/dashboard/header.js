import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { Map } from 'immutable'
import Auth from '../../modules/Auth'
import logo from '../../assets/logo.png'
function Header(props) {

    function handleToggle() {
        props.handleToggleSideBar()
    }

    return (
        <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
            <a class="navbar-brand p-0" >
                <img src={logo} alt="Comply-HR Logo" />
            </a>
            <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0
             mr-lg-2" id="sidebarToggle" onClick={handleToggle}><i className={'fa fa-bars fa-fw'}></i></button>
            <ul className="navbar-nav align-items-center ml-auto">
                <li className="nav-item dropdown no-caret mr-3 dropdown-user">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="javascript:void(0);" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user" aria-hidden="true"></i></a>
                    <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                        <h6 className="dropdown-header d-flex align-items-center">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <div className="dropdown-user-details">
                                <div className="dropdown-user-details-name">{props.login['data'].userName}</div>
                                <div className="dropdown-user-details-email">{props.login['data'].emailId}</div>
                            </div>
                        </h6>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/app/profile">
                            <div className="dropdown-item-icon"></div>Account</Link>
                        <a className="dropdown-item" onClick={() => Auth.logout()}>
                            <div className="dropdown-item-icon"></div>Logout</a></div>
                </li>
            </ul>
        </nav>


    )
}

function mapStateToProps(state) {
    return {
        login: state.loginReducer['login']
    }
}
export default connect(mapStateToProps, {})(Header)