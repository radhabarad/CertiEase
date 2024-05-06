import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Student_Dashboard from "./components/Student_Dashboard";
import Bonafide from "./pages/Bonafide";
import Faculty_Dashboard from "./components/Faculty_Dashboard";
import Due from "./pages/Due";
import Character from "./pages/Character";
import MyCertificates from "./pages/MyCertificates";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#091226] flex flex-col ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/student_signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/student_dashboard"
          element={
            // <PrivateRoute isLoggedIn={isLoggedIn}>
            <Student_Dashboard />
            /* </PrivateRoute> */
          }
        />

        <Route path="/bonafide" element={<Bonafide />} />
        <Route path="/due" element={<Due />} />
        <Route path="/character" element={<Character />} />
        <Route path="/myCertificates" element={<MyCertificates />} />

        <Route path="/faculty_dashboard" element={<Faculty_Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
