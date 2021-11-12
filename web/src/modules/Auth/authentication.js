
import React from 'react';
import {Redirect, Route} from 'react-router-dom'

export const Authentication ={
	isAuthenticated:false,
	authenticate(cb){
		Authentication.isAuthenticated = true;
		setTimeout(cb, 100);
	},
	signout(cb){
		Authentication.isAuthenticated = false;
		setTimeout(cb, 100);
	}
} 


/* export const PrivateRoute = ({component: Component, privilege, ...rest}) =>(
	<Route {...rest} render={(props)=>{
		if(localStorage.getItem('user')){
			let current_user = JSON.parse(localStorage.getItem('user'))
			console.log("current_user",current_user)
			return <Component {...props}/>
		}else{
			console.log("on else condition")
			return <Redirect to={{ pathname:'/login', state:{from: props.location}}}/>
		}
	}
	}/>
) */


export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
	  {...rest}
	  render={props => localStorage.getItem('user') // your auth mechanism goes here
		? <Component {...props} />
		: <Redirect to={{ pathname: '/login' }} />}
	/>
  );