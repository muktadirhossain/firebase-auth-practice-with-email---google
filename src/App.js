import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Sign up/SignUp";
import Home from "./components/home/Home";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/login/Login.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
