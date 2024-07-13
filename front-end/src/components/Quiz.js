import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleNext = () => {
    setSelectedAnswer('');
    setFeedback('');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setSelectedAnswer('');
    setFeedback('');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === data[currentIndex].rightAnswer) {
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect, try again.');
    }
  };

  return (
    <div className="quiz">
      <h2>Quiz</h2>
      <div className="quiz-item">
        <p><strong>Question:</strong> {data[currentIndex].question}</p>
        <ul>
          {data[currentIndex].answers.map((answer, i) => (
            <li key={i}>
              <button
                className={`answer-button ${selectedAnswer === answer ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(answer)}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
      <div className="controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
        <button onClick={handleNext} disabled={currentIndex === data.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default Quiz;

