import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useDispatch} from 'react-redux';
import {modifier} from '../../features/infoTutorIni/infoTutorIniSlice';

const animatedComponents = makeAnimated();

const options = [
    { value: 'Matemáticas', label: 'Matemáticas' },
    { value: 'Física', label: 'Física' },
    { value: 'Inglés', label: 'Inglés' },
    { value: 'Biología', label: 'Biología' },
    { value: 'Castellano', label: 'Castellano' },
    { value: 'Ingeniería', label: 'Ingeniería' },
    { value: 'Humanidades', label: 'Humanidades' },
    { value: 'Derecho', label: 'Derecho' },
    { value: 'Contaduría', label: 'Contaduría' },
    { value: 'Programación', label: 'Programación' }
];

  
  // Seleccionar las áreas de conocimiento dominadas
  const SelectSubjets = () => {

    // Instanciar dispatch
    const dispatch = useDispatch();

    const handledata = (selectedOption) => {
      
      // Convertir datos de formato object a array para enviarlos al método redux
      let data = [];
      for (let aux in selectedOption){
        data.push(selectedOption[aux].value);
      }

      // Modificar estado en redux
      dispatch(modifier(['subjects', data]));
    }
  
    return(
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={[options[0]]}
        isMulti
        options={options}
        onChange={handledata}
      />
    );
  };

export default SelectSubjets;