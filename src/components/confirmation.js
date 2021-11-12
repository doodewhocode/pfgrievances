import React from 'react'
import ReactModal from 'react-modal'

function Confirmation(props) {
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
                    <div className='btn btn-sm btn-danger pull-right' style={{ cursor: 'pointer', 'color': '#FFF' }} onClick={()=>{props.handleClose()}}>
                        <i className={'fa fa-close'}></i>
                    </div>
                    <div style={{ fontWeight: 'bold', margin: '0px 0px 10px 10px', borderBottom: '2px solid grey' }}>
                    <h5> {props.title}</h5> 
                    </div>
                    <div style={{ margin: '0px 0px 10px 10px'}} >{props.children}</div>
                </div>
                <br />
                <div style={{ textAlign: 'right' }}>
                    <button className={'btn btn-sm btn-primary rounded-0'} value={'yes'} onClick={() => props.handleConfirmationMessage('yes')}>Yes</button> &nbsp; &nbsp;
                    <button className={'btn btn-sm btn-danger rounded-0'} value={'no'} onClick={() => props.handleConfirmationMessage('no')}>No</button>
                </div>
            </ReactModal>
        </div>
    )

}

export default Confirmation