import Modal from "react-bootstrap/Modal";
import { Button, Col, Container } from "react-bootstrap";

export default function CenteredModal({
  show,
  onHide,
  kanjiData,
  handleNext,
  handlePrev,
  currentIndex,
}) {

  const KanjiInfo = ({ onyomi, kunyomi, translation, association, examples }) => {
    return (
      <div className="kanji-info">
        <h2>Informacje o znaku Kanji</h2>
        <p><strong>On'yomi (音読み):</strong> {onyomi || "Brak danych."}</p>
        <p><strong>Kun'yomi (訓読み):</strong> {kunyomi || "Brak danych."}</p>
        <p><strong>Znaczenie:</strong> {translation || "Brak danych."}</p>
        <p><strong>Skojarzenie:</strong> {association || "Brak danych."}</p>
        <p><strong>Przykłady użycia:</strong> {examples || "Brak danych."}</p>
      </div>
    );
  };
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {currentIndex + 1}: {kanjiData?.onyomi || "Nazwa Kanji"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container style={{ display: "inline-flex" }}>
          <Col>
            {kanjiData ? (
              <img
                style={{
                  width: "300px",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
                src={`/rysowanie_kanji/${kanjiData.imageUrl}`}
                alt={`Kanji ${kanjiData.name}`}
                className="modal-kanji-image"
              />
            ) : (
              <p>Brak danych do wyświetlenia.</p>
            )}
          </Col>
          <Col>
            {kanjiData ? (
              <KanjiInfo
                onyomi={kanjiData.onyomi}
                kunyomi={kanjiData.kunyomi}
                translation={kanjiData.translation}
                association={kanjiData.association}
                examples={kanjiData.examples}
              />
            ) : (
              <p>Brak danych do wyświetlenia.</p>
            )}
          </Col>
        </Container>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handlePrev}>
          &#8592; Poprzedni
        </Button>
        <Button variant="secondary" onClick={handleNext}>
          Następny &#8594;
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
