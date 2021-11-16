import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { registerNav } from './modules/Navigation'
import { insertToken } from './redux/action/tokenAction'
import Header from './pages/header/header'
import Footer from './pages/footer/footer'
import Dashboard from './pages/dashboard/dashboard'
import Contact from './pages/contact/contact'
import AboutUs from './pages/aboutus/aboutus'
import Login from './pages/login'

import './App.css';

function App(props) {
  useEffect(() =>{
	  
  },[])
  return (
	<div>
		<Header />
        <Router ref={registerNav}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/contact" component={Contact} />          
            {props.token && [
              <Route key="dashboard" path="/dashboard" component={Dashboard} />             
            ]}                     
            <Redirect to='/login' />
          </Switch>
        </Router>        
    </div>
    );
  }

const mapStoreToProps = state => ({
  token: state.token.user_token
})
const mapDispatchToProps = {
  insertToken
}
export default connect(mapStoreToProps, mapDispatchToProps)(App);