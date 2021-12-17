import React from 'react'

import "./track.scss"

function Timeline(props) {


    function formatData(dateObj, format) {
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var curr_date = dateObj.getDate();
        var curr_month = dateObj.getMonth();
        curr_month = curr_month + 1;
        var curr_year = dateObj.getFullYear();
        var curr_min = dateObj.getMinutes();
        var curr_hr = dateObj.getHours();
        var curr_sc = dateObj.getSeconds();
        if (curr_month.toString().length == 1) curr_month = '0' + curr_month;
        if (curr_date.toString().length == 1) curr_date = '0' + curr_date;
        if (curr_hr.toString().length == 1) curr_hr = '0' + curr_hr;
        if (curr_min.toString().length == 1) curr_min = '0' + curr_min;
        if (format == 1) //dd-mm-yyyy
            return curr_date + "-" + curr_month + "-" + curr_year;
        else if (format == 2)
            return curr_year + "-" + curr_month + "-" + curr_date;
        else if (format == 3)
            return curr_date + "/" + curr_month + "/" + curr_year;
        else
            return curr_month + "/" + curr_date + "/" + curr_year + " " + curr_hr + ":" + curr_min + ":" + curr_sc;
    }

    function printNameAndDate(level, type) {
        let arr = []
        arr = Array.isArray(props.data['trackStatus']) ? props.data['trackStatus'] : []
        for (var j = 0; j < arr.length; j++) {
            if (type == "date" && level === parseInt(arr[j].level) && props.data['queryLevel'] >= level) {
                return formatData(new Date(arr[j].date), 4)
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
                <ul className="timeline " id="timeline">
                    <li className={'li ' + (props.data['queryLevel'] >= -1 ? "complete" : "")}>
                        <div className="timestamp">
                            <span className="author">Employee</span>
                            <span className="date"><i className="icon-time icon-sm"></i>{formatData(new Date(props.data['startDate']), 4)}</span>
                            <div className="status">
                                <h5> CREATED</h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li ' + (props.data['queryLevel'] >= 0 ? "complete" : "")}>
                        <div className="timestamp">
                            <span className="author">{printNameAndDate(0, "name")}</span>
                            <span className="date"><i className="icon-time icon-sm"></i>{printNameAndDate(0, "date")}</span>
                            <div className="status">
                                <h5>IN-REVIEW</h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li ' + (props.data['queryLevel'] >= 1 ? "complete" : "")}>
                        <div className="timestamp">
                            <span className="author">{printNameAndDate(1, "name")}</span>
                            <span className="date"><i className="icon-time icon-sm"></i>{printNameAndDate(1, "date")}</span>
                            <div className="status">
                                <h5>IN-PROGRESS</h5>
                            </div>
                        </div>
                    </li>
                    <li className={'li ' + (props.data['queryLevel'] >= 2 ? "complete" : "")}>
                        <div className="timestamp">
                            <span className="author">{printNameAndDate(2, "name")}</span>
                            <span className="date"><i className="icon-time icon-sm"></i>{printNameAndDate(2, "date")}</span>
                            <div className="status">
                                <h5>COMPLETE</h5>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Timeline