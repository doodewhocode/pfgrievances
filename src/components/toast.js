import React, { useState, useEffect } from 'react'
const styles = {
    success: {
        backgroundColor: '#00AC3E'
    },
    warning: {
        backgroundColor: '#FFBC3D'
    },
    error: {
        backgroundColor: '#ED7000'
    },
    info: {
        backgroundColor: '#0088CE'
    }
}

const getStyle = (type) => {
    return {
        textAlign: 'center',
        padding: '10px',
        margin: '0.5em 0em',
        color: 'white',
        ...styles[type]
    }
}

function Toast({ message, timer, type, visible }) {
    const [showToast, setShowToast] = useState(false)
    var defaultTimer = 1000
    useEffect(() => {
        setShowToast(visible);
        /* setTimeout(()=>{
            setShowToast(false)
        }, defaultTimer) */
    }, [visible])
    return (
        showToast && <div style={{ display: 'flex', flexDirection: 'column', position: 'fixed', top: '120px', right: '10px', zIndex: '1' }}>
            <i style={getStyle(type)}>
                {message}
            </i>
        </div>
    )
}

export default Toast