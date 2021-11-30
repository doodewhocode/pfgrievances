import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { AgGridReact } from '@ag-grid-community/react'
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css'
import { Map, List } from 'immutable'
import { history } from '../../../modules/helpers'
import Modal from '../../../components/modal'
import Confirmation from '../../../components/confirmation'
import { fetchEmployeeReqs, fetchEmployerReqs, fetchAdminReqs } from '../../../redux/action/dashboardAction'
import PieChart from "../../chart";


function Summary(props) {
    const [gridApi, setGridApi] = useState(null)
    const [rowData, setRowData] = useState(null)
    const [status, setStatus] = useState({
        pending: 0,
        new: 0,
        inReview: 0,
        inProgress: 0,
        completed: 0
    })
    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalDeleteFlg, setModalDeleteFlg] = useState(false)
    const [tempData, setTempData] = useState([])

    let userId = null, employerName = null, userType = null
    let gridOptions = {
        modules: AllCommunityModules,
        columnDefs: [
            {
                headerName: 'Query ID', field: '_id', width: 180, filter: false, cellRenderer: (params) => {
                    var link = document.createElement('a');
                    link.href = '#';
                    link.innerHTML = params.value;
                    link.addEventListener('click', (e) => {
                        e.preventDefault()
                        idClickHandler(params.value)
                    })
                    return link
                }
            },
            { headerName: "Query Name", field: "grivType", width: 170 },
            // { headerName: "Note", field: "note", width: 100, filter: false },
            { headerName: "Created Date", field: "startDate", width: 120 },
            { headerName: "Status", field: "status", width: 75 },
            { headerName: "End Date", field: "endDate", width: 100 },
            { headerName: "Payment", field: "paymentStatus", width: 90 },
            { headerName: "view", filter: false, width: 50, cellRendererFramework: clickableField },
        ],
        rowSelection: 'single',
        rowData: [],
        defaultColDef: {
            editable: false,
            resizable: true,
            filter: true
        },
        context: { componentParent: this }
    }

    useEffect(() => {
        async function loadFirst() {
            userId = await JSON.parse(localStorage.getItem('auth')).userId
            userType = await JSON.parse(localStorage.getItem('auth')).userType
            employerName = await JSON.parse(localStorage.getItem('auth')).employerName
            if (userType == "employee") {
                props.fetchEmployeeReqs(userId)
            } else {
                props.fetchEmployerReqs(employerName)
            }
        }
        loadFirst()
    }, [])

    useEffect(() => {
        if (!props.empl_reqs_loading) {
            if (!props.empl_reqs.toJS().error) {
                console.log(props.empl_reqs.toJS())
                setRowData(props.empl_reqs.toJS()['data'])
                setTempData(props.empl_reqs.toJS()['data'])
                let obj = calChartSummary(props.empl_reqs.toJS()['data'])
                console.log("hehe", obj)
                setStatus((prevState) => {
                    for (let key in obj) {
                        prevState[key] = obj[key]
                    }
                    return ({ ...prevState })
                })
            }
        }
    }, [props.empl_reqs_loading])

    useEffect(() => {
        if (!props.emplr_reqs_loading) {
            if (!props.emplr_reqs.toJS().error) {
                console.log(props.emplr_reqs.toJS())
                setRowData(props.emplr_reqs.toJS()['data'])
                setTempData(props.emplr_reqs.toJS()['data'])
                let obj = calChartSummary(props.emplr_reqs.toJS()['data'])
                console.log("hehe", obj)
                setStatus((prevState) => {
                    for (let key in obj) {
                        prevState[key] = obj[key]
                    }
                    return ({ ...prevState })
                })
            }
        }
    }, [props.emplr_reqs_loading])



    const idClickHandler = (id) => {
        history.push('/app/track/' + id)
    }
    const viewClickHandler = (data) => {
        history.push('/app/track/' + data._id)
    }
    const deleteClickHandler = () => {
        setModalDeleteFlg(true)
    }

    function clickableField(gridProps) {
        let { data, colDef } = gridProps
        if (colDef.field === "view") {
            return <button className={'btn btn-sm btn-primary rounded-0'} onClick={() => { viewClickHandler(data) }}><i className={'fa fa-file'}></i></button>
        } else if (colDef.field === "cancel") {
            return <button className={'btn btn-sm btn-secondary rounded-0'} onClick={() => { deleteClickHandler(data) }}><i className={'fa fa-trash'}></i></button>
        }
        return null
    }
    const onGridReady = (params) => {
        const { api, columnApi } = params
        api.sizeColumnsToFit();
        api.refreshCells()
        setGridApi(api);
    }

    function calChartSummary(data) {
        let a = 0, b = 0, c = 0, d = 0, e = 0, f = 0;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].status)
            if (data[i].status === 'Pending') { a++; }
            else if (data[i].status === 'New') b++;
            else if (data[i].status === 'In-Review') c++;
            else if (data[i].status === 'In-Progress') d++;
            else if (data[i].status === 'Completed') e++;
            //else f++;
            //return obj
        }
        return {
            pending: a,
            new: b,
            inReview: c,
            inProgress: d,
            completed: e,
            // other: f
        }
    }

    let labels = ['Pending', 'New', 'In-Review', 'In-Progress', 'Completed']

    const arrChartData = () => {
        let arr = []
        for (let key in status) {
            arr.push(status[key])
        }

        return arr
    }
    function filterByValue(array, string) {
        return array.filter(o => Object.keys(o).some(k => {
            if (k !== "trackStatus" && k !== "comments" && k !== "grivDoc1" && k !== "grivDoc2"
                && k !== "grivDoc3" && k !== "proofDocZip" && k != "queryLevel" && k !== "__v" && k!=="endDate") {
                console.log("key", k)
                return o[k].toLowerCase().includes(string.toLowerCase())
            }
        }));
    }

    function handleSearchInput(e) {
        let value = e.target.value
        setSearch(value)
        let tempArr = filterByValue(rowData, value)
        setTempData(tempArr)
    }

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
                                            style={{ color: '#FFFFFF', fontSize: '40px' }}></i>
                                        <h1><b>{rowData && rowData.length}</b></h1>
                                    </div>
                                    <hr style={{ borderColor: '#FFFFFF' }} />
                                    <h5 class="text-right">Total Query</h5>
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
                                            style={{ color: '#FFFFFF', fontSize: '40px' }}></i>
                                        <h1><b>{status.pending}</b></h1>
                                    </div>
                                    <hr style={{ borderColor: '#FFFFFF' }} />
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
                                            style={{ color: '#FFFFFF', fontSize: '40px' }}></i>
                                        <h1><b>{status.completed}</b></h1>
                                    </div>
                                    <hr style={{ borderColor: '#FFFFFF' }} />
                                    <h5 class="text-right">Closed Query</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {((userType !== null || userType !== undefined) && userType === 'employer') && <div>
                <button className={'btn btn-sm btn-danger'} >All Requests</button>
                <button className={'btn btn-sm btn-danger'}>My Requests</button>
            </div>}
            <br />
            <div><input type="text" id={'search'} value={search} placeholder={'search'} onChange={handleSearchInput} /></div>
            <div class="row ">
                <div className="ag-theme-balham" style={{ height: '450px', width: '790px' }}>
                    <AgGridReact
                        modules={AllCommunityModules}
                        columnDefs={gridOptions.columnDefs}
                        rowData={tempData}
                        onGridReady={onGridReady}
                        pagination={true}
                        context={gridOptions.context}
                        defaultColDef={gridOptions.defaultColDef}
                        gridOptions={gridOptions}
                        rowSelection={gridOptions.rowSelection}
                        floatingFilter={true}
                    >
                    </AgGridReact>
                </div>
                <div className={'col-md-3'}><PieChart labels={labels} data={arrChartData()} /></div>
            </div>
        </>
    )
}
const mapStoreToProps = state => ({
    empl_reqs_loading: state.dashboardReducer.getIn(['empl_reqs', 'loading'], true),
    empl_reqs: state.dashboardReducer.getIn(['empl_reqs'], new Map()),

    emplr_reqs_loading: state.dashboardReducer.getIn(['emplr_reqs', 'loading'], true),
    emplr_reqs: state.dashboardReducer.getIn(['emplr_reqs'], new Map()),
})
const mapDispatchToProps = {
    fetchEmployeeReqs, fetchEmployerReqs, fetchAdminReqs
}

export default connect(mapStoreToProps, mapDispatchToProps)(Summary)