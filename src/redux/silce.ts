import { createSlice } from '@reduxjs/toolkit'
import { DocType } from '../types'
import { fetchDocs } from './thunks'

interface fetchDataState {
  items: DocType[] | undefined
  isLoading: boolean
  error: any
}

const initialState: fetchDataState = {
  items: [],
  isLoading: false,
  error: null
}

const fetchDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDocs.pending, (state) => {
      state.isLoading = true
      state.items = []
    })
    builder.addCase(fetchDocs.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.items = payload
    })
    builder.addCase(fetchDocs.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload
      state.items = []
    })
  }
})

export default fetchDataSlice.reducer
