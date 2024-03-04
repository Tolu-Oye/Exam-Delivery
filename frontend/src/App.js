// import logo from './logo.svg';
import './App.css';
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuestionCategory from './Components/QuestionCategory';
import Profile from './Profile/Profile';
import HomePage from './Components/HomePage';
import Login from './Components/Login';


const App = () => {
  return (
    <>

    <Router>

        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/login/oauth2/redirect" element={<OAuth2RedirectHandler />}/> */}
        <Route path="/profile" element={<Profile/>} />
        <Route path="/general" element={<QuestionCategory category="general" />} />
          <Route path="/math" element={<QuestionCategory category="math" />} />
          <Route path="/programming" element={<QuestionCategory category="programming" />} />
        </Routes>
 
    </Router>
    </>
  );
};


export default App;