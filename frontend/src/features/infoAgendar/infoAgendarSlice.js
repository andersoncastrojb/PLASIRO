import { createSlice } from '@reduxjs/toolkit';

const dataIni = new Date();

const initialState = {
    day: dataIni.getDate().toString(),
    month: dataIni.getMonth().toString(),
    year: dataIni.getFullYear().toString(),
    hours: [],
    modalFlagDate: {display: "block"},
    modalFlagForm: {display: "none"},
    hourSelect: [],
    name: "",
    phone: "",
    email: "",
    mode: "",
    description: "",
    conditions: "off"
}
  

export const InfoAgendarSlice = createSlice({
    name: 'infoAgendar',
    initialState,
    reducers:{
        modifier: (state,action) =>{
            const data = action.payload;
            state[data[0]] = data[1];
        }
    },
});

export const {modifier} = InfoAgendarSlice.actions;
export default InfoAgendarSlice.reducer;