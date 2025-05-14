import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./Loginpage/Login";
import SignUp from "./Loginpage/SignUp";


function App() {
  return (
    <Routes>
   <Route path="/" element={<Login />} />
   <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;