import { configureStore } from '@reduxjs/toolkit'
import InfoTutorSliceReducer from '../features/infoTutorIni/infoTutorIniSlice'
import DaysTutorSliceReducer from '../features/daysTutor/daysTutorSlice'
import InfoAgendarSliceReducer from '../features/infoAgendar/infoAgendarSlice'

export const store = configureStore({
  reducer: {
    InfoTutor: InfoTutorSliceReducer,
    DaysTutor: DaysTutorSliceReducer,
    InfoAgendar: InfoAgendarSliceReducer,
  },
})