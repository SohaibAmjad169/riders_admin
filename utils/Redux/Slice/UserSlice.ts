import { FormData } from '@/utils/Main_Form_Interface'
import { createSlice } from '@reduxjs/toolkit'
const initialState = { Name: '', Email: '' }
export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    SetUser: (state, action) => {
      ;(state.Email = action.payload.Email), (state.Name = action.payload.Name)
    },
    RemoveUser: (state) => {
      state.Email = ''
      state.Name = ''
    },
  },
})
export const { SetUser, RemoveUser } = UserSlice.actions
