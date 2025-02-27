import React, { useState, useMemo } from "react";
import { Button, Col } from "react-bootstrap";
import Checkboxes from '../../../components/Checkboxes';
export default function SyllableTable({imageData, selectedValues, setSelectedValues,showFirstHalf,onButtonClick, colorMode}){
    const [offset, setOffset] = useState(0);
    const [checkboxData, setCheckboxData] = useState(Array(56).fill(false));

    const handleButtonClick = () => {
        setOffset((prevOffset) => (prevOffset === 0 ? 28 : 0));
        onButtonClick();
    };


    const filteredData = useMemo(() => { 
        return showFirstHalf ? imageData.slice(0, 107): imageData.slice(107);
    }, [imageData, showFirstHalf]);
    
  const currentValues = Array.from({ length: 28 }, (_, i) => i + offset); // Zakres checkboxów

  // Funkcja obsługująca zaznaczenie wszystkich checkboxów ( docelowo będzie się znajdowała w komponencie checkboxy)
  const handleSelectAll = () => {
    const allSelected = currentValues.every(value => selectedValues.includes(value + 1));  // Sprawdza, czy wszystkie checkboxy dla danego offsetu są zaznaczone
    const newCheckboxData = checkboxData.map((checked, idx) =>
      idx >= offset && idx < offset + 28 ? !allSelected : checked
    );

    setCheckboxData(newCheckboxData);

    if (allSelected) {
        // Odznacza wszystkie checkboxy dla bieżącego offsetu
        setSelectedValues(selectedValues.filter(value => !currentValues.includes(value - 1)));
      } else {
        // Zaznacza wszystkie checkboxy dla bieżącego offsetu
        const newSelectedValues = [...selectedValues, ...currentValues.map(value => value + 1)];
        setSelectedValues([...new Set(newSelectedValues)]);  // Usuwa duplikaty
      }
    };

    return (
        <div className="choose-image-body">
            <Col className='grid-checkbox-column'>
            <div className="grid-container">
                {filteredData.map((item, index) => (
                    <Col key={index} className={`image-box image-box${index}`}>
                        <Col key={`image-${index}`}>
                            <img
                                className={`image ${colorMode?"lightShadow":"darkShadow" } image${index}`}
                                src={`data:image/png;base64,${item.imageUrl}`}
                                alt={`Japanese character ${index}`}
                            />
                        </Col>
                        <Col key={`name-${index}`} className="image-name">
                            {item.imageName}
                        </Col>
                    </Col>
                 ))}   
        </div>
        <Checkboxes offset={offset} 
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
            checkboxData={checkboxData}
            setCheckboxData={setCheckboxData} /> 
        </Col>
        <div className="button-con">
            <Col>
                <Button className='button-style' variant='dark' onClick={handleSelectAll}>
                    {currentValues.every(value => selectedValues.includes(value + 1)) ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}
                </Button>
                <Button className='button-style' variant={showFirstHalf ? 'dark' : 'light'}  onClick={handleButtonClick}>
                    Pokaż {showFirstHalf ? 'katakane' : 'hiragane'} 
                </Button>
            </Col>
        </div>
    </div>)
}