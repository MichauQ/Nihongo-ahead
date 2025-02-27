import React, { useEffect, useState,useContext} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from './MainKanji';
import '../../assets/App.css';
import { fetchAllDataForKanji,fetchFullKanjiInfo} from '../../components/API';
import { Context } from '../../App';


export default function Kanji() {
  const [imageData, setImageData] = useState([]);
  const [kanjiData, setKanjiData] = useState([]);
  const { dane: selectedValues, setSelectedValues } = useContext(Context);

  useEffect(() => {
    fetchAllDataForKanji(setImageData);
    fetchFullKanjiInfo(setKanjiData);
    sessionStorage.setItem('quizType', "Kanji");
    const savedProgress = JSON.parse(localStorage.getItem('kanjiDrawingProgress'));
    if (!savedProgress) {
      const initialProgress = Array(103).fill(false);
      localStorage.setItem('kanjiDrawingProgress', JSON.stringify(initialProgress));
    }
  },[]);
  useEffect(() => {
    sessionStorage.setItem('selectedValues', JSON.stringify(selectedValues));
    },[selectedValues]);

    return (
    <div className="App">
      <Header/>
      <Main 
      imageData={imageData}
      selectedValues={selectedValues}
      setSelectedValues={setSelectedValues}
      kanjiData={kanjiData}
      />
      <Footer/>
    </div>
    );
  }