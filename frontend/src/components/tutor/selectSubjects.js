import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {useDispatch} from 'react-redux';
import {modifier} from '../../features/infoTutorIni/infoTutorIniSlice';

const animatedComponents = makeAnimated();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];



  const SelectSubjets = () => {

    // Instanciar dispatch
    const dispatch = useDispatch();

    const handledata = (selectedOption) => {
      // Modificar estado en redux
      dispatch(modifier(['masteryOfTopics', selectedOption]));
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