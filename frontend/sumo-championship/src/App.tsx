import { FunctionComponent, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/organisms/Nav"
import Other from "./pages/Other";
import Players from "./pages/Players";
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage";
import { userContext } from "./contexts/UserContext";
import ROUTES from "./routes/ROUTES";

const App: FunctionComponent = () => {

    const {user} = useContext(userContext);

    return (
        <BrowserRouter>
            <div className="App">
                <Nav />
                <Routes>
                    <Route path="/other" element={<Other />} />
                    <Route path="/login" element={ !user.isLogged ?  <LoginPage/> : <Navigate to={ROUTES.HOME} />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;

