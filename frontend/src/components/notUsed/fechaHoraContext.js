// Contexto para hora y fecha
import React from 'react';
export const DMYHContext = React.createContext(
    {DayC: "NaN",
    MonthC: "NaN",
    YearC: "NaN",
    horaInicio: "NaN",
    horaFinal:"NaN",
    modalFlag: 0,
    DMYHChanger: () => {},
    });