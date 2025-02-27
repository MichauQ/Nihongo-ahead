import React, { useContext } from "react";
import { Context } from "../../App";
import '../../assets/App.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  const { colorMode } = useContext(Context);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div
        className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}
        style={{display: "flex", flex: 1, justifyContent:"center"}} 
      >
        <div style={{width:"800px"}}>
          <h1>O stronie</h1>
          <p>
          Witamy na stronie stworzonej w ramach projektu do pracy dyplomowej studenta Politechniki Poznańskiej kierunku Edukacja Techniczno-Informatyczna.<br/>
          Celem projektu jest ułatwienie nauki podstaw języka japońskiego w przystępny i interaktywny sposób.<br/>
          Strona została zaprojektowana z myślą o osobach, które chcą rozpocząć swoją przygodę z japońskim, oferując ćwiczenia, quizy oraz materiały edukacyjne za darmo!<br/>
          Zapraszamy do odkrywania języka i kultury Japonii!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
