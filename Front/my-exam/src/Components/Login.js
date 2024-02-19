import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Make a request to initiate OAuth2 login on the backend
    const response = await fetch('http://localhost:8080/api/oauth2/authorization/google');

    // Redirect the user to the authorization URL received from the backend
    window.location.href = response.data.authorizationUrl;

    // Alternatively, you can use navigate to redirect programmatically
    // navigate('/home');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;

// import { GoogleLogin } from 'react-google-login';

// const id = "600565809598-nc2uj2mk853cmf4ocrumc45kcd13qmev.apps.googleusercontent.com"
// const Login = () => {
//   const navigate = useNavigate();

//   const responseGoogle = (response) => {
//     console.log(response);
//     // Handle the Google login response here
//     // navigate('/home');
//   };

//   return (
//     <div>
//       <h2>Login Page</h2>
//       <GoogleLogin
//         clientId={id}
//         buttonText="Login with Google"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy={'single_host_origin'}
//       />
//     </div>
//   );
// };

// export default Login;