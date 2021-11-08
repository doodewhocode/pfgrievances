import React from 'react'
import ReactModal from 'react-modal'

function Modal(props) {
    let overlay = {
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        ...props.overlaySyle
    }
    let content = {
        width: '65%',
        height: '50%',
        left: '20%',
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
        <div >
            <ReactModal
                ariaHideApp={false}
                isOpen={props.showModal}
                onRequestClose={props.handleClose}
                contentLabel={props.title}
                style={style}>
                <div>
                    <div className='btn btn-sm btn-danger pull-right' onClick={() => { props.handleClose() }} style={{ cursor: 'pointer', 'color': '#FFF' }}>
                        <i className={'fa fa-close'}></i>
                    </div>
                    <div style={{ fontWeight: 'bold', borderBottom: '2px solid grey', margin: '0px 0px 10px 10px' }}>{props.title}</div>
                    <div>
                        {props.children}
                    </div>
                </div>
            </ReactModal>
        </div>
    )

}

export default Modal