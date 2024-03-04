// import axios from 'axios';
// import { API_BASE_URL, OAUTH2_REDIRECT_URI, GOOGLE_AUTH_URL, CLIENT_ID, CLIENT_SECRET} from '../../constants/values';
// const exchangeCodeForToken = async (code) => {
//   const tokenEndpoint = 'https://oauth2.googleapis.com/token'; // Google's token endpoint

//   // Replace with your Google Client ID and Secret
//   const clientId = CLIENT_ID;
//   const clientSecret = CLIENT_SECRET;
//   const credentials = btoa(`${clientId}:${clientSecret}`);

// const requestBody = new URLSearchParams({
//     code: code,
//     grant_type: "authorization_code",
//     redirect_uri: OAUTH2_REDIRECT_URI,
//   });

//     try {
//         const response = await axios.post(tokenEndpoint, requestBody, {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "Authorization": `Basic ${credentials}`,
//           },
//         });
       

//     // Extract the access token from the response
//     console.log(response.data)
//     const accessToken = response.data.access_token;
//     console.log('Access Token:', accessToken);

//     // Optionally, you can store the access token in localStorage or state
//     // localStorage.setItem('accessToken', accessToken);

//     // Set the access token in an HTTP-only cookie
//     document.cookie = `accessToken=${accessToken}; path=/;`;
//     console.log(document.cookie)

//   } catch (error) {
//     console.error('Error exchanging code for token:', error);
//     // Handle the error as needed
//   }
// };

// export default exchangeCodeForToken;