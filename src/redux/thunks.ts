import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { DocType } from '../types'

export const fetchDocs = createAsyncThunk('main/docs', async () => {
  const data = await api.fetchDoc()
  return data?.sort((a: DocType, b: DocType) => a.delivery_date > b.delivery_date ? 1 : -1)
})
