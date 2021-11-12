import React from "react";

function Summary(props) {
    return (
        <>

            <div class="row pt-5">
                <div class="col-xl-4 col-md-6">
                    <div class="card card-stats bg-green">
                        <div class="card-body ">
                            <div class=" row">
                                <div class="col">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <i class="icon-tick icon-lg"
                                            style={{color: '#FFFFFF', fontSize: '40px'}}></i>
                                        <h1><b>7</b></h1>
                                    </div>
                                    <hr style={{borderColor: '#FFFFFF'}}/>
                                    <h5 class ="text-right">Active Query</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-6">
                    <div class="card card-stats bg-blue">
                        <div class="card-body ">
                            <div class=" row">
                                <div class="col">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <i class="icon-listview_search icon-lg"
                                            style={{color: '#FFFFFF', fontSize: '40px'}}></i>
                                        <h1><b>3</b></h1>
                                    </div>
                                    <hr style={{borderColor: '#FFFFFF'}}/>
                                    <h5 class ="text-right">Pending Query</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-md-6">
                    <div class="card card-stats bg-red">
                        <div class="card-body">
                            <div class=" row">
                                <div class="col">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <i class="icon-error icon-lg"
                                            style={{color: '#FFFFFF', fontSize: '40px'}}></i>
                                        <h1><b>14</b></h1>
                                    </div>
                                    <hr style={{borderColor: '#FFFFFF'}}/>
                                    <h5 class ="text-right">Closed Query</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row pt-5">
                <div class="table-bg p-0 col-12 m-auto">
                    <div class="header d-flex align-items-center justify-content-between w-100">
                        <div>Query List</div>
                        <div class="d-flex align-items-center">
                            <div class="input-group rounded mr-3" style={{width: '300px'}}>
                                <input type=" search" class="form-control rounded" placeholder="Search Query"
                                    aria-label="Search" aria-describedby="search-addon" />
                                <span class="input-group-text border-0 p-0" id="search-addon"
                                    style={{position: 'absolute', top: '7px', right: '4px', background: 'none'}}>
                                    <i class=" icon-search icon-md"></i>
                                </span>
                            </div>
                            <i class="icon-filter" role="presentation" data-toggle="collapse"
                                href="#collapseExample" role="button" aria-expanded="false"
                                aria-controls="collapseExample"></i>
                        </div>

                    </div>
                    <div class="collapse pl-3 pr-3 pt-3" id="collapseExample">
                        <div class="input-group flex-nowrap">
                            <div class="form-group w-100">
                                <label>Query Status</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>Pending</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                            <div class="form-group w-100 ml-3">
                                <label>Assigned Office</label>
                                <select class="form-control" id="exampleFormControlSelect2">
                                    <option>Chennai</option>
                                    <option>Bangalore</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Query ID</th>
                                    <th scope="col">Query Name</th>
                                    <th scope="col">Query Description</th>
                                    <th scope="col">Query Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Assigned Office</th>
                                    <th scope="col">Closed Date</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>125542</td>
                                    <td style={{verticalAlign:'middle'}}>DOE Correction</td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>Pending</td>
                                    <td style={{verticalAlign:'middle'}}>Bangalore</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>125552</td>
                                    <td style={{verticalAlign:'middle'}}>DOB Correction</td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>Completed</td>
                                    <td style={{verticalAlign:'middle'}}>Chennai</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>125652</td>
                                    <td style={{verticalAlign:'middle'}}>PF Partial Withdrawal with Adhaar</td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>Pending</td>
                                    <td style={{verticalAlign:'middle'}}>Chennai</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128952</td>
                                    <td style={{verticalAlign:'middle'}}>PF Partial Withdrawal without Adhaar
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>In Progress</td>
                                    <td style={{verticalAlign:'middle'}}>Bangalore</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128952</td>
                                    <td style={{verticalAlign:'middle'}}>Fund Transfer
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>Completed</td>
                                    <td style={{verticalAlign:'middle'}}>Bangalore</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128232</td>
                                    <td style={{verticalAlign:'middle'}}>Password change Mobile Number Lost
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>Completed</td>
                                    <td style={{verticalAlign:'middle'}}>Bangalore</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128232</td>
                                    <td style={{verticalAlign:'middle'}}>Password change with Mobile Number
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>Completed</td>
                                    <td style={{verticalAlign:'middle'}}>Bangalore</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128232</td>
                                    <td style={{verticalAlign:'middle'}}>UAN Activation
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>In-Progress</td>
                                    <td style={{verticalAlign:'middle'}}>Bangalore</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128232</td>
                                    <td style={{verticalAlign:'middle'}}>KYC Activation
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>In-Progress</td>
                                    <td style={{verticalAlign:'middle'}}>Chennai</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128232</td>
                                    <td style={{verticalAlign:'middle'}}>Mark Exit through Employee Portal
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>In-Progress</td>
                                    <td style={{verticalAlign:'middle'}}>Chennai</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128232</td>
                                    <td style={{verticalAlign:'middle'}}>Nominee Updation
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>In-Progress</td>
                                    <td style={{verticalAlign:'middle'}}>Chennai</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128232</td>
                                    <td style={{verticalAlign:'middle'}}>Death Case
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>In-Progress</td>
                                    <td style={{verticalAlign:'middle'}}>Chennai</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" style={{verticalAlign:'middle'}}>128232</td>
                                    <td style={{verticalAlign:'middle'}}>To Apply Pension Benefit Online (Scheme
                                        Ceritificate)
                                    </td>
                                    <td style={{verticalAlign:'middle'}}>Lorem ipsum dolor sit amet, consectetur
                                        adipisicing </td>
                                    <td style={{verticalAlign:'middle'}}>18/09/2021</td>

                                    <td style={{verticalAlign:'middle'}}>In-Progress</td>
                                    <td style={{verticalAlign:'middle'}}>Chennai</td>
                                    <td style={{verticalAlign:'middle'}}>19/10/2021</td>
                                    <td>
                                        <a role="presentation" href="#">View</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Summary