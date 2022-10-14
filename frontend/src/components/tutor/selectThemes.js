import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useDispatch} from 'react-redux';
import {modifier} from '../../features/infoTutorIni/infoTutorIniSlice';
import { themesOptions } from './themesOptions';

const animatedComponents = makeAnimated();

  // Seleccionar los temas específicos dominados
  const SelectThemes = () => {

    // Instanciar dispatch
    const dispatch = useDispatch();

    const handledata = (selectedOption) => {
      
      // Convertir datos de formato object a array para enviarlos al método redux
      let data = [];
      for (let aux in selectedOption){
        data.push(selectedOption[aux].value);
      }

      // Modificar estado en redux
      dispatch(modifier(['masteryOfTopics', data]));
    }

    return(
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[themesOptions[0]]}
        isMulti
        options={themesOptions}
        onChange={handledata}
      />
    )};

export default SelectThemes;