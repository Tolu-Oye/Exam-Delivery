import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {


return (
    <div className="text-center">
      <h1 className="display-1 font-weight-bold text-primary mt-5" style={{ fontFamily: 'Roboto, sans-serif' }}>
        OYEWUSI EDUCATION
      </h1>

      <Link to="/profile" className="btn btn-dark rounded-pill py-2 px-4 shadow-sm">
              Profile
            </Link>
      <nav className="mt-5">
        <ul className="list-unstyled">
          <li className="mb-4">
            <Link to="/general" className="btn btn-primary rounded-pill py-2 px-4 shadow-sm">
              General Questions
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/math" className="btn btn-primary rounded-pill py-2 px-4 shadow-sm">
              Math Questions
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/programming" className="btn btn-primary rounded-pill py-2 px-4 shadow-sm">
              Programming Questions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;