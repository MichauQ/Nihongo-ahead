import React from "react";
import {Button, Card, Container, Col, Row} from 'react-bootstrap';
export default function DrawingLevels({storageContentHandler,buttonSwap,quizModeSelectionHandler,isLvlTwoUnlocked,colorMode}){

    return (
        <div>
            <Container>
                <h1>Wybierz poziom: </h1>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Card className='bg-light text-white my-5 n5card' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="src/assets/Images/poziom-1.png" className={colorMode?"lightShadow":"darkShadow"}/>
                    <Card.ImgOverlay className={colorMode? "overlay kanjiCardOverlay-light" :"overlay kanjiCardOverlay-dark"}>
                        <div className="content">
                            <Card.Title>Rysowanie poziom 1</Card.Title>
                            <Card.Text>
                                Poziom pierwszy polega na rysowaniu znaków ze wzoru w celu nauki ich pisowni.<br>
                            </br>Ukończenie tego poziomu przynajmniej raz dla wszystkich znaków kanji, odblokowuje poziom drugi.
                            </Card.Text>    
                            <Col >
                                <Button className='mx-2' variant="light" onClick={() =>{storageContentHandler("Ustawienia"); buttonSwap("Draw1"); quizModeSelectionHandler("RysowanieLvl1")}} >Wejdź </Button>
                            </Col>
                        </div>    
                    </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Card className='bg-light text-white my-5 n5card' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="src/assets/Images/poziom-2.png" className={colorMode?"lightShadow":"darkShadow"}/>
                    <Card.ImgOverlay className={colorMode? "overlay kanjiCardOverlay-light" :"overlay kanjiCardOverlay-dark"}>
                        <div className="content">
                            <Card.Title>Rysowanie poziom 2</Card.Title>
                            <Card.Text>
                                Poziom drugi polega na ponownym narysowaniu znaków kanji, jednak tym razem bez wyświetlonej pomocy w postaci wzoru.<b> Narysuj z pamięci i sprawdź odpowiedź.</b> 
                            </Card.Text>    
                            <Col >
                                <Button className='mx-2' variant="light" onClick={() =>{storageContentHandler("Ustawienia"); buttonSwap("Draw2"); quizModeSelectionHandler("RysowanieLvl2")}}  >Wejdź </Button>
                            </Col>
                        </div>    
                    </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
            </Container>
        </div>
    );
}
