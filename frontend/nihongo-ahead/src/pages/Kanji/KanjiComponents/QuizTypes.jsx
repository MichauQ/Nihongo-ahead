import React from "react";
import {Button, Card, Container, Col, Row} from 'react-bootstrap';
import HelpButton from "../../../components/HelpButton";
export default function QuizTypes({storageContentHandler,buttonSwap,quizModeSelectionHandler,colorMode}){

    return (
        <div>
            <Container>
                <h1>Wybierz rodzaj testu: </h1>
            <Row>
                <Col className='d-flex justify-content-center'>
                    <Card className='bg-light text-white my-5 n5card' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="src/assets/Images/test-1.png" className={colorMode?"lightShadow":"darkShadow"}/>
                    <Card.ImgOverlay className={colorMode? "overlay kanjiCardOverlay-light" :"overlay kanjiCardOverlay-dark"}>
                        <div className="content">
                            <Card.Title>Podaj odpowiedź:</Card.Title>
                            <Card.Text>
                                W tym teście na ekranie pojawia się znak japońskiego pisma. Wpisz jego nazwę w pole tekstowe i sprawdź, jak dobrze znasz znaki Kanji.
                            </Card.Text>    
                            <Col >
                                <Button className='mx-2' variant="light" onClick={() =>{storageContentHandler("Ustawienia"); buttonSwap("Write"); quizModeSelectionHandler("default")}} >Wejdź </Button>
                            </Col>
                        </div>    
                    </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Card className='bg-light text-white my-5 n5card' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="src/assets/Images/test-2.png" className={colorMode?"lightShadow":"darkShadow"}/>
                    <Card.ImgOverlay className={colorMode? "overlay kanjiCardOverlay-light" :"overlay kanjiCardOverlay-dark"}>
                        <div className="content">
                            <Card.Title>Wybierz dobrze: </Card.Title>
                            <Card.Text>
                            W tym teście zobaczysz cztery obrazy znaków oraz nazwę jednego z nich. Kliknij w obraz, który odpowiada wyświetlonej nazwie.<br/> 
                            Uważaj – tylko jedna odpowiedź jest poprawna! 
                            </Card.Text>    
                            <Col >
                                <Button className='mx-2' variant="light" onClick={() =>{storageContentHandler("Ustawienia"); buttonSwap("Choose"); quizModeSelectionHandler("WybierzJeden")}} >Wejdź </Button>
                            </Col>
                        </div>    
                    </Card.ImgOverlay>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Card className='bg-light text-white my-5 n5card' style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="src/assets/Images/test-3.png" className={colorMode?"lightShadow":"darkShadow"}/>
                    <Card.ImgOverlay className={colorMode? "overlay kanjiCardOverlay-light" :"overlay kanjiCardOverlay-dark"}>
                        <div className="content">
                            <Card.Title>Narysuj: </Card.Title>
                            <Card.Text>
                            W tym przypadku, Twoim zadaniem jest narysowanie znaku japońskiego pisma na podstawie wyświetlonej nazwy lub podpowiedzi wizualnej. <br/> Sprawdź swoją pamięć i precyzję rysowania!
                            </Card.Text>    
                            <Col >
                                <Button className='mx-2' variant="light" onClick={() =>{storageContentHandler("DrawingLevels"); buttonSwap("Draw")}} >Wejdź</Button>
                            </Col>
                        </div>    
                    </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
            </Container>
            <div className="my-5">
            <Button className='mx-2' variant={colorMode?"dark":"light"}  onClick={() =>storageContentHandler("Główna")}>Powrót</Button>
            </div>
            <div>
                <HelpButton/>
            </div>
        </div>
    );
}
