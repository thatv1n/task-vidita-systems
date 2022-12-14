import React from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchDocs } from '../../redux/thunks'

import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid'

import { DocType, TypeActiveItem } from '../../types'
import TableToolbar from '../tableToolbar/TableToolbar'
import TableFooter from '../tableFooter/TableFooter'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'id',
    hide: true
  },
  {
    field: 'status',
    headerName: 'Статус'
  },
  {
    field: 'sum',
    headerName: 'Сумма'
  },
  {
    field: 'qty',
    headerName: 'Колличество',
    width: 150
  },
  {
    field: 'volume',
    headerName: 'Объем'
  },
  {
    field: 'name',
    headerName: 'Название',
    width: 130
  },
  {
    field: 'delivery_date',
    headerName: 'Дата доставки',
    width: 150
  },
  {
    field: 'total',
    headerName: 'Всего'
  }
]

const DataTable = () => {
  const dispatch = useAppDispatch()
  const [checkedItem, setCheckedItem] = React.useState<TypeActiveItem>({ idDocs: [], checkedDocs: [] })
  const [docs, setDocs] = React.useState<DocType[]>([])
  const dataTable = useAppSelector(state => state.store.docs.items)

  React.useEffect(() => {
    void dispatch(fetchDocs())
  }, [])

  React.useEffect(() => {
    if (dataTable != null) {
      const data = dataTable.map((item) => ({
        ...item,
        total: `${item.qty + item.sum} ${item.currency}`
      }))
      setDocs(data)
    }
  }, [dataTable])

  const handleOnCellClick = (params: any[]) => {
    const checkedDocs: DocType[] = []
    params.map(id => {
      return checkedDocs.push(...docs.filter(item => item.id === id))
    })
    setCheckedItem({ idDocs: [...params], checkedDocs })
  }

  return (
    <div className="wrapper_table">
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={docs}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(data) => handleOnCellClick(data)}
        disableColumnMenu
        components={{
          Toolbar: TableToolbar,
          Footer: () => TableFooter({ checkedItem })
        }}
      />
    </div>
  )
}

export default DataTable
