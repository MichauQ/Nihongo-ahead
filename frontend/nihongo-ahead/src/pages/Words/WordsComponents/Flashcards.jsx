import React,{useState,useEffect} from "react";
import { Button } from "react-bootstrap";
export default function Flashcards({cardInfo,colorMode}){
    const [isFlipped, setIsFlipped] = useState(true);
    const [noTransition, setNoTransition] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const toggleCard = () => {
        setIsFlipped((prev) => !prev);
      };
    
      const nextCard = () => {
        setIsFlipped(true);
        setNoTransition(true);
    
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % cardInfo.length);
          setNoTransition(false);
        }, 1);
      };
    
      const previousCard = () => {
        setIsFlipped(true);
        setNoTransition(true);  
        setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex - 1 + cardInfo.length) % cardInfo.length
        );
        setNoTransition(false);
        }, 1);
      };
    
      const currentCard = cardInfo[currentIndex];

    return(
        <div className="card-container">
          <div className="card-box">
            {currentCard && (
              <div
                className={`karta ${isFlipped ? "flipped" : ""} ${
                  noTransition ? "no-transition" : ""
                }`}
                onClick={toggleCard}
              >
              <div className="card-front">
                <h2>{currentCard?.hiragana}</h2>
                <p className="card-text mt-2">Czyt.: {currentCard?.reading}</p>
              </div>
                <div className="card-back noselect">
                {currentCard?.meaning.split('/').map((word, index, array) => (
                  <h3 key={index}>
                    {word}
                    {index < array.length - 1 && '/'} {/* Dodaje '/' po każdym słowie oprócz ostatniego */}
                  </h3>
                ))}
                </div>
              </div>
              
            )}
          </div>
          <div>
          <h2>Fiszka {currentIndex+1} z {cardInfo.length}</h2>
          </div>
          <div>
          <Button className="mx-2 mt-2" variant={colorMode?"dark":"light"} onClick={previousCard}>Poprzednia</Button>
          <Button className="mx-2 mt-2" variant={colorMode?"dark":"light"} onClick={nextCard}>Następna</Button>
          </div>
        </div>
      );
}

