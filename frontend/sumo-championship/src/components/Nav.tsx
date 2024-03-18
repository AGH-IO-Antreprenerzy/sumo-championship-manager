import { FunctionComponent } from "react";

import "../styles/Nav.css";
import useNavigation from "../hooks/useNavigation";

const Nav: FunctionComponent = () => {
    const { navigateToOther, navigateToLogin, navigateToPlayers} = useNavigation();
    return (
        <div className="nav">
            <div className="nav-inner">
                <div className="options-parent">
                    <div className="option" onClick={navigateToPlayers}>zawodnicy</div>
                    <div className="option" onClick={navigateToOther}>other</div>
                </div>
            </div>
            <button className="button" onClick={navigateToLogin}>
                <div className="login">zaloguj się</div>
            </button>
        </div>
    );
};

export default Nav;