import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        name: "",
        mail: "",
        punctuation: "4.5",
        modeV: 'off',
        modeP: 'off',
        price: "",
        subjects: {},
        description: "",
        masteryOfTopics: {},
        titles: ["Monitor certificado"],
        monday: [1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1],
        tuesday: [1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1],
        wednesday: [1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1],
        thursday: [1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1],
        friday: [1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1],
        saturday: [1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1],
        sunday: [1,1,1,1,1,1,1,1,
            1,1,1,1,1,1,1,1],
        comments: [["Pablito","Es un buen compañero"]]
}
  

export const InfoTutorSlice = createSlice({
    name: 'tutorIni',
    initialState,
    reducers:{
        modifier: (state,action) =>{
            const data = action.payload;
            state[data[0]] = data[1];
        }
    },
});

export const {modifier} = InfoTutorSlice.actions;
export default InfoTutorSlice.reducer;