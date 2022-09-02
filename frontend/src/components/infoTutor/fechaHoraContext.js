// Contexto para hora y fecha
import React from 'react';
export const DMYHContext = React.createContext(
    {DayC: "NaN", MonthC: "NaN", YearC: "NaN", HoraC: "NaN", DMYHChanger: () => {},}
    );