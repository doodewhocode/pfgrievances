import React, { useState, useEffect } from 'react'
import image from '../assets/img/loader.gif'
const style = {
    overlay: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: '3',
        cursor: 'pointer',
        display:'block'
    },
    spinner: {
        position: 'absolute',
        left: '10%'
    }
}
function Loader(props) {
    return (
        <div style={{...style.overlay}}>
            <img src={image}  style={{...style.spinner}}/>
        </div>
    )
}
export default Loader