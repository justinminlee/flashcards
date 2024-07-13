import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Quiz</div>
      <div className="user-info">
        <span>User_7389</span>
        <div className="fire">
          <FontAwesomeIcon icon={faFire} />
          <span className="number">5</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
