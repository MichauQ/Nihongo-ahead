import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import HelpButton from "../../../components/HelpButton";

export default function ChooseOneQuiz({
  iterateThrough,
  currentData,
  currentQuestion,
  totalQuestions,
  isQuizFinished,
  quizType,
  colorMode
}) {
  const [backgroundColor, setBackgroundColor] = useState({});
  const [answersSummary, setAnswersSummary] = useState([]);
  const [isClickBlocked, setIsClickBlocked] = useState(false);
  const [clickedImages, setClickedImages] = useState([]);

    useEffect(() => {
    // Resetowanie kolorów na początku nowego pytania
    setBackgroundColor({});
    setIsClickBlocked(false);  // Zwalnianie blokady kliknięć przy przeładowaniu pytania
    setClickedImages([]);
    }, [currentQuestion]);

  const handleImageClick = (clickedImageUrl) => {
    if (isClickBlocked || clickedImages.includes(clickedImageUrl)) {
      return;  
    }
    const correctImageUrl = currentData.imageAnswers.find(
      (img) => img.id === currentData.id
    ).imageUrl;
  
    const isCorrect = clickedImageUrl === correctImageUrl;
  
    setBackgroundColor((prevState) => ({
      ...prevState,
      [clickedImageUrl]: isCorrect ? "rgba(2, 242, 50, .6)" : "rgba(230, 9, 9, .6)",
      [correctImageUrl]: !isCorrect ? "rgba(2, 242, 50, .6)"  : "rgba(2, 242, 50, .6)" ,
    }));
  
    // Dodaj odpowiedź do podsumowania
    setAnswersSummary((prev) => [
      ...prev,
      { questionName: currentData.name, clickedImageUrl, correctImageUrl, isCorrect },
    ]);
    setIsClickBlocked(true);  
    setClickedImages((prev) => [...prev, clickedImageUrl]);
    iterateThrough(1500);

  };
  const correctAnswers = answersSummary.filter(answer => answer.isCorrect).length;
  // console.log(currentData);
  return (
    <div style={{marginTop:"20px"}}>
      {isQuizFinished ? (
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
                       <strong>Twoja odpowiedź dla:</strong>{' '}
                       <span style={{ color: answer.isCorrect ? 'green' : 'red' }}>
                         "{answer.questionName}"
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
             Spróbuj Ponownie
           </Button>
           <Link to={quizType==="Syllables"?"/Syllables" :"/Kanji"}>
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
          <h3>Znak: {currentData?.name}</h3>
          <Container className="answerContainer">
            <Row className="answerGrid">
              {currentData.imageAnswers.map((img, imgIndex) => (
                <Col
                  className="imageCon"
                  key={`col-${currentQuestion}-${imgIndex}`}
                  sm={6}
                  onClick={() => handleImageClick(img.imageUrl)}
                  style={{
                    backgroundColor: backgroundColor[img.imageUrl] || "transparent",
                  }}
                >
                  <img  
                    src={quizType === "Syllables" 
                      ? `${img.imageUrl}` 
                      : `/znaki/Kanji/bez tła/${img.imageUrl}`}
                    alt={`Image ${imgIndex}`}
                    className="answerImage"
                  />
                </Col>
              ))}
            </Row>
          </Container>
          <h2 className="counter">Numer pytania: {currentQuestion + 1}</h2>
          <Link to={quizType==="Syllables"? "/Syllables": "/Kanji"}>
            <Button className="button-style" variant={colorMode?"dark":"light"}>Wyjdź</Button>
          </Link>
          <HelpButton/>
        </div>
      )}
    </div>
  );
}  