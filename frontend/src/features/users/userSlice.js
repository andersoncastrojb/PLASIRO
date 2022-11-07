import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        users: [],
        loginUser: {
            id: "",
            name: "",
            email: "",
            permissions: ['student'],
        }
}


export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        modifier: (state,action) =>{
            const data = action.payload;
            state[data[0]] = data[1];
        }
    },
});

export const {modifier} = UserSlice.actions;
export default UserSlice.reducer;