import React from 'react';

const MainTopic = ({ data }) => {
  return (
    <div className="main-topic">
      <h2>Main Topics</h2>
      {data.map((topic, index) => (
        <div key={index} className="topic">
          <h3>{topic.title}</h3>
          <p>{topic.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MainTopic;
