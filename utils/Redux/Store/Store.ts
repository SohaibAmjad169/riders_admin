import { configureStore } from '@reduxjs/toolkit'
import { StudentSlice } from '../Slice/StatusSlice'
import { formSlice } from '../Slice/FormSlice'
import { ViewSlice } from '../Slice/ViewSlice'
import { UserSlice } from '../Slice/UserSlice'
import { Flag_Slice } from '../Slice/Flag_Slice/Flag_Slice'
const Store = configureStore({
  reducer: {
    Status: StudentSlice.reducer,
    FormSlice: formSlice.reducer,
    View: ViewSlice.reducer,
    User: UserSlice.reducer,
    Flag: Flag_Slice.reducer,
  },
})
export default Store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {some: SomeStateType}
export type AppDispatch = typeof Store.dispatch
