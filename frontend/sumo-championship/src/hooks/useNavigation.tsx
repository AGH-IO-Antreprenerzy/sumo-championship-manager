import { useNavigate } from "react-router-dom";

const useNavigation = () => {
    const navigate = useNavigate();

    const navigateToOther = () => {
        navigate("/other");
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    const navigateToPlayers = () => {
        navigate("/players");
    };

    return { navigateToOther, navigateToLogin ,navigateToPlayers};
};

export default useNavigation;