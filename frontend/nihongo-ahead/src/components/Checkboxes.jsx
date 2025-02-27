import React, { useState, useEffect } from 'react';
import {Col} from 'react-bootstrap';

export default function Checkboxes ({offset, checkboxData, setCheckboxData, selectedValues, setSelectedValues}){ 
  //const [checkboxData, setCheckboxData, ] = useState(Array(56).fill(false));

  useEffect(() => {
    if(selectedValues.length > 0){
      console.log(selectedValues);
    }
  }, [selectedValues]);

  const handleCheckboxChange = (index, event) => {
    const newCheckboxData = [...checkboxData];
    newCheckboxData[index + offset] = !newCheckboxData[index + offset];
    setCheckboxData(newCheckboxData);
    //const selectedValue = event.target.value;
    const selectedValue = parseInt(event.target.value, 10);

    if (event.target.checked) {
      setSelectedValues([...selectedValues, selectedValue]);
    } else {
      setSelectedValues(selectedValues.filter(item => item !== selectedValue));
    }
  };

  const currentValues = Array.from({ length: 28 }, (_, i) => i + offset);
 
  return (
    <Col className="checkbox-container">
      {currentValues.map((value, index) => (
        <Col className={`checkboxes-con checkbox${index}`} key={index}>
          <input
            className="checkboxes"
            type="checkbox"
            id={`checkbox${value + 1}`}
            value={value + 1}
            checked={checkboxData[value]}
            onChange={(e) => handleCheckboxChange(index,e)}
          />
        </Col>
      ))}
    </Col>
  );
} 
