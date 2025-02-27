import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from './Main';
import { fetchSyllableDataForDefaultQuiz, fetchKanjiDataForDefaultQuiz, fetchKanjiDataForChooseQuiz } from '../../components/API';
import { fetchNamesDataForSyllables, fetchNamesDataForKanji, fetchSyllableDataForChooseQuiz } from '../../components/API';
import '../../assets/App.css';
import { Context } from '../../App';

export default function Quiz() {
    const [syllableImageData, setSyllableImageData] = useState([]);
    const [kanjiImageData, setKanjiImageData] = useState([]);
    const { dane: selectedValues, setSelectedValues } = useContext(Context);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizType, setQuizType] = useState("");
    const [quizMode, setQuizMode] = useState(null);
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const timeout = (delay) => new Promise((res) => setTimeout(res, delay));    

    const iterateThrough = async (e) => {
        await timeout(e);
        if (quizType === "Kanji") {
            if (quizIndex < kanjiImageData.length - 1) {
                setQuizIndex(prevIndex => prevIndex + 1);  
            } else {
                setIsQuizFinished(true);
            }
        } else if (quizType === "Syllables") {
            if (quizIndex < syllableImageData.length - 1) {
                setQuizIndex(prevIndex => prevIndex + 1);  
            } else {
 
                setIsQuizFinished(true);
            }
        }
    };
    
    useEffect(() => {
        const mode = sessionStorage.getItem("quizMode");
        setQuizMode(mode);
        const storedQuizType = sessionStorage.getItem("quizType");
        const storedValues = JSON.parse(sessionStorage.getItem("selectedValues"));
        setQuizType(storedQuizType);  
        
        const fetchData = async () => {
            setLoading(true);  
            if (storedQuizType === "Kanji") {
                if (quizMode === "default" || quizMode === "RysowanieLvl1" || quizMode === "RysowanieLvl2") {
                    // console.log("kanji default");
                    await Promise.all([
                        fetchKanjiDataForDefaultQuiz(storedValues, setKanjiImageData),
                        fetchNamesDataForKanji(setNames)
                        
                    ]);
                } else if (quizMode === "WybierzJeden"){
                    // console.log("kanji wybierz jeden");
                    await fetchKanjiDataForChooseQuiz(storedValues, setKanjiImageData);
                }
            } else if (storedQuizType === "Syllables") {
                // console.log("sylaby default");
                if (quizMode === "default" || quizMode === "RysowanieLvl1" || quizMode === "RysowanieLvl2") {
                    await Promise.all([
                        fetchSyllableDataForDefaultQuiz(storedValues, setSyllableImageData),
                        fetchNamesDataForSyllables(setNames)
                    ]);
                } else if (quizMode === "WybierzJeden"){
                    // console.log("sylaby wybierz jeden");
                    await fetchSyllableDataForChooseQuiz(storedValues, setSyllableImageData);
                }
            }
            setLoading(false);  
        };

        fetchData(); 
    }, [quizType, selectedValues]);  

    // useEffect(() => {
    //     console.log("Zaktualizowane syllableImageData:", syllableImageData);
    // }, [syllableImageData]);

    const getQuizData = () => {
        const isSyllables = quizType === "Syllables";
        const data = isSyllables
            ? syllableImageData[quizIndex]
            : kanjiImageData[quizIndex] || null;
    
        const name = data
            ? names.find((name) => name.id === data.id)
            : null;
    
        const totalQuestions = isSyllables
            ? syllableImageData.length
            : kanjiImageData.length;
    
        return { currentData: data, matchingName: name, totalQuestions };
    };

    const { currentData, matchingName, totalQuestions } = getQuizData();

    if (loading) {
        return <p>Ładowanie...</p>; 
    }

    return (
        <div className="App">
            <Header />
            <Main 
            currentData={currentData}
            matchingName={matchingName}
            totalQuestions={totalQuestions}
            selectedValues={selectedValues}
            iterateThrough={iterateThrough}
            currentQuestion={quizIndex}
            setSelectedValues={setSelectedValues}
            quizType={quizType}
            quizMode={quizMode}
            isQuizFinished={isQuizFinished}
            />
            <Footer />
        </div>
    );
}
