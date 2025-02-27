import React, {useState, useEffect, useContext}from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import {Button, Col} from 'react-bootstrap';
import SyllableTable from './SyllablesComponents/SyllableTable';
import SyllableMenu from './SyllablesComponents/SyllableMenu';
import { Context } from '../../App';
import HelpButton from '../../components/HelpButton';
export default function Main({ imageData, selectedValues, setSelectedValues, showFirstHalf, onButtonClick}) {
    const [showContent, setShowContent] = useState("Główna");
    const [isLvlTwoUnlocked, setIsLvlTwoUnlocked] = useState(false);
    const {colorMode} = useContext(Context);

    const navigate = useNavigate(); 
    const location = useLocation();

    useEffect(() => {
        const progress = JSON.parse(localStorage.getItem('syllableDrawingProgress')) || [];
        const allCompleted = progress.every(status => status === true);
        setIsLvlTwoUnlocked(allCompleted);
      }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const viewFromURL = params.get('view');
        let newView = "Główna";
        if (viewFromURL) {
            newView = viewFromURL;
        } else if (!viewFromURL && location.pathname !== '/Syllables') {

            newView = sessionStorage.getItem('showContent') || "Główna";
        }
        if (newView !== showContent) {
            setShowContent(newView);
            sessionStorage.setItem('showContent', newView);
        }

    }, [location.search, location.pathname, showContent]);

    const storageContentHandler = (view) => {
        setShowContent(view);
        navigate(`?view=${view}`); 
        sessionStorage.setItem('showContent', view); 
    };

    const quizModeSelectionHandler = (view) => {
        sessionStorage.setItem('quizMode', view);
    };
    const resetProgress = () => {
        // Usuń dane z localStorage
        localStorage.removeItem('syllableDrawingProgress');
        // Przywróć domyślną tablicę
        const initialProgress = Array(214).fill(true);
        localStorage.setItem('syllableDrawingProgress', JSON.stringify(initialProgress));
        // Zaktualizuj stan odblokowania przycisku
        setIsLvlTwoUnlocked(false);
        alert('Postęp został zresetowany.');
        window.location.reload();
      };
    if (showContent === "Główna") {
        return (
            <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
                <SyllableMenu
                colorMode={colorMode}
                setShowContent={setShowContent}
                showContent={showContent}
                storageContentHandler={storageContentHandler}
                />
            </div>
        );
    } else {
        return (
            <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
                <SyllableTable
                    imageData={imageData}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    showFirstHalf={showFirstHalf}
                    onButtonClick={onButtonClick}
                    colorMode={colorMode}
                />
                <div className="button-con">
                    <Col>
                        {showContent === "Default" && (
                            <Link to={'/Quiz/default'} style={{ pointerEvents: selectedValues.length === 0 ? 'none' : 'auto' }}>
                                <Button
                                    className="button-style"
                                    variant="dark"
                                    onClick={() => quizModeSelectionHandler("default")}
                                    disabled={selectedValues.length === 0}
                                >
                                    Start
                                </Button>
                            </Link>
                        )}
                        {showContent === "Wybór" && (
                            <Link to={'/Quiz/WybierzJeden'} style={{ pointerEvents: selectedValues.length === 0 ? 'none' : 'auto' }}>
                                <Button
                                    className="button-style"
                                    variant="dark"
                                    onClick={() => quizModeSelectionHandler("WybierzJeden")}
                                    disabled={selectedValues.length === 0}
                                >
                                    Start
                                </Button>
                            </Link>
                        )}
                        {showContent === "Rysowanie" && (
                            <>
                                <Link to={'/Quiz/RysowanieLvl1'}style={{ pointerEvents: selectedValues.length === 0 ? 'none' : 'auto' }}>
                                    <Button
                                        className="button-style"
                                        variant="dark"
                                        onClick={() => quizModeSelectionHandler("RysowanieLvl1")}
                                        disabled={selectedValues.length === 0}
                                    >
                                        Rysowanie poziom 1
                                    </Button>
                                </Link>
                                <Link to={'/Quiz/RysowanieLvl2'} style={{ pointerEvents: selectedValues.length === 0 ? 'none' : 'auto' }}>
                                <Button 
                                    className="button-style" 
                                    variant="dark" 
                                    disabled={!isLvlTwoUnlocked || selectedValues.length === 0}
                                    onClick={() => quizModeSelectionHandler("RysowanieLvl2")}
                                >
                                    Rysowanie poziom 2
                                </Button>
                                </Link>
                                <Button className="button-style" variant="dark" onClick={resetProgress}>Resetuj postęp</Button>
                            </>
                        )}
                    </Col>   
                </div>
                <Button variant="dark" onClick={()=>{storageContentHandler("Główna")}}>Powrót</Button>
                <HelpButton colorMode={colorMode}/>
            </div>
        );
    }
    
 }          
