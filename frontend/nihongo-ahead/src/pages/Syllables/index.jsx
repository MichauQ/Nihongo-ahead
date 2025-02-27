import React, { useEffect, useState, useContext} from 'react';
import '../../assets/App.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from './Main';
import { fetchImageDataForSyllables,fetchSyllableDataForChooseQuiz} from '../../components/API';
import { Context } from '../../App';


export default function Syllables() {
    
  const [imageData, setImageData] = useState([]);
  const [showFirstHalf, setShowFirstHalf] = useState(true);
  const { dane: selectedValues, setSelectedValues } = useContext(Context);

  useEffect(() => {
    fetchImageDataForSyllables(setImageData);
    sessionStorage.setItem('quizType', 'Syllables');
    setSelectedValues([]);
    const savedProgress = JSON.parse(localStorage.getItem('syllableDrawingProgress'));
    if (!savedProgress) {
      const initialProgress = Array(214).fill(false);
      localStorage.setItem('syllableDrawingProgress', JSON.stringify(initialProgress));
    }
    
  },[]);

  const handleButtonClick = () => {
    setShowFirstHalf(!showFirstHalf);
  };
  useEffect(() => {
    sessionStorage.setItem('selectedValues', JSON.stringify(selectedValues));
    },[selectedValues]);

  return (
  <div className="App">
    <Header/>
    <Main 
    imageData={imageData}
    showFirstHalf={showFirstHalf}
    onButtonClick={handleButtonClick}
    selectedValues={selectedValues} 
    setSelectedValues={setSelectedValues}
    />
    <Footer/>
  </div>
  );
}