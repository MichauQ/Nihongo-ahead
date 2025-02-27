import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';

const minRange = 0;
const minDistance = 10;
const step = 10;

export default function MultiRangeSlider({maxRange,colorMode}) {
  const [values, setValues] = useState(() => {
    const savedValues = sessionStorage.getItem('selectedValues');
    
    if (savedValues) {
      try {
        const parsedValues = JSON.parse(savedValues);
        if (Array.isArray(parsedValues) && parsedValues.length > 0) {
          return parsedValues; 
        }
      } catch (error) {
        console.error("Błąd podczas parsowania danych z sessionStorage", error);
      }
    }
  
    return [0, 10];  // Zwracamy domyślne wartości, jeśli nie ma danych lub tablica jest pusta
  });
  
  // const [values, setValues] = useState(sessionStorage.getItem(JSON.parse(selectedValues))||[0,10]);
  const [inputValues, setInputValues] = useState([...values]);

  const adjustValueToStep = (value) => {
    if (value === maxRange) return maxRange;
    return Math.round(value / step) * step;
  };

  const handleInputChange = (index, event) => {
    const value = event.target.value;
    setInputValues(prev => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleInputBlur = (index) => {
    let numberValue = parseInt(inputValues[index], 10);

    if (isNaN(numberValue)) {
      numberValue = index === 0 ? minRange : Math.max(values[1] + minDistance, minRange);
    } else if (index === 0) {
      numberValue = Math.max(minRange, Math.min(maxRange, numberValue));
      if (values[1] - numberValue < minDistance) {
        numberValue = values[1] - minDistance;
      }
    } else {
      numberValue = Math.max(minRange, Math.min(maxRange, numberValue));
      if (numberValue - values[0] < minDistance) {
        numberValue = values[0] + minDistance;
      }
    }

    const adjustedValue = adjustValueToStep(numberValue);
    const updatedValues = [...values];
    updatedValues[index] = adjustedValue;

    if (index === 0) {
      updatedValues[1] = Math.max(updatedValues[0] + minDistance, updatedValues[1]);
    } else {
      updatedValues[0] = Math.min(updatedValues[1] - minDistance, updatedValues[0]);
    }

    setValues(updatedValues);
    setInputValues(updatedValues);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? step : -step;
    const updatedValues = [...values];

    const rect = event.currentTarget.getBoundingClientRect();
    const cursorPosition = event.clientX - rect.left;
    const sliderWidth = rect.width;

    if (cursorPosition < sliderWidth / 2) {
      updatedValues[0] = Math.max(minRange, adjustValueToStep(updatedValues[0] + delta));
      if (updatedValues[1] - updatedValues[0] < minDistance) {
        updatedValues[0] = updatedValues[1] - minDistance;
      }
    } else {
      updatedValues[1] = Math.min(maxRange, adjustValueToStep(updatedValues[1] + delta));
      if (updatedValues[1] - updatedValues[0] < minDistance) {
        updatedValues[1] = updatedValues[0] + minDistance;
      }
    }

    setValues(updatedValues);
    setInputValues(updatedValues);
  };

  useEffect(() => {
    sessionStorage.setItem('selectedValues', JSON.stringify(values));
    const container = document.querySelector('.slider-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [ ,values]);

  useEffect(() => {
    setInputValues(values);
  }, [values]);

  return (
    <div className='slider-container'>
      <div className='inputs-container'>
        <input
          className={`slider-input ${colorMode? "slider-input-light" :"slider-input-dark"}`}
          type="number"
          value={inputValues[0]}
          onChange={(e) => handleInputChange(0, e)}
          onBlur={() => handleInputBlur(0)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleInputBlur(0);
            }
          }}
        />
        <span className={`span ${colorMode? "span-light" :"span-dark"}`}>-</span>
        <input
          className={`slider-input ${colorMode? "slider-input-light" :"slider-input-dark"}`}
          type="number"
          value={inputValues[1]}
          onChange={(e) => handleInputChange(1, e)}
          onBlur={() => handleInputBlur(1)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleInputBlur(1);
            }
          }}
        />
      </div>
      <ReactSlider
        className={`slider-class ${colorMode? "slider-class-light" :"slider-class-dark"}`}
        thumbClassName={`slider-thumb ${colorMode? "slider-thumb-light" :"slider-thumb-dark"}`}
        trackClassName={`slider-track ${colorMode? "slider-track-light" :"slider-track-dark"}`}
        thumbActiveClassName={colorMode? "active-thumb-light" :"active-thumb-dark"}
        min={minRange}
        max={maxRange}
        value={values}
        onChange={(newValues) => {
          const adjustedValues = newValues.map(adjustValueToStep);
          setValues(adjustedValues);
          setInputValues(adjustedValues);
        }}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        minDistance={minDistance}
        renderThumb={(props, state) => {
          const { key, ...restProps } = props;
          return (
            <div key={key} {...restProps}>
              <div className={`slider-tooltip ${colorMode? "slider-tooltip-light" :"slider-tooltip-dark"}`}>{adjustValueToStep(state.valueNow)}</div>
            </div>
          );
        }}
      />
    </div>
  );
}

