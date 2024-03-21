import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Nav.css";
import ROUTES from "../../routes/ROUTES";

const Nav: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="nav">
            <div className="nav-inner">
                <div className="options-parent">
                    <div className="option" onClick={() => navigate(ROUTES.PLAYERS)}>zawodnicy</div>
                    <div className="option" onClick={() => navigate(ROUTES.OTHER)}>other</div>
                </div>
            </div>
            <button className="button" onClick={() => navigate(ROUTES.LOGIN)}>
                <div className="login">zaloguj się</div>
            </button>
        </div>
    );
};

export default Nav;