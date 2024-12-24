import { createSlice } from '@reduxjs/toolkit'
const initialState = false
export const Flag_Slice = createSlice({
  name: 'Flag_Slice',
  initialState,
  reducers: {
    UpdateCredentials: (state, action) => {
      return action.payload
    },
    RemoveCredentials: (state) => {
      state = false
    },
  },
})
export const { UpdateCredentials, RemoveCredentials } = Flag_Slice.actions
export default Flag_Slice.reducer
