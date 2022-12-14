import React from 'react'
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

const TableToolbar = () => {
  const search = (searchInput: string) =>
    searchInput
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value !== '')

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
          quickFilterParser={(searchInput) => search(searchInput)}
        />
      </Box>
    </GridToolbarContainer>
  )
}

export default TableToolbar
