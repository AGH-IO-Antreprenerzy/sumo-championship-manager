import React from "react";
import "./styles/App.css";
import LoginPage from "./pages/LoginPage";
import UserContext from "./contexts/UserContext";

function App() {

  return (
    <UserContext>
      <LoginPage/>
    </UserContext>
  );
}

export default App;
