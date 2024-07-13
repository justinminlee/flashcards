import React, { useState } from 'react';
import jsonData from './data.json';
import './App.css';

function App() {
  const [currentFlashCard, setCurrentFlashCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [testAnswers, setTestAnswers] = useState({});
  const [showTestResults, setShowTestResults] = useState(false);

  const handleFlashCardNext = () => {
    setCurrentFlashCard((prev) => (prev + 1) % jsonData.flash_cards.length);
    setShowAnswer(false);
  };

  const handleAnswerChange = (question, option) => {
    setTestAnswers({ ...testAnswers, [question]: option });
  };

  const handleSubmitTest = () => {
    setShowTestResults(true);
  };

  const checkAnswer = (question, option) => {
    const correctAnswers = jsonData.multiple_answer_questions.find((q) => q.question === question).correct_answers;
    return correctAnswers.includes(option);
  };

  return (
    <div className="App">
      <h1>Java Introduction</h1>

      <section>
        <h2>Flash Cards</h2>
        <div className="flash-card">
          <div onClick={() => setShowAnswer(!showAnswer)}>
            <p>{jsonData.flash_cards[currentFlashCard].question}</p>
            {showAnswer && <p className="answer">{jsonData.flash_cards[currentFlashCard].answer}</p>}
          </div>
          <button onClick={handleFlashCardNext}>Next</button>
        </div>
      </section>

      <section>
        <h2>Multiple Choice Test</h2>
        {jsonData.multiple_answer_questions.map((question) => (
          <div key={question.question} className="test-question">
            <p>{question.question}</p>
            {question.options.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={testAnswers[question.question]?.includes(option) || false}
                  onChange={() => handleAnswerChange(question.question, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button onClick={handleSubmitTest}>Submit Test</button>
        {showTestResults && (
          <div className="test-results">
            {jsonData.multiple_answer_questions.map((question) => (
              <div key={question.question}>
                <p>{question.question}</p>
                {question.options.map((option) => (
                  <div key={option} className={checkAnswer(question.question, option) ? 'correct' : 'incorrect'}>
                    {option}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Related Topics and YouTube Lessons</h2>
        <ul>
          {jsonData.related_topics_or_youtube_lesson_links.map((item) => (
            <li key={item.topic}>
              <a href={item.youtube_link} target="_blank" rel="noopener noreferrer">
                {item.topic}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
