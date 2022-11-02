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
        monday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tuesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wednesday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        thursday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        friday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        saturday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sunday: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        comments: [["Pablito","Es un buen compañero"]]
}
  
// Contiene los datos diligenciados en el formulario, con el cual registran su información los tutores
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