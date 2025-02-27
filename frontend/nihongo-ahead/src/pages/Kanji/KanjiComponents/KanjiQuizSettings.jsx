import React, { useRef } from "react";
import {Button, Container, Col} from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import MultiRangeSlider from "../../../components/MultiRangeSlider";
import HelpButton from "../../../components/HelpButton";
export default function KanjiQuizSettings({sliderValue,handleSliderChange,storageContentHandler,buttonType,buttonSwap,colorMode,imageData}){
    const maxRange = useRef(103);
    return(
        <div>
            <div className="slider">
                <MultiRangeSlider
                sliderValue={sliderValue}
                handleSliderChange={handleSliderChange}
                maxRange={maxRange.current}
                colorMode={colorMode}
                />
            </div>
                <Container>
                {buttonType=="Write"&&
                <div>
                <Col>
                <Link to={'/Quiz/default'}>
                <Button className='mx-2 mt-5' variant={colorMode?"dark":"light"} >Start </Button>
                </Link> 
                <Button className='mx-2 mt-5' variant={colorMode?"dark":"light"} onClick={() =>{storageContentHandler("Quizy"), buttonSwap("")}}>Powrót </Button>
                </Col>
                </div>
                 }
                {buttonType=="Choose"&& 
                <Col>
                <Link to={'/Quiz/WybierzJeden'}>
                <Button className='mx-2 mt-5' variant={colorMode?"dark":"light"} >Start </Button>
                </Link> 
                <Button className='mx-2 mt-5' variant={colorMode?"dark":"light"} onClick={() =>{storageContentHandler("Quizy"),buttonSwap("")}}>Powrót </Button>
                </Col>}
                {buttonType=="Draw1"&& 
                <Col>
                    <Link to={'/Quiz/RysowanieLvl1'}>
                        <Button className='mx-2 mt-5' variant={colorMode?"dark":"light"} >Start </Button>
                    </Link>
                    <Button className='mx-2 mt-5' variant={colorMode?"dark":"light"} onClick={() =>{storageContentHandler("DrawingLevels"),buttonSwap("")}}>Powrót </Button>
                </Col>}
                {buttonType=="Draw2"&& 
                <Col>
                    <Link to={'/Quiz/RysowanieLvl2'}>
                        <Button className='mx-2 mt-5' variant={colorMode?"dark":"light"} >Start </Button>
                    </Link>
                    <Button className='mx-2 mt-5' variant={colorMode?"dark":"light"} onClick={() =>{storageContentHandler("DrawingLevels"),buttonSwap("")}}>Powrót </Button>
                </Col>}
                <div className="kanji-settings-list">
                    <div className="kanji-settings-grid">
                    {imageData.map((item, index) => (
                        <Col key={index} className="settings-image-box">
                            <Col key={`kanji-image-${index}`}>
                            <img
                                className={`kanji-settings-image ${colorMode ? "lightShadow " : "darkShadow"}`}
                                src={`/znaki/Kanji/bez tła/${item.imageUrl}`}
                                alt={`Japanese character ${index}`}
                            />
                            </Col>
                            <Col key={`name-${index}`} className="image-name">
                            {index + 1}
                            </Col>
                        </Col>
                        ))}
                    </div>
                </div>
                </Container>
                <HelpButton/>
        </div>
    );
}
