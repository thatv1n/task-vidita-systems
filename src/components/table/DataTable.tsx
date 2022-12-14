import React from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchDocs } from '../../redux/thunks'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import {
  DataGrid, GridColDef, GridToolbarQuickFilter,
  GridToolbarContainer,
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
  ruRU
} from '@mui/x-data-grid'
import Pagination from '@mui/material/Pagination'

import { DocType } from '../../types'
import { api } from '../../api/api'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

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
  const [finalClickInfo, setFinalClickInfo] = React.useState<DocType[]>([])
  const [idDocs, setIdDocs] = React.useState<string[]>([])
  const [docs, setDocs] = React.useState<DocType[]>([])
  const dataTable = useAppSelector(state => state.store.docs.items)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  React.useEffect(() => {
    void dispatch(fetchDocs())
  }, [])

  React.useEffect(() => {
    if (dataTable != null) {
      const data: DocType[] = JSON.parse(JSON.stringify(dataTable))?.sort((a: DocType, b: DocType) => a.delivery_date > b.delivery_date ? 1 : -1)
      for (let i = 0; i < data?.length; i++) {
        data[i].total = `${data[i].qty + data[i].sum} ${data[i].currency}`
      }
      Object.preventExtensions(data)
      setDocs(data)
    }
  }, [dataTable])

  const handleOnCellClick = (params: any[]) => {
    const obj: any = []
    params.map(id => {
      return obj.push(...docs.filter(item => item.id === id))
    })
    setFinalClickInfo(obj)
    setIdDocs(params)
  }

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <Box
          sx={{
            p: 0.5,
            pb: 0,
            mb: '10px',
            ml: '10px'
          }}
        >
          <GridToolbarQuickFilter
            quickFilterParser={(searchInput) =>
              searchInput
                .split(',')
                .map((value) => value.trim())
                .filter((value) => value !== '')
            }
          />
        </Box>
        <div style={{ marginLeft: '25%', marginTop: '50px' }}></div>
      </GridToolbarContainer>
    )
  }

  const CustomFooter = () => {
    const apiRef = useGridApiContext()
    const page = useGridSelector(apiRef, gridPageSelector)
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)
    const sumVolume = docs?.reduce((a, b) => a + b.volume, 0)
    const sumQty = docs?.reduce((a, b) => a + b.qty, 0)
    return (
      <GridToolbarContainer>
        <Box
          sx={{
            p: 0.5,
            pb: 0,
            mb: '10px',
            ml: '10px'
          }}
        >

        </Box>
        <div style={{ marginRight: '20px' }}>Общий обьем: {sumVolume}</div>
        <div style={{ marginRight: '20px' }}>Общий количество: {sumQty}</div>
        <Button onClick={handleOpen}>Анулировать</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Вы уверены что хотите аннулировать товар(ы):
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'} >
              <div className="modal_items_name">
                {finalClickInfo?.map((item, key) =>
                  <div key={key}>
                    <div>{item.name}</div>
                    <span
                      style={finalClickInfo?.length - 1 === key ? { display: 'none' } : { display: 'block' }}>,</span>
                  </div>)}
              </div>
            </Typography>
            <div className="modal_group_buttons">
              <Button variant="contained" onClick={send}>Применить</Button>
              <Button variant="outlined" onClick={handleClose}>Отклонить</Button>
            </div>
          </Box>
        </Modal>
        <Pagination
          color='primary'
          count={pageCount}
          page={page + 1}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
      </GridToolbarContainer>
    )
  }

  const send = async () => {
    const res = await api.sendDoc(idDocs)
    res.then((data: boolean) => {
      data && dispatch(fetchDocs())
    })
    handleClose()
  }

  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={docs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={handleOnCellClick}
          disableColumnMenu
          components={{
            Toolbar: CustomToolbar,
            Footer: CustomFooter
          }}
        />
      </div>
    </div>
  )
}

export default DataTable
