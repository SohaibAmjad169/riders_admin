import { createSlice } from '@reduxjs/toolkit'
const initialState = 'All'
export const StudentSlice = createSlice({
  name: 'Student_Slice',
  initialState,
  reducers: {
    SetStatus: (state, action) => {
      return action.payload
    },
  },
})
export const { SetStatus } = StudentSlice.actions
