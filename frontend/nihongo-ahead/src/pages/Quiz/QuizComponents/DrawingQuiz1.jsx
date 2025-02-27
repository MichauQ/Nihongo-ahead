import React, { useState, useRef, useEffect} from 'react';
import { Container, Button, Col, Form, Modal, Carousel,Accordion } from 'react-bootstrap';
import CanvasForDrawing from '../../../components/CanvasForDrawing';
import { Link } from 'react-router-dom';
import HelpButton from '../../../components/HelpButton';

export default function DrawingQuiz1({matchingName,currentQuestion,totalQuestions, currentData, iterateThrough, quizType,colorMode}) {
  const [isDrawingFinished, setIsDrawingFinished] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Stan do pokazania toasta
  const [answerList, setAnswerList] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const canvasRef = useRef(null);
  

  useEffect(() => {
    if (isQuizFinished) {
        const progressKey = quizType === "Syllables" 
            ? 'syllableDrawingProgress' 
            : 'kanjiDrawingProgress';

        const progress = JSON.parse(localStorage.getItem(progressKey)) || [];

        answerList.forEach(({ id, isCorrect }) => {
            if (isCorrect && !progress[id - 1]) {
                progress[id - 1] = true;
            }
        });

        localStorage.setItem(progressKey, JSON.stringify(progress));
    }
}, [isQuizFinished]);

  const handleFinishDrawing = () => {
    setIsDrawingFinished(true);
    setIsButtonsDisabled(true);
  };
  const handleShowPopup = () => {
    setShowPopup(true); 
  };

  const handlePopupClose = () => {
    setShowPopup(false);        
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value ==="true");
  };

  const handleNextCanvas = () => {
    if (currentQuestion + 1 < totalQuestions) { 
        iterateThrough(0); 
        handleAnswerSave(selectedOption); 
        canvasRef.current.clearCanvas();
        setIsDrawingFinished(false);
        setIsButtonsDisabled(false); 
        setShowPopup(false); 
    } else {
        handleAnswerSave(selectedOption); 
        setIsQuizFinished(true); 
    }
};
  const handleAnswerSave = (isCorrect) => {
    if (isDrawingFinished) {  
      const canvasUrl = canvasRef.current.getCanvasImage();
      setAnswerList((prevArray) => [
        ...prevArray,
        {
          id: currentData.id,
          isCorrect,
          imageUrl: currentData.imageUrl,
          canvasUrl,
        },
      ]);
    }
  };
  const encodeUrlSpecialChars = (url) => url.replace(/\(/g, '%28').replace(/\)/g, '%29');
  // console.log(currentQuestion+1+"/"+totalQuestions);
  return (
    <div>
      {isQuizFinished ? (
        <div>
          <Container>
              <Col className='accordion-column '>
              <h1>Koniec testu!</h1>
              <h3>Podsumowanie:</h3>
              <Accordion defaultActiveKey={null} alwaysOpen className={colorMode?"custom-accordion syllableMenu-light":"custom-accordion syllableMenu-dark"}>
                {answerList.map((item, index) => (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                      Odpowiedź {index + 1}: {item.isCorrect ? 'Dobrze' : 'Źle'}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Carousel interval={null} className="carousel-dark">
                        <Carousel.Item>
                          <img
                            className={`carousel-result-image ${colorMode ? 'lightShadow' : 'darkShadow'} carousel-result-image-${index}`}
                            src={item.canvasUrl}
                            alt={`Canvas drawing ${index}`}
                          />
                        </Carousel.Item>
                        <Carousel.Item>
                          <img
                            className={`carousel-result-image ${colorMode ? 'lightShadow' : 'darkShadow'} carousel-result-image-${index}`}
                            src={quizType === 'Syllables' ? `data:image/png;base64,${item.imageUrl}` : `/znaki/Kanji/bez%20tła/${item.imageUrl}`}
                            alt={`Japanese character ${index}`}
                          />
                        </Carousel.Item>
                      </Carousel>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
              </Col>
          </Container>
          <div>
            {quizType==="Syllables"?(
          <Link to={'/Syllables'}>
            <Button variant="light" onClick={()=>{sessionStorage.setItem('showContent', "Rysowanie")}}> Powrót</Button>
          </Link>
          ):(
            <Link to={'/Kanji'}>
            <Button variant="light" onClick={()=>{sessionStorage.setItem('showContent', "DrawingLevels")}}> Powrót</Button>
          </Link>
          )}
          </div>
        </div>
      ) : (
        <Container className='mb-4'>
           {matchingName && (
              <div className='mt-3'>
                <h2>Znak {currentQuestion+1}/{totalQuestions} : {matchingName.name}</h2>
              </div>
            )}
          <Col className="canvasHolder" style={{ position: "relative" }}>
            <CanvasForDrawing ref={canvasRef} isDrawingDisabled={isDrawingFinished} isButtonsDisabled={isButtonsDisabled}/>
            <div
              key={currentData.id}
              style={{
                position: "absolute",
                width: "500px",
                height: "500px",
                backgroundImage: `url(${quizType === 'Syllables' ? `data:image/png;base64,${currentData.imageUrl}` : `/znaki/Kanji/bez%20tła/${encodeUrlSpecialChars(currentData.imageUrl)}`})`,
                backgroundSize: "500px",
                backgroundRepeat: "no-repeat",
                top: 0,
                opacity: 0.5,
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </Col>
          <Col>
            {!isDrawingFinished ? (
              <div>
                <div style={{display:'flex',justifyContent:"center", alignItems:"center"}}>
                <div style={{flex:"1"}}></div>
                <div style={{flex:"2"}}><Button  variant={colorMode? "dark":"light"} onClick={handleFinishDrawing}>
                  Zakończ rysowanie
                </Button></div>
                <div style={{flex:"1"}}><HelpButton/></div>
                </div>
                {quizType==="Syllables" ? (
                <div><Link to="/Syllables"><Button variant={colorMode? "dark":"light"}>Wyjdź</Button></Link></div>
                ) : quizType==="Kanji" ? (
                <div><Link to="/Kanji"><Button variant={colorMode? "dark":"light"}>Wyjdź</Button></Link></div>
                ):null
              }
              </div>
              ) : (
              <div>
                <div style={{display:'flex',justifyContent:"center", alignItems:"center"}}>
                <div style={{flex:"1"}}></div>
                <div style={{flex:"2"}}><Button  variant={colorMode? "dark":"light"} onClick={handleShowPopup}>
                  Następne pytanie
                </Button></div>
                <div style={{flex:"1"}}><HelpButton/></div>
                </div>
                {quizType==="Syllables" ? (
                <div><Link to="/Syllables"><Button variant={colorMode? "dark":"light"}>Wyjdź</Button></Link></div>
                ) : quizType==="Kanji" ? (
                <div><Link to="/Kanji"><Button variant={colorMode? "dark":"light"}>Wyjdź</Button></Link></div>
                ):null
              }
              </div>
            )}
          </Col>
          <Modal show={showPopup} onHide={handlePopupClose}>
            <Modal.Header closeButton>
              <Modal.Title>Podsumowanie rysunku</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Czy jesteś zadowolony ze swojego rysunku?</p>
              <Form>
                <Form.Check
                  type="radio"
                  name="satisfaction"
                  label="Tak"
                  value="true"
                  checked={selectedOption === true}
                  onChange={handleOptionChange}
                />
                <Form.Check
                  type="radio"
                  name="satisfaction"
                  label="Nie"
                  value="false"
                  checked={selectedOption === false}
                  onChange={handleOptionChange}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePopupClose}>
                Zamknij
              </Button>
              <Button variant="primary" onClick={handleNextCanvas} disabled={selectedOption===null}>
                Kontynuuj
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </div>
  );
}
