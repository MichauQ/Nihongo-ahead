import { React, useState, useEffect } from "react";
import { fetchAllDataForKanji, fetchKanjiDataForDefaultQuiz } from "./API";
import { Col, Container, Row } from "react-bootstrap";

export default function OneOptionQuiz(props) {
  const [kanjiImageData, setKanjiImageData] = useState([]);
  const [allKanjiData, setAllKanjiData] = useState([]);
  const [names, setNames] = useState([]);
  const [imageSets, setImageSets] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState({});

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function iterateThrough() {
    await timeout(1500);
    setBackgroundColor({});
    setQuizIndex((prevIndex) => prevIndex + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchKanjiDataForDefaultQuiz(props.selectedValues, setKanjiImageData);
      await fetchAllDataForKanji(setAllKanjiData);
    };
    fetchData();
  }, [props.selectedValues]);

  useEffect(() => {
    if (kanjiImageData.length > 0 && allKanjiData.length > 0) {
      const kanjiObject = allKanjiData.map((item) => ({
        id: item.id,
        onyomi: item.onyomi,
        imageUrl: item.imageUrl,
      }));

      const nameObjects = kanjiImageData.map((item) => {
        const kanji = kanjiObject.find((k) => k.id === item.id);
        return kanji ? { id: kanji.id, name: kanji.onyomi } : null;
      });
      setNames(nameObjects);

      const images = kanjiImageData.map((item) => {
        const arr = [];
        const correctImage = kanjiObject.find((k) => k.id === item.id).imageUrl;
        arr.push(correctImage);

        while (arr.length < 4) {
          const randomIndex = Math.floor(Math.random() * kanjiObject.length);
          const randomKanji = kanjiObject[randomIndex];
          if (!arr.includes(randomKanji.imageUrl)) {
            arr.push(randomKanji.imageUrl);
          }
        }

        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
      });
      setImageSets(images);
    }
  }, [kanjiImageData, allKanjiData]);

  const handleImageClick = (clickedImageUrl) => {
    if (!kanjiImageData.length || !names.length || quizIndex >= names.length) {
      console.log("Błąd: dane nie są gotowe");
      return;
    }

    const correctKanji = names[quizIndex];
    const clickedKanji = allKanjiData.find((item) => item.imageUrl === clickedImageUrl);
    const correctImageUrl = kanjiImageData[quizIndex].imageUrl;

    if (clickedKanji && clickedKanji.id === correctKanji.id) {
      setBackgroundColor({
        [clickedImageUrl]: "rgba(2, 242, 50, .6)", 
      });
    } else {
      setBackgroundColor({
        [clickedImageUrl]: "rgba(230, 9, 9, .6)",  
        [correctImageUrl]: "rgba(2, 242, 50, .6)", 
      });
    }
    iterateThrough();
  };

  return (
    <div>
      {names.length > 0 && imageSets.length > 0 && quizIndex < names.length && (
        <div>
          <div key={`name-${quizIndex}`}>
            <h3>{names[quizIndex]?.name}</h3>
          </div>
          <Container className="answerContainer">
            <Row className="answerGrid">
              {imageSets[quizIndex].map((imgUrl, imgIndex) => (
                <Col
                  className="imageCon"
                  key={`col-${quizIndex}-${imgIndex}`}
                  sm={6}
                  onClick={() => handleImageClick(imgUrl)}
                  style={{ backgroundColor: backgroundColor[imgUrl] || 'transparent' }}
                >
                  <img 
                    src={`/znaki/Kanji/bez tła/${imgUrl}`} 
                    alt={`Image ${imgIndex}`} 
                    className="answerImage" 
                  />
                </Col>                           
              ))}
            </Row>
          </Container>
          <h2 className='counter'>Numer pytania: {quizIndex + 1}</h2>
        </div>
      )}
    </div>
  );
}



// import {React, useState, useEffect} from "react";
// import { fetchAllDataForKanji, fetchKanjiDataForQuiz } from "./API";
// import { Col, Container, Row } from "react-bootstrap";

// export default function OneOptionQuiz(props){
//     const [kanjiImageData, setKanjiImageData] = useState([]);
//     const [allKanjiData, setAllKanjiData] = useState([]);
//     const [names, setNames] = useState([]);
//     const [imageSets, setImageSets] = useState([]);
//     const [quizIndex, setQuizIndex] = useState(0);
    
//     function timeout(delay) {
//         return new Promise( res => setTimeout(res, delay) );
//       }
//     async function iterateThrough() {
//         await timeout(1500);
//         setQuizIndex(prevIndex => prevIndex + 1); 
//     }
    

//     useEffect(() => {
//     const fetchData = async () => {           
//         await fetchKanjiDataForQuiz(props.selectedValues, setKanjiImageData);
//         await fetchAllDataForKanji(setAllKanjiData);
//     }
//     fetchData();
//     }, [props.selectedValues]);

//     useEffect(() => {
//         if (kanjiImageData.length > 0 && allKanjiData.length > 0) {

//             const idS = kanjiImageData.map(item => item.id);
//             const kanjiObject = allKanjiData.map(item => ({
//                 id: item.id,
//                 onyomi: item.onyomi,
//                 imageUrl: item.imageUrl
//             }));

//             const nameS = idS.map(id => {
//                 const kanji = kanjiObject.find(item => item.id === id);
//                 return kanji ? kanji.onyomi : null;
//             });
//             setNames(nameS); 

//             const images = idS.map(id => {
//                 const arr = [];
//                 arr.push(kanjiObject.find(item => item.id === id).imageUrl); 
//                 while (arr.length < 4) {
//                     const randomIndex = Math.floor(Math.random() * kanjiObject.length);
//                     const randomKanji = kanjiObject[randomIndex];
//                     if (!arr.includes(randomKanji.imageUrl)) {
//                         arr.push(randomKanji.imageUrl); 
//                     }    
//                 }
//                 for (let i = arr.length - 1; i > 0; i--) {
//                     const j = Math.floor(Math.random() * (i + 1)); 
//                     [arr[i], arr[j]] = [arr[j], arr[i]]; 
//                 }
//                 return arr;
//             });
//             setImageSets(images); 
//         }
//     }, [kanjiImageData, allKanjiData]);
//     const answerAlert = (result) => {
//         setMessage(result ? 'Poprawna odpowieź!' : 'Błędna odpowiedź!');
//         setBackgroundColor(result ? "rgba(2, 242, 50, .6)" : "rgba(230, 9, 9, .6)");
//         setMessageColor(result? "green":"red");
//     }

//     return (
//         <div>
//             {names.length > 0 && imageSets.length > 0 && quizIndex < names.length && (
//                 <div>
//                 <div key={`name-${quizIndex}`}>
//                     <h3>{names[quizIndex]}</h3>
//                 </div>
//                 <Container className="answerContainer">
//                     {quizIndex < names.length - 1 && (
//                     <Row 
//                     className="answerGrid"
//                     onClick={iterateThrough}>
//                         {imageSets[quizIndex].map((imgUrl, imgIndex) => (
//                             <Col className="imageCon" key={`col-${quizIndex}-${imgIndex}`} sm={6}>
//                                 <img 
//                                     src={`/znaki/Kanji/bez tła/${imgUrl}`} 
//                                     alt={`Image ${imgIndex}`} 
//                                     className="answerImage" 
//                                 />
//                             </Col>
//                         ))}
//                     </Row>)}
//                 </Container>
//                 </div>
//             )}
//         </div>
//     );
// }
    