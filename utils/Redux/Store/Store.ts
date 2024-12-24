import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Slice/UserSlice'

const Store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})
export default Store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {some: SomeStateType}
export type AppDispatch = typeof Store.dispatch
