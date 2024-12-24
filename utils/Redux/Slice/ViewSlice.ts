import { createSlice } from '@reduxjs/toolkit'
const initialState = 'card'
export const ViewSlice = createSlice({
  name: 'View_Slice',
  initialState,
  reducers: {
    SetMode: (state, action) => {
      return action.payload
    },
  },
})
export const { SetMode } = ViewSlice.actions
