import React from 'react'
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

const TableToolbar = () => {
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

export default TableToolbar
