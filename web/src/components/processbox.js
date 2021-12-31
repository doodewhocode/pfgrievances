import React from 'react'
import ReactModal from 'react-modal'

function ProcessBox(props) {
    let overlay = {
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        ...props.overlaySyle
    }
    let content = {
        width: '50%',
        height: '35%',
        left: '25%',
        right: '25%',
        top: '25%',
        bottom: 'auto',
        padding: '10px 10px 0px 10px',
        ...props.contentStyle
    }
    const style = {
        overlay,
        content
    }

    return (
        <div>
            <ReactModal
                ariaHideApp={false}
                isOpen={props.showModal}
                onRequestClose={props.handleClose}
                contentLabel={props.title}
                style={style}>
                <div className='text-left' style={{ marginBottom: 5 }}  >
                    <div style={{ margin: '0px 0px 10px 10px'}} >{props.children}</div>
                </div>
            </ReactModal>
        </div>
    )

}

export default ProcessBox