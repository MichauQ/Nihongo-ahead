import React, { useState, useEffect } from "react";
import { Modal, Container, Col } from "react-bootstrap";
import { fetchDailyWord } from "./API";

export default function DailyWordComponent() {
  const [cardInfo, setCardInfo] = useState({});
  const [isCardOpen, setIsCardOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(""); // Domyślnie pusta wartość

  // Funkcja obliczająca czas do północy
  const calculateTimeToMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeToMidnight = midnight - now;

    const hours = Math.floor(timeToMidnight / (1000 * 60 * 60));
    const minutes = Math.floor((timeToMidnight % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeToMidnight % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, timeToMidnight };
  };

  // Ustawienie początkowego stanu timera na podstawie obliczonego czasu do północy
  useEffect(() => {
    const timer = setInterval(() => {
      const { hours, minutes, seconds, timeToMidnight } = calculateTimeToMidnight();
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      
      if (timeToMidnight <= 1000) { 
        window.location.reload();
      }
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);
  

  // Pobieranie słowa dnia i ustawienie stanu
  useEffect(() => {
    fetchDailyWord(setCardInfo);
  }, []);

  // Ustawienie stanu karty po załadowaniu danych
  useEffect(() => {
    if (cardInfo.id) {
      const storedWordId = localStorage.getItem("dailyWordId");
      const storedIsCardOpen = localStorage.getItem("isCardOpen") === "true";
  
      if (storedWordId && storedWordId === String(cardInfo.id)) {
        setIsCardOpen(storedIsCardOpen);  
        //console.log("Słowo jest takie samo, zachowaj stan:", storedIsCardOpen);
      } else if (storedWordId !== String(cardInfo.id)) {
        setIsCardOpen(false); 
        localStorage.setItem("dailyWordId", String(cardInfo.id));
        localStorage.setItem("isCardOpen", "false");
        //console.log("Nowe słowo dnia, zamknij kartę.");
      }
    }
  }, [cardInfo]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleCard = () => {
    if (!isCardOpen) {
      setIsCardOpen(true);
      localStorage.setItem("isCardOpen", "true");
    }
  };

   if (isCardOpen === null) return <div>Ładowanie...</div>;

  return (
    <div className="card-container">
      <div
        className={`karta ${isCardOpen ? "open" : "closed"} noPointer ${
          isCardOpen ? "no-animation" : ""
        }`}
        onClick={toggleCard}
      >
        <div className="card-front">
          <h2>{cardInfo.hiragana ? "Słowo dnia to:" : "Ładowanie..."}</h2>
          <h3 className="daily-word" onClick={openModal}>
            {cardInfo.hiragana || "Ładowanie słowa..."}
          </h3>
          <p className="testText">
            {cardInfo.hiragana ? (
              <>Kliknij, aby dowiedzieć się więcej...</>
            ) : (
              "Ładowanie słowa..."
            )}
          </p>
          <p className="timer">
            {timeLeft ? `Nowe słowo za: ${timeLeft}` : "Ładowanie timera..."}
          </p>
        </div>
        <div className="card-back">
          <h2>Odkryj nowe słowo dnia!</h2>
        </div>
      </div>

      <Modal
        show={isModalOpen}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {cardInfo.hiragana || "Nazwa Kanji"} ({cardInfo.type || "Ładowanie..."})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Col>
              <div>
                <h5><strong>Zapis (alfabet łaciński):</strong> {cardInfo.reading || "Ładowanie..."}</h5>
                <h5><strong>Znaczenie:</strong> {cardInfo.meaning || "Ładowanie..."}</h5>
              </div>
            </Col>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
