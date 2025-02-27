import React from "react";
import { Container } from "react-bootstrap";

export default function WordList({ wordsData }) {
    return (
        <Container className="words-grid-container">
            {/* Nagłówki kolumn */}
            <div className="words-grid-label">
                <div className="label">Lp.</div>
                <div className="label">Zapis japoński</div>
                <div className="label">Zapis (alfabet łaciński)</div>
                <div className="label">Znaczenie</div>
                <div className="label">Typ</div>
            </div>
            {/* Wiersze danych */}
            {wordsData.map((item, index) => (
                <React.Fragment key={index}>
                    <div className="word-cell">{item.id}</div>
                    <div className="word-cell">{item.hiragana}</div>
                    <div className="word-cell">{item.reading}</div>
                    <div className="word-cell">{item.meaning}</div>
                    <div className="word-cell">{item.type}</div>
                </React.Fragment>
            ))}
        </Container>
    );
}
