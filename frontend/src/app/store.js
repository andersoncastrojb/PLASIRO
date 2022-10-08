import { configureStore } from '@reduxjs/toolkit'
import InfoTutorSliceReducer from '../features/infoTutorIni/infoTutorIniSlice'

export const store = configureStore({
  reducer: {
    InfoTutor: InfoTutorSliceReducer,
  },
})