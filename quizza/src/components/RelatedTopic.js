import React from 'react';

const RelatedTopics = ({ data }) => {
  return (
    <div className="related-topics">
      <h2>Related Topics</h2>
      {data.map((topic, index) => (
        <div key={index} className="related-topic">
          <p><strong>Suggestion:</strong> {topic.suggestion}</p>
          <p>
            <strong>Link:</strong> <a href={topic.url}>{topic.linkName}</a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default RelatedTopics;
