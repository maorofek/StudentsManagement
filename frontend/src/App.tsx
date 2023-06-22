import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Students from "./components/student/Students";
import HonorCandidates from "./components/student/HonorCandidates";
import { SnackbarProvider } from "notistack";
import { Link } from "react-router-dom";

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ horizontal: "left", vertical: "top" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/students" />} />
          <Route path="/students" element={<Students />} />
          <Route path="/honor-candidates" element={<HonorCandidates />} />
          <Route
            path="*"
            element={
              <div>
                {" "}
                <h2>404 Page not found</h2>
                <Link to="/students">Go to Students</Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
