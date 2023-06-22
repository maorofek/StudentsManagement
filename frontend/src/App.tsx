import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Students from "./components/student/Students";
import HonorCandidates from "./components/student/HonorCandidates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/honorCandidates" element={<HonorCandidates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
