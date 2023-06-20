import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Students from "./components/Students";
// import HonorCandidates from "./components/HonorCandidates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Students />} />
        {/* <Route path="/shtok" element={<HonorCandidates />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
