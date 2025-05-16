import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Loginpage/Login";
import SignUp from "./Loginpage/SignUp";
import MainDong from "./MainDong";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/maindong" element={<MainDong />} />
    </Routes>
  );
}

export default App;
