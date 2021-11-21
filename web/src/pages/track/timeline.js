import React from 'react'


function Timeline(props) {
    return (
        <>
            <div className="row tracker">
                <ul className="timeline" id="timeline">
                    <li className={'li complete'}>
                        <div className="timestamp">
                            <span className="author">Employee</span>
                            <span className="date"><i className="fa fa-clocks"></i>02/28/2020</span>
                            <div className="status">
                                <h5>CREATED </h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li complete'}>
                        <div className="timestamp">
                            <span className="author">EMPLOYEE</span>
                            <span className="date"><i className="fa fa-clocks"></i>02/28/2020</span>
                            <div className="status">
                                <h5>IN-REVIEW </h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li complete'}>
                        <div className="timestamp">
                            <span className="author">EMPLOYER</span>
                            <span className="date"><i className="fa fa-clocks"></i>02/28/2020</span>
                            <div className="status">
                                <h5>IN-PROGRESS </h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li complete'}>
                        <div className="timestamp">
                            <span className="author">EMPLOYER</span>
                            <span className="date"><i className="fa fa-clocks"></i>02/28/2020</span>
                            <div className="status">
                                <h5>COMPLETED</h5>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </>
    )
}

export default Timeline