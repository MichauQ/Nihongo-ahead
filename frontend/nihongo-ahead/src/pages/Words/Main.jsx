import React, { useState, useEffect, useContext,useRef} from "react";
import Flashcards from "./WordsComponents/Flashcards";
import WordList from "./WordsComponents/WordList";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Container} from "react-bootstrap";
import { Context } from "../../App";
import MultiRangeSlider from "../../components/MultiRangeSlider";
import HelpButton from "../../components/HelpButton";
import { fetchWordsDataForCards } from "../../components/API";

export default function Main({ wordsData }) {
  const [showContent, setShowContent] = useState("Główna");
  const maxRange = useRef(660);
  const [cardInfo, setCardInfo] = useState([]);
  const { colorMode, setSelectedValues } = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get('view') || "Główna";
    setShowContent(view);
  }, [location.search]);

  const storageContentHandler = async (view) => {
    setShowContent(view);
  
    if (view === "Główna") {
      // Resetowanie adresu URL do podstawowego bez parametrów
      navigate('/Words');
    } else {
      // Dodanie parametru do URL-a
      navigate(`?view=${view}`);
    }
  
    sessionStorage.setItem('showContent', view);
  
    if (view === "Fiszki") {
      const storedValues = JSON.parse(sessionStorage.getItem('selectedValues')) || [];
      setSelectedValues(storedValues);
  
      if (storedValues.length > 0) {
        await fetchWordsDataForCards(storedValues, setCardInfo);
      } else {
        console.error("Cannot fetch data for 'Fiszki': storedValues is empty or undefined.");
      }
    }
  };

  if (showContent === "Główna") {
    return (
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}
      >
        <div className="slider">
          <MultiRangeSlider maxRange={maxRange.current} colorMode={colorMode} />
        </div>
        <Container style={{ flex: "1" }}>
          <Button
            className="flashcard-button"
            variant={colorMode ? "dark" : "light"}
            onClick={() => storageContentHandler("Fiszki")}
          >
            Start
          </Button>
          <Button
            className="flashcard-button"
            variant={colorMode ? "dark" : "light"}
            onClick={() => storageContentHandler("Lista")}
          >
            Lista
          </Button>
        </Container>
        <div>
          <HelpButton />
        </div>
      </div>
    );
  } else if (showContent === "Fiszki") {
    return (
      <div
        className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}
      >
        <Flashcards cardInfo={cardInfo} colorMode={colorMode} />
        <div style={{ height: "300px" }}>
          <Button
            variant={colorMode ? "dark" : "light"}
            className="m-5"
            onClick={() => storageContentHandler("Główna")}
          >
            Powrót
          </Button>
        </div>
        <HelpButton />
      </div>
    );
  } else if (showContent === "Lista") {
    return (
      <div
        className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}
      >
        <WordList wordsData={wordsData} storageContentHandler={storageContentHandler} colorMode={colorMode} />
        <Button
          variant={colorMode ? "dark" : "light"}
          className="m-4"
          onClick={() => storageContentHandler("Główna")}
        >
          Powrót
        </Button>
      </div>
    );
  }
}

