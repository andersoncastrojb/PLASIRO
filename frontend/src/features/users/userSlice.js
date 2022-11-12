import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        users: [],
        loginUser: {
            id: "",
            name: "",
            email: "",
            permissions: ['student'],
        },
        newUser:{
            name: "",
            email: "",
            phone: "",
            rol: "Estudiante",
            location: "",
            age: "",
            tipeId: "Tarjeta de identidad",
            numberId: ""
        },
        validadorFormNewUser:{
            flag: false,
            name: [false,""],
            phone: [false,""],
            location: [false,""],
            age: [false, ""],
            numberId: [false, ""]
        }
}


export const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        modifier: (state,action) =>{
            const data = action.payload;
            state[data[0]] = data[1];
        },
        modifierNewUser: (state,action) =>{
            const data = action.payload;
            state.newUser[data[0]] = data[1];
        }
    },
});

export const {modifier, modifierNewUser} = UserSlice.actions;
export default UserSlice.reducer;