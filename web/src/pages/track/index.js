import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Timeline from './timeline'
import QueryDetails from './querydetails'
import UserDetails from './userdetails'
import { fetchGrivById } from '../../redux/action/trackAction'

import "./track.scss"
function Track(props) {
    const [checkOutLevel, setCheckOutLevel] = useState({
        current: 1
    })
    const [rowData, setRowData] = useState({})
    function toggleCheckout(value) {
        setCheckOutLevel(prevState => {
            prevState.current = value
            return ({ ...prevState })
        })
    }
    console.log("heheersr", props.location.pathname.replace("/app/track/", ""))
    useEffect(() => {
        props.fetchGrivById(props.location.pathname.replace("/app/track/", ""))
    }, [])

    useEffect(() => {
        if (!props.griv_by_id_loading) {
            if (!props.griv_by_id.toJS().error) {
                console.log(props.griv_by_id.toJS())
                setRowData(props.griv_by_id.toJS()['data'])
            }
        }
    }, [props.griv_by_id_loading])
    return (
        <>
            <Timeline data={rowData} />
            <div class="card mt-3 tab-card">
                <div class="card-header tab-card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a className={"nav-link " + (checkOutLevel.current === 1 ? 'active show' : '')} id="one-tab" data-toggle="tab" onClick={() => toggleCheckout(1)} href="#one" role="tab" aria-controls="One" aria-selected="true">Request Details</a>
                        </li>
                        <li class="nav-item">
                            <a className={"nav-link " + (checkOutLevel.current === 2 ? 'active show' : '')} id="two-tab" data-toggle="tab" onClick={() => toggleCheckout(2)} href="#two" role="tab" aria-controls="Two" aria-selected="false">User Details</a>
                        </li>
                        <li class="nav-item">
                            <a className={"nav-link " + (checkOutLevel.current === 3 ? 'active show' : '')} id="three-tab" data-toggle="tab" onClick={() => toggleCheckout(3)} href="#three" role="tab" aria-controls="Three" aria-selected="false">Chat History</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-content" id="myTabContent">
                    <div className={"tab-pane fade  p-3 " + (checkOutLevel.current === 1 ? 'active show' : '')} id="one" role="tabpanel" aria-labelledby="one-tab" >
                        <QueryDetails data={rowData} />
                    </div>
                    <div className={"tab-pane fade p-3 " + (checkOutLevel.current === 2 ? 'active show' : '')} id="two" role="tabpanel" aria-labelledby="two-tab" >
                        <UserDetails userId={(rowData !== {}) ? rowData.userId : ""} />
                    </div>
                    <div className={"tab-pane fade p-3 " + (checkOutLevel.current === 3 ? 'active show' : '')} id="three" role="tabpanel" aria-labelledby="three-tab" >
                        <table>
                            <th>User</th>
                            <th>Date</th>
                            <th>Comment</th>
                            <tbody>
                                {(Object.keys(rowData).length > 0) && rowData.comments.map((obj, key) => {
                                    return (<tr>
                                        <td>{obj.user}</td>
                                        <td>{obj.date}</td>
                                        <td>{obj.comment}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

const mapStoreToProps = state => ({
    griv_by_id_loading: state.trackReducer.getIn(['griv_by_id', 'loading'], true),
    griv_by_id: state.trackReducer.getIn(['griv_by_id'], new Map())
})
const mapDispatchToProps = {
    fetchGrivById
}

export default connect(mapStoreToProps, mapDispatchToProps)(Track)