import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        cites: []
}


export const AdminSlice = createSlice({
    name: 'cites',
    initialState,
    reducers:{
        modifier: (state,action) =>{
            const data = action.payload;
            state[data[0]] = data[1];
        }
    },
});

export const {modifier} = AdminSlice.actions;
export default AdminSlice.reducer;