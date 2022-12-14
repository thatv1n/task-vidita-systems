import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
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
    headerName: 'Сумма',
    width: 100
  },
  {
    field: 'qty',
    headerName: 'Колличество',
    width: 120
  },
  {
    field: 'volume',
    headerName: 'Объем',
    width: 100
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
    headerName: 'Всего',
    width: 100
  }
]
