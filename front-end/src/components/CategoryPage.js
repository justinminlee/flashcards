import React, { useState } from 'react';
import MainTopic from './MainTopic';
import Flashcards from './Flashcard';
import Quiz from './Quiz';
import RelatedTopics from './RelatedTopic';
import './CategoryPage.css';

const CategoryPage = ({ data, categoryName }) => {
  const [activeTab, setActiveTab] = useState('mainTopic');

  const renderContent = () => {
    switch (activeTab) {
      case 'mainTopic':
        return <MainTopic data={data.mainTopics} />;
      case 'flashcards':
        return <Flashcards data={data.flashcards} />;
      case 'quiz':
        return <Quiz data={data.quizzes} />;
      case 'relatedTopics':
        return <RelatedTopics data={data.relatedTopics} />;
      default:
        return null;
    }
  };

  return (
    <div className="category-page">
      <h1>{categoryName}</h1>
      <div className="tabs">
        <button className={activeTab === 'mainTopic' ? 'active' : ''} onClick={() => setActiveTab('mainTopic')}>Main Topic</button>
        <button className={activeTab === 'flashcards' ? 'active' : ''} onClick={() => setActiveTab('flashcards')}>Flashcards</button>
        <button className={activeTab === 'quiz' ? 'active' : ''} onClick={() => setActiveTab('quiz')}>Quiz</button>
        <button className={activeTab === 'relatedTopics' ? 'active' : ''} onClick={() => setActiveTab('relatedTopics')}>Related Topics</button>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default CategoryPage;
