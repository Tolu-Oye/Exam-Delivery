// import logo from './logo.svg';
import './App.css';

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionCategory from './Components/QuestionCategory';
import HomePage from './Components/HomePage';
import Login from './Components/Login';


const App = () => {
  return (
    <>

    <Router>

        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/general" element={<QuestionCategory category="general" />} />
          <Route path="/math" element={<QuestionCategory category="math" />} />
          <Route path="/programming" element={<QuestionCategory category="programming" />} />
        </Routes>
 
    </Router>
    </>
  );
};


export default App;