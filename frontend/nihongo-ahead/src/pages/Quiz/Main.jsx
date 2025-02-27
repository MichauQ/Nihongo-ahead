import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Używamy useParams
import DrawingQuiz1 from './QuizComponents/DrawingQuiz1';
import DrawingQuiz2 from './QuizComponents/DrawingQuiz2';
import { Context } from '../../App';
import ChooseOneQuiz from './QuizComponents/ChooseOneQuiz';
import DefaultQuiz from './QuizComponents/DefaultQuiz';

export default function Main({
  currentData,
  totalQuestions,
  matchingName,
  currentQuestion,
  iterateThrough,
  setSelectedValues,
  quizType,
  quizMode,
  isQuizFinished
}) {
  const { colorMode } = useContext(Context);
  const navigate = useNavigate();
  const {quizMode: paramQuizMode } = useParams(); 

 
  useEffect(() => {
    if (quizMode) {
      const newPath = `/Quiz/${quizMode}`;
      navigate(newPath, { replace: true }); 
    }
  }, [quizMode, navigate]);

  if (!currentData) {
    return <div className="choose-image-body main-dark"><h1>Ładowanie danych...</h1></div>;
  }

  return (
    <div className={colorMode ? "choose-image-body main-light" : "choose-image-body main-dark"}>
      {quizMode === null ? (
        <h1>Ładowanie...</h1>
      ) : quizMode === "RysowanieLvl1" || paramQuizMode === "RysowanieLvl1" ? (
        <DrawingQuiz1
          iterateThrough={iterateThrough}
          currentData={currentData}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          matchingName={matchingName}
          quizType={quizType || paramQuizType} // Użyj parametryzowanego quizType z URL lub props
          colorMode={colorMode}
        />
      ) : quizMode === "RysowanieLvl2" || paramQuizMode === "RysowanieLvl2" ? (
        <DrawingQuiz2
          iterateThrough={iterateThrough}
          currentData={currentData}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          matchingName={matchingName}
          quizType={quizType || paramQuizType}
          colorMode={colorMode}
        />
      ) : quizMode === "WybierzJeden" || paramQuizMode === "WybierzJeden" ? (
        <ChooseOneQuiz
          iterateThrough={iterateThrough}
          currentData={currentData}
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          quizType={quizType || paramQuizType}
          isQuizFinished={isQuizFinished}
          colorMode={colorMode}
        />
      ) : quizMode === "default" || paramQuizMode === "default" ? (
        <DefaultQuiz
          isQuizFinished={isQuizFinished}
          quizType={quizType || paramQuizType}
          setSelectedValues={setSelectedValues}
          totalQuestions={totalQuestions}
          currentData={currentData}
          currentQuestion={currentQuestion}
          iterateThrough={iterateThrough}
          colorMode={colorMode}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
