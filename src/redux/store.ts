import {configureStore, combineReducers} from '@reduxjs/toolkit'
import DataSlice from './silce'

const store = combineReducers({
  docs: DataSlice
})

const data = configureStore({
  reducer: {store},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export type RootState = ReturnType<typeof data.getState>
export type AppDispatch = typeof data.dispatch
export default data
