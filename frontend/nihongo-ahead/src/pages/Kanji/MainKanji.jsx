import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Container, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import QuizTypes from './KanjiComponents/QuizTypes';
import OneOptionQuiz from '../../components/OneOptionQuiz';
import KanjiList from './KanjiComponents/KanjiList';
import KanjiQuizSettings from './KanjiComponents/KanjiQuizSettings';
import DrawingLevels from './KanjiComponents/DrawingLevels';
import { Context } from '../../App';
import HelpButton from '../../components/HelpButton';
export default function Main({ imageData, selectedValues, setSelectedValues,kanjiData }) {
    const [showContent, setShowContent] = useState("Główna");
    const [modalShow, setModalShow] = useState(false);
    const [buttonType, setButtonType] = useState(sessionStorage.getItem('buttonType') || '');
    const [isLvlTwoUnlocked, setIsLvlTwoUnlocked] = useState(false);
    const {colorMode} = useContext(Context);

    useEffect(() => {
        const progress = JSON.parse(localStorage.getItem('kanjiDrawingProgress')) || [];
        const allCompleted = progress.every(status => status === true);
        setIsLvlTwoUnlocked(allCompleted);
    }, []);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const viewFromURL = params.get('view');
        let newView = "Główna";
        if (viewFromURL) {
            newView = viewFromURL;
        } else if (!viewFromURL && location.pathname !== '/Kanji') {

            newView = sessionStorage.getItem('showContent') || "Główna";
        }
        if (newView !== showContent) {
            setShowContent(newView);
            sessionStorage.setItem('showContent', newView);
        }
    }, [location.search, location.pathname, showContent]);
    
    const storageContentHandler = (view) => {
        setShowContent(view);
    
        if (view === "Główna") {
            navigate('/Kanji'); // Ustawienie samej ścieżki
        } else {
            navigate(`?view=${view}`); // Dodanie parametru tylko dla innych widoków
        }
        
        sessionStorage.setItem('showContent', view);
    };

    const quizModeSelectionHandler = (view) => {
        sessionStorage.setItem('quizMode', view);
    };
    
    const resetProgress = () => {
        
        localStorage.removeItem('kanjiDrawingProgress');
        
        const initialProgress = Array(103).fill(false);
        localStorage.setItem('kanjiDrawingProgress', JSON.stringify(initialProgress));
        
        setIsLvlTwoUnlocked(false);
        alert('Postęp został zresetowany.');
        window.location.reload();
      };

    const buttonSwap = (e) => {
        setButtonType(e);
    };

    useEffect(() => {
        sessionStorage.setItem('buttonType', buttonType);
    }, [buttonType]);
    if (showContent === "Główna") {
        return (
            <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
                <Container>
                    <div className='kanji-page'>
                    <Card className="bg-light text-white my-5 n5card" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="src/assets/Images/n5.png" className={colorMode?"lightShadow":"darkShadow" }/>
                        <Card.ImgOverlay className={colorMode? "overlay kanjiCardOverlay-light" :"overlay kanjiCardOverlay-dark"}>
                            <div className="content">
                                <Card.Title>Kanji poziom N5</Card.Title>
                                <Card.Text>
                                    Nie ma jasno sprecyzowanej ilości kanji, która jest wymagana na egzamin, jednak na podstawie
                                    poprzednich edycji egzaminu można spożądzić listę znaków z największą szansą na pojawienie się.
                                    Ta lista zawiera 103 podstawowe znaki.
                                </Card.Text>
                                <Col>
                                    <Button className="mx-2" variant="light" onClick={() => storageContentHandler("Quizy")}>Quizy</Button>
                                    <Button className="mx-2" variant="light" onClick={() => storageContentHandler("Lista")}>Lista</Button>
                                </Col>
                            </div>
                        </Card.ImgOverlay>
                    </Card>
                    </div>
                </Container>
                <HelpButton/>
            </div>
        );
    } else if (showContent === "Lista") {
        return (
            <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
                <KanjiList
                    storageContentHandler={storageContentHandler}
                    setModalShow={setModalShow}
                    modalShow={modalShow}
                    imageData={imageData}
                    colorMode={colorMode}
                    kanjiData={kanjiData}
                />
            </div>
        );
    } else if (showContent === "Quizy") {
        return (
            <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
                <QuizTypes
                    storageContentHandler={storageContentHandler}
                    buttonSwap={buttonSwap}
                    quizModeSelectionHandler={quizModeSelectionHandler}
                    colorMode={colorMode}
                />
            </div>
        );
    } else if (showContent === "WybierzJeden") {
            return (
                <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
                    <OneOptionQuiz selectedValues={selectedValues} />
                    <Button variant="light" onClick={() => storageContentHandler("Quizy")}>Powrót</Button>
                </div>
            );
    } else if (showContent === "DrawingLevels") {
        return (
            <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
                <DrawingLevels
                    storageContentHandler={storageContentHandler}
                    buttonSwap={buttonSwap}
                    quizModeSelectionHandler={quizModeSelectionHandler} 
                    isLvlTwoUnlocked={isLvlTwoUnlocked}
                    colorMode={colorMode}
                />
                <Button variant={colorMode?"dark":"light"} onClick={() => storageContentHandler("Quizy")}>Powrót</Button>
                <Button className="button-style" variant={colorMode?"dark":"light"} onClick={resetProgress}>Resetuj postęp</Button>
            </div>
        );
    } else if (showContent === "Ustawienia") {
        return (
            <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
                <KanjiQuizSettings
                    storageContentHandler={storageContentHandler}
                    buttonType={buttonType}
                    setSelectedValues={setSelectedValues}
                    buttonSwap={buttonSwap}
                    colorMode={colorMode}
                    imageData={imageData}
                />
            </div>
        );
    }
}
