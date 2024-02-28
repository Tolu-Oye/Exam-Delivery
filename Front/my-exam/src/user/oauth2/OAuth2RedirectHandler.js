import {React, useEffect} from 'react';

import { useNavigate, useLocation, useParams } from 'react-router-dom';
import exchangeCodeForToken from './exchangeCodeForToken';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();

//   const { state, code } = useParams();

  const location = useLocation();
  console.log(location.search);
  const searchParams = new URLSearchParams(location.search);

  const state = searchParams.get('state');
  const code = searchParams.get('code');

  useEffect(() => {
    // Perform any necessary processing with the state and code values
    console.log('State:', state);
    console.log('Code:', code);

    // Call a function to exchange the code for an access token (replace with your implementation)
    exchangeCodeForToken(code);

    // Redirect to the desired page (e.g., home page)
    navigate('/home');
  }, [state, code, navigate]);


};

export default OAuth2RedirectHandler;