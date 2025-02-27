import React, { useContext } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from "../App";
export default function Footer(){
    const {colorMode} = useContext(Context);
    return(
        <footer className={colorMode ? "headerAndFooter-light py-2" : "headerAndFooter-dark py-2"}>
            <div className="footer-con">
                <div className="footer-nav"> 
                    <Navbar className={colorMode ? "headerAndFooter-light" : "headerAndFooter-dark"} data-bs-theme={colorMode ? "light" : "dark"}>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/About">O stronie</Nav.Link>
                        <Nav.Link href="/Contact" onClick={()=>{sessionStorage.setItem('showContent', "Główna")}}>Kontakt</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className="footer-logo">                
                    <h4 className='NVB-brand logo ' style={{width:"300px",color: colorMode?"black":"white"}}>NihonGo-ahead</h4>
                    <small className={colorMode?"text-black-50":"text-white-50"}>&copy; Copyright by Michał Fraj. All rights reserved</small>
                </div>
                <div className="footer-filler"></div>
            </div>
        </footer>
    )
}