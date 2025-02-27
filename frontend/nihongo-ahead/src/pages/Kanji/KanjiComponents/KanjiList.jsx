import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import CenteredModal from "./CenteredModal";
import HelpButton from "../../../components/HelpButton";
export default function KanjiList({
  imageData,
  storageContentHandler,
  colorMode,
  kanjiData
}) {
    
  const [modalShow, setModalShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleImageClick = (index) => {
    setCurrentIndex(index);  // Ustaw indeks wybranego znaku
    setModalShow(true);  // Pokaż modal
  };

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

  return (
    <div>
    <div className="kanji-grid-container">
      {imageData.map((item, index) => (
        <Col key={index} className="image-box">
          <Col key={`kanji-image-${index}`}>
            <img
              onClick={() => handleImageClick(index)}
              className={`kanji-image list-img ${colorMode ? "lightShadow " : "darkShadow"}`}
              src={`/znaki/Kanji/bez tła/${item.imageUrl}`}
              alt={`Japanese character ${index}`}
            />
          </Col>
          <Col key={`name-${index}`} className="image-lable">
            {index + 1}
          </Col>
        </Col>
      ))}

      {currentIndex !== null && (
        <CenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          kanjiData={kanjiData[currentIndex]}
          handleNext={handleNext}
          handlePrev={handlePrev}
          currentIndex={currentIndex}
        />
      )}
    </div>
    <Button
        className="mx-3 my-3"
        variant={colorMode? "dark":"light" }
        onClick={() => storageContentHandler("Główna")}
      >
        Powrót
      </Button>
      <HelpButton/>
    </div>
  );
}
