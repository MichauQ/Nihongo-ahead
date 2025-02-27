import React, { useContext } from "react";
import { Context } from "../../App";
import '../../assets/App.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const { colorMode } = useContext(Context);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div
        className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}
        style={{ display: "flex", flex: 1, justifyContent:"center" }}
      >
        <div>
          <h1>Kontakt:</h1>
          <p><b>Autor:</b> Michał Fraj<br/>
          <b>Email:</b> michal.fraj@student.put.poznan.pl<br/>
          <b>Telefon:</b> +48 XXX XXX XXX</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}