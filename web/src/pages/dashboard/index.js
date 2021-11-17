import React, { useState, useRef, useEffect } from 'react'
import './dashboard.css'
import Header from './header'
import SideNavbar from './sidenavbar'


function Dashboard(props) {
    const [isToggled, setIsToggled] = useState(true)
    const [isOffCanvas, setIsOffCanvas] = useState(false)
    const elementRef = useRef();
    const dashboardRef = useRef();
    const adminRef = useRef();
    const { match } = props;
    
    function handleToggleSideBar() {
        setIsOffCanvas(!isOffCanvas)
    };    
   
    const handleClickOutside = (event) => {
        if (dashboardRef.current) dashboardRef.current.classList.remove('show')
        if (elementRef.current) elementRef.current.classList.remove('show')
        if (adminRef.current) adminRef.current.classList.remove('show')
    }

    return (
        <div>
            <div className={'nav-fixed '+ (isOffCanvas ? 'sidenav-toggled': '')} /* sidenav-toggled */>
                <Header handleToggleSideBar={handleToggleSideBar}/>
                <SideNavbar match={match}/>
            </div>
          
        </div>
    )
}

export default Dashboard
