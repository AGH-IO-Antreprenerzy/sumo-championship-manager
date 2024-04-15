import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Nav.css';
import { useUser } from '../../contexts/UserContext';
import { Role } from '../../api/login';
import ROUTES from '../../routes/allRoutes';

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useUser();

  interface NavTab{
    name: string,
    navigate: () => void,
    roles: Role[]
  }
  
  const tabs: NavTab[] = [
    {
      name: "Home",
      navigate: () => navigate(ROUTES.HOME),
      roles: []
    },
    {
      name: "Seasons",
      navigate: () => navigate(ROUTES.SEASONS),
      roles: []
    },
    {
      name: "Tournaments",
      navigate: () => navigate(ROUTES.TOURNAMENTS),
      roles: []
    },
    {
      name: "Contact",
      navigate: () => navigate(ROUTES.CONTACT),
      roles: []
    },
    {
      name: "Add trainer",
      navigate: () => navigate(ROUTES.ADDTRAINER),
      roles: [Role.Admin]
    },
  ]

  const canUserView = (tab: NavTab) => tab.roles.length === 0 || (user.role !== null && tab.roles.includes(user.role))

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
      />
      <div className={`options-parent ${menuOpen ? 'open' : ''}`}>
        {tabs.map((tab, index) => canUserView(tab) &&
          <div className="option" onClick={tab.navigate} key={index}>
            {tab.name}
          </div> 
        )}
      </div>
      {!user.isLogged && <button
        className={`nav-button ${menuOpen ? 'open' : ''}`}
        onClick={() => navigate(ROUTES.LOGIN)}
      >
        <div className="login">Log in</div>
      </button>}
    </div>
  );
};

export default Nav;
