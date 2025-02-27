import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React,{useContext,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../App';

export default function Header() {
  const { colorMode, setColorMode } = useContext(Context);

  // Funkcja do przełączania trybu
  const toggleColorMode = () => {
    const newMode = !colorMode;
    setColorMode(newMode); // Aktualizacja kontekstu
    localStorage.setItem("colorMode", JSON.stringify(newMode)); // Zapis w localStorage
  };

  // Pobranie trybu z localStorage przy pierwszym renderze
  useEffect(() => {
    const storedMode = localStorage.getItem("colorMode");
    if (storedMode !== null) {
      setColorMode(JSON.parse(storedMode));
    }
  }, [setColorMode]);

  return (
    <Navbar className={colorMode ? "headerAndFooter-light" : "headerAndFooter-dark"} data-bs-theme={colorMode ? "light" : "dark"}>
        <Navbar.Brand href="/home" className='NVB-brand logo'>NihonGo-ahead</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Home">Strona Główna</Nav.Link>
            <Nav.Link href="/Syllables" onClick={()=>{sessionStorage.setItem('showContent', "Główna")}}>Hiragana&Katakana</Nav.Link>
            <Nav.Link href="/Kanji" onClick={()=>{sessionStorage.setItem('showContent', "Główna")}}>Kanji</Nav.Link>
            <Nav.Link href="/Words">Słówka</Nav.Link>
            <div className='colorModeChanger'>
              <Button 
                variant={colorMode ? 'dark' : 'light'}  
                className="colorIconButton" 
                onClick={toggleColorMode}
              >
                <span>
                  {colorMode ? '\u263E' : '\u263C'}
                </span>
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

