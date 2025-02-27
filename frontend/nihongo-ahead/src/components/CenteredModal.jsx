import Modal from 'react-bootstrap/Modal';

export default function CenteredModal(props) {
    
  return (
    <Modal 
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Nazwa Kanji
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Informacje o Kanji
        </p>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
}



