import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Module.css';

const Module = ({ module, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(module.name);
  const navigate = useNavigate();

  const handleRename = () => {
    onRename(module.id, name);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(module.id);
  };

  const handleNavigate = () => {
    navigate(`/module/${module.name}`);
  };

  return (
    <div className="module">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleRename}>Save</button>
        </div>
      ) : (
        <h3 onClick={handleNavigate}>{module.name}</h3>
      )}
      <button onClick={() => setIsEditing(true)}>Rename</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Module;
