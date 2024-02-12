import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/home/Home";
import Admin from "./component/admin /Admin";

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/valentine-game">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
