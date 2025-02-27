import React,{useMemo} from 'react';
import {Button, Col, Accordion, Container} from 'react-bootstrap';
export default function SyllableMenu({storageContentHandler,colorMode}){
    const contentArray = useMemo(() => [
        { 
            title: "1 - Podaj odpowiedź:", 
            description: "W tym teście na ekranie pojawia się znak japońskiego pisma. Wpisz jego nazwę w pole tekstowe i sprawdź, jak dobrze znasz Hiraganę i Katakanę.", 
            action: () => storageContentHandler("Default") 
        },
        { 
            title: "2 - Wybierz dobrze:", 
            description: "W tym teście zobaczysz cztery obrazy znaków oraz nazwę jednego z nich. Kliknij w obraz, który odpowiada wyświetlonej nazwie. Uważaj – tylko jedna odpowiedź jest poprawna!", 
            action: () => storageContentHandler("Wybór") 
        },
        { 
            title: "3 - Narysuj:", 
            description: "W tym przypadku, Twoim zadaniem jest narysowanie znaku japońskiego pisma na podstawie wyświetlonej nazwy lub podpowiedzi wizualnej. \nSprawdź swoją pamięć i precyzję rysowania!", 
            action: () => storageContentHandler("Rysowanie") 
        }
    ], []);

    return(
    <Container>
        <Col className="m-4">
            <h1>Wybierz rodzaj testu:</h1>
        </Col>
        <Col>
            <Accordion defaultActiveKey={null} alwaysOpen className={colorMode?"custom-accordion syllableMenu-light":"custom-accordion syllableMenu-dark"}>
                {contentArray.map((item, index) => (
                    <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <p>
                                {item.description.split("\n").map((line, idx) => (
                                    <span key={idx}>
                                    {line}
                                    <br />
                                    </span>
                                ))}
                                </p>
                            </div>
                            <div>
                                <Button variant={colorMode?"light":"dark"} onClick={item.action}>
                                    Wejdź
                                </Button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Col>
    </Container>)
}