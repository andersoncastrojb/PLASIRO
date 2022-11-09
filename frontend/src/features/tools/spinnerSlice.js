import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        value: {display: "none"},
}
  
// Contiene los datos diligenciados en el formulario, con el cual registran su información los tutores
export const SpinnerSlice = createSlice({
    name: 'spinner',
    initialState,
    reducers:{
        modifierSpinner: (state,action) =>{
            const data = action.payload;
            state[data[0]] = data[1];
        }
    },
});

export const {modifierSpinner} = SpinnerSlice.actions;
export default SpinnerSlice.reducer;