import { createSlice } from '@reduxjs/toolkit'
import { DocType } from '../types'
import { fetchDocs } from './thunks'

interface fetchDataState {
  items: DocType[] | undefined
  isLoading: boolean
  error: any | null
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
  }
})

export default fetchDataSlice.reducer
