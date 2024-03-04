import React, { useState, useEffect } from 'react';
import Question from './Question';
import { Link } from 'react-router-dom';  
import '../App.css';

const QuestionCategory = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState(0);

  // New state for the countdown timer
  const [timer, setTimer] = useState(20 * 60); // 20 minutes in seconds

  const fetchQuestions = async (selectedCategory, page = 0) => {
    // Use the selectedCategory and page to construct the API endpoint
    const apiUrl = getApiUrl(selectedCategory, page);
  
    // Fetch questions from the API and set them in state
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch questions. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // setQuestions(data.content.map((q) => ({ ...q, selectedOption: null })));
      setQuestions(data.content.map((q, index) => ({ ...q, selectedOption: null, fullIndex: index + page * 5 })));
      setCurrentPage(data.number);
      setTotalPages(data.totalPages);
      setCount(data.totalElements);
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      // Update the timer every second
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          // If the timer reaches 0, automatically submit the test
          handleSubmit();
          clearInterval(timerInterval); // Stop the interval
          return 0;
        }
      });
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // Run this effect only once on component mount



  useEffect(() => {
    fetchQuestions(category);
  }, [category]);

  const handleOptionChange = (questionId, selectedOption) => {
    // Update the selected option for the specific question
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, selectedOption } : q
      )
    );
  };



  const handleSubmit = () => {
    // Calculate total score
    const newTotalScore = questions.reduce((acc, question) => {
      return acc + (question.selectedOption === question.correctOption ? 1 : 0);
    }, totalScore);

    setTotalScore(newTotalScore);
    setSubmitted(true);

  };

  

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      fetchQuestions(category, currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      fetchQuestions(category, currentPage - 1);
    }
  };

  return (
    <div className="container text-center">
      
  
      <nav className="navbar navbar-expand-lg navbar-light bg-white">

        <Link to="/home" className="btn btn-primary rounded-pill mr-4 mt-2">
          Home Page
        </Link>
      </nav>
      <div className="timer btn btn-dark">
          Question Timer : {` ${Math.floor(timer / 3600)
          .toString()
          .padStart(2, '0')}:${Math.floor((timer % 3600) / 60)
          .toString()
          .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}
      </div>
      <h1 className="display-2 font-weight-bold text-primary mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {category.toUpperCase()} QUESTIONS
      </h1>
      <ul className="list-unstyled">
        {questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            index={question.fullIndex}
            onOptionChange={handleOptionChange}
            submitted={submitted}
          />
        ))}
      </ul>
      <div className="pagination-buttons">
        {currentPage > 0 && (
          <button className="btn btn-primary rounded-pill py-2 px-4 mt-4 shadow-sm" onClick={handlePrevPage}>
            Previous
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button className="btn btn-primary rounded-pill py-2 px-4 mt-4 shadow-sm" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
      <button
        onClick={handleSubmit}
        disabled={submitted}
        className={`btn btn-dark rounded-pill py-2 px-4 mt-4 shadow-sm ${submitted ? 'disabled' : ''}`}
      >
        Submit
      </button>
      {submitted && <p className="mt-4">Total Score: {totalScore} out of {count}</p>}
    </div>
  );
};

const getApiUrl = (selectedCategory, page) => {
  // Use the selectedCategory and page to construct the API endpoint
  // Example: You might have different API URLs for each category
  if (selectedCategory === 'general'){
    return `api/exam/questions?page=${page}&size=5`;
  }
else{
  return `api/exam/${selectedCategory}?page=${page}&size=5`;
  }
};

export default QuestionCategory;