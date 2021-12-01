import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { AgGridReact } from '@ag-grid-community/react'
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css'
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css'
import { Map, List } from 'immutable'
import { history } from '../../modules/helpers'
import Modal from '../../components/modal'
import Confirmation from '../../components/confirmation'
import PieChart from "../chart";
import { fetchAllUsers } from '../../redux/action/dashboardAction'

function Users(props) {
    const [gridApi, setGridApi] = useState(null)
    const [rowData, setRowData] = useState(null)
    const [status, setStatus] = useState({
        employee: 0,
        employer: 0,
        admin: 0,
        inActive: 0
    })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalDeleteFlg, setModalDeleteFlg] = useState(false)
    let gridOptions = {
        modules: AllCommunityModules,
        columnDefs: [
            /*   { headerName: 'User ID', field: '_id', width: 150, filter: false }, */
            { headerName: "First Name", field: "firstName", width: 120 },
            { headerName: "Last Name", field: "lastName", width: 100, filter: false },
            { headerName: "Email Id", field: "emailId", width: 150 },
            { headerName: "Phone No", field: "phNo", width: 100 },
            { headerName: "Active", field: "active", width: 100 },
            { headerName: "Created Date", field: "createDate", width: 120 },
            { headerName: "User Type", field: "userType", width: 100 },
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
        props.fetchAllUsers()
    }, [])

    useEffect(() => {
        if (!props.all_users_loading) {
            if (!props.all_users.toJS().error) {
                console.log(props.all_users.toJS())
                setRowData(props.all_users.toJS()['data'])
                let obj = calChartSummary(props.all_users.toJS()['data'])
                console.log("hehe", obj)
                setStatus((prevState) => {
                    for (let key in obj) {
                        prevState[key] = obj[key]
                    }
                    return ({ ...prevState })
                })
            }
        }
    }, [props.all_users_loading])


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
        let a = 0, b = 0, c = 0, d = 0;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].status)
            if (data[i].userType === 'employee') { a++; }
            else if (data[i].userType === 'employer') b++;
            else if (data[i].userType === 'admin') c++;
            else if (data[i].active === false) d++;
        }
        return {
            employee: a,
            employer: b,
            admin: c,
            inActive: d
        }
    }

    let labels = ['# of Employee ', '# of Employer', '# of Admin', '# of In-Active']

    const arrChartData = () => {
        let arr = []
        for (let key in status) {
            arr.push(status[key])
        }

        return arr
    }

    return (
        <>
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
                <div className={'col-md-3'}><PieChart labels={labels} data={arrChartData()} /></div>
            </div>
        </>
    )
}
const mapStoreToProps = state => ({
    all_users_loading: state.dashboardReducer.getIn(['all_users', 'loading'], true),
    all_users: state.dashboardReducer.getIn(['all_users'], new Map()),
})
const mapDispatchToProps = {
    fetchAllUsers
}

export default connect(mapStoreToProps, mapDispatchToProps)(Users)