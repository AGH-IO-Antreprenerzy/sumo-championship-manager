import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav"
import Other from "./components/Other";
import Login from "./components/Login";
import Players from "./components/Players";
import Home from "./components/Home"
import React from 'react';



const App: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Nav />
                <Routes>
                    <Route path="/other" element={<Other />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;

