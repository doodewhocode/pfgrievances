import React, { useState, useEffect } from 'react'
import Timeline from './timeline'


function Track(props) {
    const [checkOutLevel, setCheckOutLevel] = useState({
        current: 1
    })

    function toggleCheckout(value) {
        setCheckOutLevel(prevState => {
            prevState.current = value
            return ({ ...prevState })
        })
    }
    return (
        <>
            <Timeline />
            <div class="card mt-3 tab-card">
                <div class="card-header tab-card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a className={"nav-link " + (checkOutLevel.current === 1 ? 'active show' : '')} id="one-tab" data-toggle="tab" onClick={() => toggleCheckout(1)} href="#one" role="tab" aria-controls="One" aria-selected="true">Request Details</a>
                        </li>
                        <li class="nav-item">
                            <a className={"nav-link " + (checkOutLevel.current === 2 ? 'active show' : '')} id="two-tab" data-toggle="tab" onClick={() => toggleCheckout(2)} href="#two" role="tab" aria-controls="Two" aria-selected="false">Chat History</a>
                        </li>
                    </ul>
                </div>

                <div class="tab-content" id="myTabContent">
                    <div className={"tab-pane fade  p-3 " + (checkOutLevel.current === 1 ? 'active show' : '')} id="one" role="tabpanel" aria-labelledby="one-tab" >
                        <div className="row">
                            <div className="col-md-5">
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-5 col-form-label">Query Id:</label>
                                    <div class="col-sm-7"> </div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-5 col-form-label">Query Name:</label>
                                    <div class="col-sm-7"></div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-5 col-form-label">Query Description:</label>
                                    <div class="col-sm-7"></div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-5 col-form-label">Query Date:</label>
                                    <div class="col-sm-7"></div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-5 col-form-label">Form:</label>
                                    <div class="col-sm-7"></div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-5 col-form-label">Requester Name:</label>
                                    <div class="col-sm-7"></div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-5 col-form-label">Requester Email Id:</label>
                                    <div class="col-sm-7"></div>
                                </div>
                                <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-5 col-form-label">Requester Phone No:</label>
                                    <div class="col-sm-7"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"tab-pane fade p-3 " + (checkOutLevel.current === 2 ? 'active show' : '')} id="two" role="tabpanel" aria-labelledby="two-tab" >
                        <h5 class="card-title">Tab Card Two</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Track