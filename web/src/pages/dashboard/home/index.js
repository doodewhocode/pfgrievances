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


function Summary(props) {
    const [gridApi, setGridApi] = useState(null)
    const [rowData, setRowData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalDeleteFlg, setModalDeleteFlg] = useState(false)
    let userId = null, employerName = null, userType = null
    let gridOptions = {
        modules: AllCommunityModules,
        columnDefs: [
            {
                headerName: 'Query ID', field: '_id', width: 150, filter: false, cellRenderer: (params) => {
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
            { headerName: "Query Name", field: "grivType", width: 120 },
            { headerName: "Note", field: "note", width: 100, filter: false },
            { headerName: "Created Date", field: "createDate", width: 75 },
            { headerName: "Status", field: "status", width: 75 },
            { headerName: "End Date", field: "endDate", width: 100 },
            { headerName: "Payment", field: "paymentStatus", width: 70 },
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
            props.fetchEmployeeReqs(userId)
        }
        loadFirst()
    }, [])

    useEffect(() => {
        if (!props.empl_reqs_loading) {
            if (!props.empl_reqs.toJS().error) {
                console.log(props.empl_reqs.toJS())
                setRowData(props.empl_reqs.toJS()['data'])
            }
        }
    }, [props.empl_reqs_loading])

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
                                        <h1><b>7</b></h1>
                                    </div>
                                    <hr style={{ borderColor: '#FFFFFF' }} />
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
                                            style={{ color: '#FFFFFF', fontSize: '40px' }}></i>
                                        <h1><b>3</b></h1>
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
                                        <h1><b>14</b></h1>
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
            <div class="row pt-5">
                <div className="ag-theme-balham" style={{ height: '450px', width: '790px' }}>
                    <AgGridReact
                        modules={AllCommunityModules}
                        columnDefs={gridOptions.columnDefs}
                        rowData={rowData}
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
            </div>

        </>
    )
}
const mapStoreToProps = state => ({
    empl_reqs_loading: state.dashboardReducer.getIn(['empl_reqs', 'loading'], true),
    empl_reqs: state.dashboardReducer.getIn(['empl_reqs'], new Map()),
})
const mapDispatchToProps = {
    fetchEmployeeReqs, fetchEmployerReqs, fetchAdminReqs
}

export default connect(mapStoreToProps, mapDispatchToProps)(Summary)