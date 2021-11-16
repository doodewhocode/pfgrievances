import React, {useEffect} from 'react'
import { connect } from 'react-redux'
function Dashboard(props){
return(
    <div class="app-wrapper">        
        <div class="navbar navbar-expand-md bg-inverse fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand p-0" href="./index.html">
                    <img src="./assets/logo.png" alt="Comply-HR Logo"/>
                </a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav w-100 justify-content-end">
                        <li class="nav-item d-flex align-items-center ml-3" role="presentation">
                            <i class="icon-avatar icon-lg"></i>
                            <a class="nav-item ml-2 p-0" href="./editprofile.html">Employee Name</a>
                        </li>
                        <li class="nav-item d-flex align-items-center ml-3" role="presentation">
                            <i class="icon-logout icon-lg"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

       
        <nav class="navbar-vertical sidenav navbar-hover">
            <div id="navbarHover">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active d-flex align-items-center" href="./dashboard.html">
                            <i class="icon-dashboard"></i>
                            <div class="nav-link-text">My Dashboard</div>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link  d-flex align-items-center justify-content-between" href="#"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="d-flex align-items-center">
                                <i class="icon-copy"></i>
                                <div class="nav-link-text">PF Grievances</div>
                            </div>
                            <div class="d-flex align-items-center ">
                                <i class="icon-down_arrow mr-auto"></i>
                            </div>
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item d-flex align-items-center justify-content-between" href="#"
                                    style={{padding: "10px"}}>
                                    <div class="nav-link-text">Online</div>
                                    <i class="icon-arrow" style={{transform: "rotate(180deg)"}}></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="./online.html">1. Name Change Correction </a>
                                    </li>
                                    <li><a class="dropdown-item" href="#">2. DOB Correction </a></li>
                                    <li><a class="dropdown-item" href="#">3. PF Partial Withdrawal with Adhaar </a></li>
                                    <li><a class="dropdown-item" href="#">4. PF Partial Withdrawal with Adhaar</a></li>
                                    <li><a class="dropdown-item" href="#">5. Fund Transfer </a></li>
                                    <li><a class="dropdown-item" href="#">6. Password change Mobile Number Lost </a>
                                    </li>
                                    <li><a class="dropdown-item" href="#">7. Password change with Mobile Number</a></li>
                                    <li><a class="dropdown-item" href="#">8. UAN Activation </a></li>
                                    <li><a class="dropdown-item" href="#">9. KYC Activation </a></li>
                                    <li><a class="dropdown-item" href="#">10. Mark Exit through Employee Portal </a>
                                    </li>
                                    <li><a class="dropdown-item" href="#">11. Nominee Updation </a></li>
                                    <li><a class="dropdown-item" href="#">12.Death Case </a></li>
                                    <li><a class="dropdown-item" href="#">13.To Apply Pension Benefit Online (Scheme
                                            Ceritificate) </a></li>
                                </ul>
                            </li>
                            <li>
                                <a class="dropdown-item d-flex align-items-center justify-content-between" href="#"
                                    style={{padding:  "10px"}}>
                                    <div class="nav-link-text">Offline</div>
                                    <i class="icon-arrow" style={{transform: "rotate(180deg)"}}></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="./offline.html">1. Name Change Correction </a>
                                    </li>
                                    <li><a class="dropdown-item" href="#">2. DOE Correction </a></li>
                                    <li><a class="dropdown-item" href="#">3. Father Name Correction </a></li>
                                    <li><a class="dropdown-item" href="#">4. DOB Correction</a></li>
                                    <li><a class="dropdown-item" href="#">5. PF Partial Withdrawal Non Aadhaar </a></li>
                                    <li><a class="dropdown-item" href="#">6. PF Partial Withdrawal Aadhaar </a> </li>
                                    <li><a class="dropdown-item" href="#">7. PF Full Withdrawal with Aadhaar</a></li>
                                    <li><a class="dropdown-item" href="#">8. PF Full Withdrawal Non Aadhaar </a></li>
                                    <li><a class="dropdown-item" href="#">9. Fund Transfer </a></li>
                                    <li><a class="dropdown-item" href="#">10. Death Case</a>
                                    </li>
                                    <li><a class="dropdown-item" href="#">11. Nominee Updation </a></li>
                                    <li><a class="dropdown-item" href="#">12. Death Case </a></li>
                                    <li><a class="dropdown-item" href="#">13. Mark Exist</a></li>
                                    <li><a class="dropdown-item" href="#">13. Mobile Number Change Request</a></li>
                                    <li><a class="dropdown-item" href="#">13. PF Remittence</a></li>
                                    <li><a class="dropdown-item" href="#">13. To Apply Pension Benefit</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </nav>
        <div class="section-gap">
            <div class="dashboard">
                <div class="container-fluid">
                    <div class="row pt-5">
                        <div class="col-xl-4 col-md-6">
                            <div class="card card-stats bg-green">
                                <div class="card-body ">
                                    <div class=" row">
                                        <div class="col">
                                            <div class="d-flex align-items-center justify-content-between">
                                                <i class="icon-tick icon-lg"
                                                    style={{color: "#FFFFFF", fontSize: "40px"}}></i>
                                                <h1><b>7</b></h1>
                                            </div>
                                            <hr style={{borderColor: "#FFFFFF"}}/>
                                            <h5 class="text-right">Active Query</h5>
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
                                                    style={{color: "#FFFFFF", fontSize: "40px"}}></i>
                                                <h1><b>3</b></h1>
                                            </div>
                                            <hr style={{borderColor: "#FFFFFF"}}/>
                                            <h5 class="text-right">Pending Query</h5>
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
                                                    style={{color: "#FFFFFF", fontSize: "40px"}}></i>
                                                <h1><b>14</b></h1>
                                            </div>
                                            <hr style={{borderColor: "#FFFFFF"}}/>
                                            <h5 class="text-right">Closed Query</h5>
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
                                    <div class="input-group rounded mr-3" style={{width: "300px"}}>
                                        <input type=" search" class="form-control rounded" placeholder="Search Query"
                                            aria-label="Search" aria-describedby="search-addon" />
                                        <span class="input-group-text border-0 p-0" id="search-addon"
                                            style={{position: "absolute", top: "7px", right: "4px", background: "none"}}>
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
                                            <td scope="row" style={{verticalAlign: "middle"}}>125542</td>
                                            <td style={{verticalAlign: "middle"}}>DOE Correction</td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>Pending</td>
                                            <td style={{verticalAlign: "middle"}}>Bangalore</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>125552</td>
                                            <td style={{verticalAlign: "middle"}}>DOB Correction</td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>Completed</td>
                                            <td style={{verticalAlign: "middle"}}>Chennai</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>125652</td>
                                            <td style={{verticalAlign: "middle"}}>PF Partial Withdrawal with Adhaar</td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>Pending</td>
                                            <td style={{verticalAlign: "middle"}}>Chennai</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128952</td>
                                            <td style={{verticalAlign: "middle"}}>PF Partial Withdrawal without Adhaar
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>In Progress</td>
                                            <td style={{verticalAlign: "middle"}}>Bangalore</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128952</td>
                                            <td style={{verticalAlign: "middle"}}>Fund Transfer
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>Completed</td>
                                            <td style={{verticalAlign: "middle"}}>Bangalore</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128232</td>
                                            <td style={{verticalAlign: "middle"}}>Password change Mobile Number Lost
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>Completed</td>
                                            <td style={{verticalAlign: "middle"}}>Bangalore</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128232</td>
                                            <td style={{verticalAlign: "middle"}}>Password change with Mobile Number
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>Completed</td>
                                            <td style={{verticalAlign: "middle"}}>Bangalore</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128232</td>
                                            <td style={{verticalAlign: "middle"}}>UAN Activation
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>In-Progress</td>
                                            <td style={{verticalAlign: "middle"}}>Bangalore</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128232</td>
                                            <td style={{verticalAlign: "middle"}}>KYC Activation
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>In-Progress</td>
                                            <td style={{verticalAlign: "middle"}}>Chennai</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128232</td>
                                            <td style={{verticalAlign: "middle"}}>Mark Exit through Employee Portal
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>In-Progress</td>
                                            <td style={{verticalAlign: "middle"}}>Chennai</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128232</td>
                                            <td style={{verticalAlign: "middle"}}>Nominee Updation
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>In-Progress</td>
                                            <td style={{verticalAlign: "middle"}}>Chennai</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128232</td>
                                            <td style={{verticalAlign: "middle"}}>Death Case
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>In-Progress</td>
                                            <td style={{verticalAlign: "middle"}}>Chennai</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="row" style={{verticalAlign: "middle"}}>128232</td>
                                            <td style={{verticalAlign: "middle"}}>To Apply Pension Benefit Online (Scheme
                                                Ceritificate)
                                            </td>
                                            <td style={{verticalAlign: "middle"}}>Lorem ipsum dolor sit amet, consectetur
                                                adipisicing </td>
                                            <td style={{verticalAlign: "middle"}}>18/09/2021</td>

                                            <td style={{verticalAlign: "middle"}}>In-Progress</td>
                                            <td style={{verticalAlign: "middle"}}>Chennai</td>
                                            <td style={{verticalAlign: "middle"}}>19/10/2021</td>
                                            <td>
                                                <a role="presentation" href="#">View</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
	)
	}
	export default connect()(Dashboard)

  