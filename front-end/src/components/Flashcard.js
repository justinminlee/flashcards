import React, { useState } from 'react';
import './Flashcard.css';

const Flashcards = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flashcards">
      <h2>Flashcards</h2>
      <div className={`flashcard ${showAnswer ? 'show-answer' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
        <div className="flashcard-front">
          <p style={{ fontWeight: 'bold' }}>Question</p>
          <p>{data[currentIndex].description}</p>
        </div>
        <div className="flashcard-back">
          <p style={{ fontWeight: 'bold' }}>Solution</p>
          <p>{data[currentIndex].answer}</p>
        </div>
        </div>
      </div>
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Flashcards;
