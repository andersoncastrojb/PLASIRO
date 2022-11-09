import { configureStore } from '@reduxjs/toolkit'
import InfoTutorSliceReducer from '../features/infoTutorIni/infoTutorIniSlice'
import DaysTutorSliceReducer from '../features/daysTutor/daysTutorSlice'
import InfoAgendarSliceReducer from '../features/infoAgendar/infoAgendarSlice'
import AdminSliceReducer from '../features/admin/adminSlice'
import UserSliceReducer from '../features/users/userSlice'
import spinnerSliceReducer from '../features/tools/spinnerSlice'

export const store = configureStore({
  reducer: {
    InfoTutor: InfoTutorSliceReducer,
    DaysTutor: DaysTutorSliceReducer,
    InfoAgendar: InfoAgendarSliceReducer,
    Admin: AdminSliceReducer,
    Users: UserSliceReducer,
    Spinner: spinnerSliceReducer
  },
})