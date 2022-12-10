import React from 'react';

import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchDocs} from "../../redux/thunks";

import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {DocType} from "../../types";


const columns: GridColDef[] = [
    {field: 'status', headerName: 'status', width: 70},
    {field: 'sum', headerName: 'sum', width: 130},
    {field: 'qty', headerName: 'qty', width: 130},
    {
        field: 'volume',
        headerName: 'volume',
        width: 90,
    },
    {
        field: 'name',
        headerName: 'name',
        width: 160,
    },
    {
        field: 'Total',
        headerName: 'total',
        width: 160,
    },
];


const DataTable = () => {
    const dispatch = useAppDispatch()
    const [docs,setDocs] = React.useState([])
    const dataTable = useAppSelector<any>(state => state.store.docs.items)

    React.useEffect(() => {
        dispatch(fetchDocs())
    }, [])

    React.useEffect(() => {
        const formatDocs = dataTable.map(item=>{
            console.log(item)
        })
        setDocs(dataTable)
    }, [dataTable])




    return (
        <div>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={docs}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
};

export default DataTable;