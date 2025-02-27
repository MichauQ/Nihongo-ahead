import { Accordion, Button, Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import HelpButton from "../../../components/HelpButton";

export default function DefaultQuiz({isQuizFinished,quizType,setSelectedValues,totalQuestions,currentData,currentQuestion,iterateThrough,colorMode}){
    const [inputValue, setInputValue] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [message, setMessage] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState("transparent");
    const [messageColor, setMessageColor] = useState(null);
    const [answersSummary, setAnswersSummary] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const lastEnterPress = useRef(0)
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Zapobieganie domyślnej akcji (wysyłanie formularza)
          
          // Sprawdzenie, czy proces nie jest już w toku
          if (isProcessing) {
            return; // Jeśli proces jest w toku, nie wykonuj nic
          }
      
          const now = Date.now();
          if (now - lastEnterPress.current > 200) { // Minimalny czas między naciśnięciami
            lastEnterPress.current = now;
      
            setIsProcessing(true); // Ustawienie blokady
      
            characterCheckAndNext();  // Funkcja do sprawdzenia odpowiedzi
          }
        }
      };
      
    useEffect(() => {
        if (message) {
          const timer = setTimeout(() => {
            setMessage(null);
            setBackgroundColor("transparent");
          }, 1900);
      
          return () => clearTimeout(timer);
        }
      }, [message, currentQuestion]);

    const characterCheckAndNext = async () => {
        const response = await fetch(`http://localhost:8080/${quizType === "Syllables" ? "syl" : "kan"}/checkData`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: currentData?.id,
            answerInput: inputValue,
          }),
        });
        const result = await response.json();
        setAnswersSummary((prev) => [
            ...prev,
            {
              question: currentData?.question || currentData?.id, // Jeśli masz pole na pytanie
              userAnswer: inputValue,
              isCorrect: result,
            },
          ]);
        setCorrectAnswers((prev) => prev + (result ? 1 : 0));
        setInputValue("");
        answerAlert(result);
        iterateThrough(2000);
        setIsProcessing(false);
      };
    
      const answerAlert = (result) => {
        setMessage(result ? "Poprawna odpowiedź!" : "Błędna odpowiedź!");
        setBackgroundColor(result ? "rgba(2, 242, 50, .6)" : "rgba(230, 9, 9, .6)");
        setMessageColor(result ? "green" : "red");
      };
    
    return(<div>
        {isQuizFinished? (
              <div className="results">
              <h2>Koniec Testu!</h2>
              <h3>Twoje odpowiedzi:</h3>
              <Container>
                <Col className="accordion-column">
                  <Accordion defaultActiveKey={null} alwaysOpen className={colorMode?"custom-accordion syllableMenu-light":"custom-accordion syllableMenu-dark"}>
                    {answersSummary.map((answer, idx) => (
                      <Accordion.Item eventKey={idx} key={idx}>
                        <Accordion.Header>
                        Pytanie: {idx+1}
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            <strong>Twoja odpowiedź:</strong>{' '}
                            <span style={{ color: answer.isCorrect ? 'green' : 'red' }}>
                              "{answer.userAnswer}"
                            </span>,{' '}
                            <strong>jest</strong>{' '}
                            <span style={{ color: answer.isCorrect ? 'green' : 'red' }}>
                              {answer.isCorrect ? 'Poprawna' : 'Błędna'}
                            </span>
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Col>
              </Container>
              <h3>
                Wynik: {correctAnswers} / {totalQuestions}
              </h3>
              <div className="button-con">
                <Button
                  className="button-style"
                  variant={colorMode?"dark":"light"}
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Spróbuj ponownie
                </Button>
                <Link to="/Kanji">
                  <Button
                    className="button-style"
                    variant={colorMode?"dark":"light"}
                    onClick={() => setSelectedValues([])}
                  >
                    Powrót
                  </Button>
                </Link>
              </div>
            </div>
      ) : (
        <div>
          <img
            style={{ backgroundColor: backgroundColor, transition: "0.3s" }}
            className="quiz-image"
            src={quizType === "Syllables" 
              ? `data:image/png;base64,${currentData.imageUrl}` 
              : `/znaki/Kanji/bez tła/${currentData.imageUrl}`}
            alt="Current Quiz"
          />
          <Container>
            <Form>
              <Form.Control
                className="d-inline answer-input"
                id="answerField"
                type="text"
                placeholder="Wprowadź odpowiedź:"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Form>
          </Container>
          <h2 style={{ color: messageColor }}>{message}</h2>
          <div className="counter-container">
            <h2 className="counter">Numer pytania: {currentQuestion + 1}</h2>
            <Link to={`/${quizType}`}>
              <Button variant={colorMode?"dark":"light"} className="back-button">
                Wyjdź
              </Button>
            </Link>
          </div>
          <HelpButton/>
        </div>
      )}
      </div>);
}