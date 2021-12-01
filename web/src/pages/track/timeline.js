import React from 'react'


function Timeline(props) {



    function printNameAndDate(level, type) {
        let arr = []
        arr = Array.isArray(props.data['trackStatus']) ? props.data['trackStatus'] : []
        for (var j = 0; j < arr.length; j++) {
            if (type == "date" && level === parseInt(arr[j].level) && props.data['queryLevel'] >= level) {
                return arr[j].date
            }
            if (type == "name" && level === parseInt(arr[j].level) && props.data['queryLevel'] >= level) {
                return arr[j].type
            }
        }
        return "'"
    }

    return (
        <>
            <div className="row tracker">
                <ul className="timeline" id="timeline">
                    <li className={'li ' + (props.data['queryLevel'] >= -1 ? "complete" : "")}>
                        <div className="timestamp">
                            <span className="author">Employee</span>
                            <span className="date"><i className="fa fa-clocks"></i>{props.data['startDate']}</span>
                            <div className="status">
                                <h5>CREATED </h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li ' + (props.data['queryLevel'] >= 0 ? "complete" : "")}>
                        <div className="timestamp">
                            <span className="author">{printNameAndDate(0, "name")}</span>
                            <span className="date"><i className="fa fa-clocks"></i>{printNameAndDate(0, "date")}</span>
                            <div className="status">
                                <h5>IN-REVIEW </h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li ' + (props.data['queryLevel'] >= 1 ? "complete" : "")}>
                        <div className="timestamp">
                            <span className="author">{printNameAndDate(1, "name")}</span>
                            <span className="date"><i className="fa fa-clocks"></i>{printNameAndDate(1, "date")}</span>
                            <div className="status">
                                <h5>IN-PROGRESS </h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li ' + (props.data['queryLevel'] >= 2 ? "complete" : "")}>
                        <div className="timestamp">
                            <span className="author">{printNameAndDate(2, "name")}</span>
                            <span className="date"><i className="fa fa-clocks"></i>{printNameAndDate(2, "date")}</span>
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