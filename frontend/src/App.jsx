import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Loginpage/Login";
import SignUp from "./Loginpage/SignUp";
import MainDong from "./MainDong";
import MainH from "./MainH";
import MyPage from "./MyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/maindong" element={<MainDong />} />
      <Route path="/mainH" element={<MainH />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
