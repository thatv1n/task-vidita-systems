import React, { ChangeEvent } from 'react'

import {
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarContainer,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'

import { api } from '../../api/api'

import { fetchDocs } from '../../redux/thunks'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { TypeActiveItem } from '../../types'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

interface TProps {
  checkedItem: TypeActiveItem
}

const TableFooter: React.FC<TProps> = ({ checkedItem }) => {
  const dispatch = useAppDispatch()

  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  const dataTable = useAppSelector(state => state.store.docs.items)

  const sumVolume = dataTable?.reduce((a, b) => a + b.volume, 0)
  const sumQty = dataTable?.reduce((a, b) => a + b.qty, 0)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const send = async () => {
    const res = await api.sendDoc(checkedItem.idDocs)
    res.then((data: boolean) => {
      data && dispatch(fetchDocs())
    })
    handleClose()
  }

  const checkedNameDocs = checkedItem.checkedDocs?.map((item, key) =>
    <div key={key}>
      <div>{item.name}</div>
      <span
        style={checkedItem.checkedDocs?.length - 1 === key ? { display: 'none' } : { display: 'block' }}>,</span>
    </div>)

  const pagination = (event: ChangeEvent<any>, value: number) => apiRef.current.setPage(value - 1)

  return (
    <GridToolbarContainer className="wrapper_footer">
      <div className="footer_left_item">
        <div className='footer_table_item'>Общий обьем: {sumVolume}</div>
        <div className='footer_table_item'>Общий количество: {sumQty}</div>
        <Button onClick={handleOpen}>Анулировать</Button>
      </div>
      <Pagination
        color='primary'
        count={pageCount}
        page={page + 1}
        onChange={(event, page) => pagination(event, page)}
      />

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
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'span'}>
            <div className="modal_items_name">
              {checkedNameDocs}
            </div>
          </Typography>
          <div className="modal_group_buttons">
            <Button variant="contained" onClick={send}>Применить</Button>
            <Button variant="outlined" onClick={handleClose}>Отклонить</Button>
          </div>
        </Box>
      </Modal>

    </GridToolbarContainer>
  )
}

export default TableFooter
