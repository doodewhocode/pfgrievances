import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { registerNav } from './modules/Navigation'
import { insertToken } from './redux/action/tokenAction'
import Header from './pages/header/header'
import Footer from './pages/footer/footer'
import { PrivateRoute } from './modules/Auth/authentication';
import Dashboard from './pages/dashboard/dashboard'
import Contact from './pages/contact/contact'
import AboutUs from './pages/aboutus/aboutus'
import Login from './pages/login'
import EmployeeSignUp from './pages/signup/employeeSignup'
import EmployerSignUp from './pages/signup/employerSignup'
import Reset from './pages/forgotpassword/reset'
import ForgotPassword from './pages/forgotpassword'
import { history } from './modules/helpers'

import './App.css';

function App(props) {
  useEffect(() => {
    props.insertToken()
  }, [])

  useEffect(() => {
    if (!props.login['loading']) {
      if (!props.login['error']) {
        history.push('/app/')
      }
    }
  }, [props.login])
  return (
    <div>

      <Switch>
        <PrivateRoute path="/app" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/contact" component={Contact} />
        <Route path="/employee" component={EmployeeSignUp} />
        <Route path="/employer" component={EmployerSignUp} />
        <Route path='/reset/:token' component={Reset} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/">
          <Redirect exact from="/app" to="app" />
        </Route>
        <Route path="*">
          <Redirect from="/app" to="app" />
        </Route>
        <Redirect exact from='/' to='/login' />
      </Switch>
    </div>
  );
}

const mapStoreToProps = state => ({
  login: state.loginReducer['login']
})
const mapDispatchToProps = {
  insertToken
}
export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(App));