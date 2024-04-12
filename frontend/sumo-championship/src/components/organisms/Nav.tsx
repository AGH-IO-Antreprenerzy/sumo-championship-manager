import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Nav.css';
import ROUTES from '../../routes/ROUTES';

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="nav">
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img
        src={require('../../assets/icons/logo.png')}
        alt="Logo"
        className="nav-image"
        style={{ height: 64 }}
        onClick={() => navigate(ROUTES.HOME)}
      />
      <div className={`options-parent ${menuOpen ? 'open' : ''}`}>
        <div className="option" onClick={() => navigate(ROUTES.HOME)}>
          Home
        </div>
        <div className="option" onClick={() => navigate(ROUTES.SEASONS)}>
          Seasons
        </div>
        <div className="option" onClick={() => navigate(ROUTES.TOURNAMENTS)}>
          Tournaments
        </div>
        <div className="option" onClick={() => navigate(ROUTES.CONTACT)}>
          Contact
        </div>
      </div>
      <button
        className={`nav-button ${menuOpen ? 'open' : ''}`}
        onClick={() => navigate(ROUTES.LOGIN)}
      >
        <div className="login">Log in</div>
      </button>
    </div>
  );
};

export default Nav;
