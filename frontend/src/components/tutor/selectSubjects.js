import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];



  const SelectSubjets = () => {

    const handledata = (selectedOption) => {
      console.log(selectedOption);
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