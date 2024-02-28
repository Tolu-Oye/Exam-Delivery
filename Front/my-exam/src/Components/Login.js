import {  useNavigate } from 'react-router-dom';
import googleLogo from '../img/google-logo.png'
import axios from 'axios';

const url = 'http://localhost:8080/api/oauth2/authorization/google'
const Login = () => {


  return (
    <div>
      <h2>Login Page</h2>
      <a className="btn btn-dark social-btn google" href={url}>

      <img src={googleLogo} alt="Google" />
          Log in with Google
        </a>
      
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