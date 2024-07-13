import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import MainTopic from './MainTopic';
import Flashcard from './Flashcard';
import Quiz from './Quiz';
import RelatedTopic from './RelatedTopic';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="category-page">
      <h2>{categoryName}</h2>
      <nav className="topic-nav">
        <Link to="main-topic">Main Topic</Link>
        <Link to="flashcard">Flashcard</Link>
        <Link to="quiz">Quiz</Link>
        <Link to="related-topic">Related Topic</Link>
      </nav>
      <div className="topic-content">
        <Routes>
          <Route path="main-topic" element={<MainTopic />} />
          <Route path="flashcard" element={<Flashcard />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="related-topic" element={<RelatedTopic />} />
        </Routes>
      </div>
    </div>
  );
};

export default CategoryPage;
