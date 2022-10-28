import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    day: "",
    month: "",
    year: "",
    hours: [],
    modalFlag: 0
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