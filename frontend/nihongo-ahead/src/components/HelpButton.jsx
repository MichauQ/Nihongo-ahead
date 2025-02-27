import React, { useContext, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Context } from "../App";
import { useLocation } from "react-router-dom";
import { helpImageData } from "../assets/helpImageData";

export default function HelpButton() {
  const [isActive, setIsActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageData, setImageData] = useState([]);
  const { colorMode } = useContext(Context);
  const location = useLocation();

  const getImageDataFromPath = (pathname, searchParams) => {
    const pathParts = pathname.split("/").filter(Boolean); 
    const mainCategory = pathParts[0] || "Syllables"; 
    const view = new URLSearchParams(searchParams).get("view"); 
    
    // Jeśli mamy view, spróbujmy znaleźć je w danych
    if (view && helpImageData[mainCategory]?.[view]) {
      return helpImageData[mainCategory][view] || [];
    }
  
    // Jeżeli brak `view`, szukamy sekcji fallbackowej
    const fallbackViews = ["default", "WybierzJeden", "RysowanieLvl1", "RysowanieLvl2"];
    for (let fallbackView of fallbackViews) {
      if (helpImageData[mainCategory]?.[fallbackView]) {
        return helpImageData[mainCategory][fallbackView];
      }
    }
  
    // Domyślnie zwracamy sekcję Root
    return helpImageData[mainCategory]?.Root || [];
  };
 

  useEffect(() => {
    const data = getImageDataFromPath(location.pathname, location.search);
    setImageData(data);
    setCurrentIndex(0); // Resetuj indeks
  }, [location]);
  

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
  };

  const generateImagePath = () => {
    const mainCategory = location.pathname.slice(1); 
    const view = new URLSearchParams(location.search).get("view"); 
    
    // Generujemy ścieżkę z `view` jeśli jest dostępna
    if (view) {
      const imagePath = `/pomoc/${mainCategory}/${view}/${imageData[currentIndex]}`;
      return imagePath;
    }
    
    // Jeśli brak `view`, używamy sekcji, którą zwróciła funkcja `getImageDataFromPath`
    const imagePath = `/pomoc/${mainCategory}/${imageData[currentIndex]}`;
    return imagePath;
  };

  return (
    <div className="help-container">
      <Button
        className="help-button"
        variant={colorMode ? "dark" : "light"}
        onClick={() => setIsActive(true)}
      >
        <span>{'\u2754'}</span>
      </Button>
      <Modal
        show={isActive}
        onHide={() => setIsActive(false)}
        dialogClassName="custom-modal-lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Pomoc: {currentIndex + 1} / {imageData.length}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="custom-modal-body"
          style={{
            backgroundImage: `url(${generateImagePath()})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "calc(95vh - 100px)", // Dopasowanie wysokości
          }}
        ></Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handlePrev} disabled={imageData.length === 0}>
            &#8592; Poprzedni
          </Button>
          <Button variant="secondary" onClick={handleNext} disabled={imageData.length === 0}>
            Następny &#8594;
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
