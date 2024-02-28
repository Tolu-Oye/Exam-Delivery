import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        // Read the access token from the cookie
        console.log(document.cookie)

        const accessToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('accessToken='))
          ?.split('=')[1];
        
        console.log(accessToken)
        if (accessToken) {
          try {
            // Make a request to the user profile API using the access token
            const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
  
            if (response.ok) {
              const user = await response.json();
              setUserData(user);
            } else {
              console.error('Failed to fetch user data:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          console.error('Access token not found in the cookie');
        }
      };
  
      fetchUserData();
    }, []);
  
    return (
      <div>
        <h2>User Profile</h2>
        {userData ? (
          <div>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <img src={userData.picture} alt="Profile" />
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    );
  };

// const Profile = ({ accessToken }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         // Handle the error as needed
//       }
//     };

//     if (accessToken) {
//       fetchProfileData();
//     }
//   }, [accessToken]);

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {userData ? (
//         <>
//           <img src={userData.picture} alt="Profile" />
//           <p>Name: {userData.name}</p>
//           <p>Email: {userData.email}</p>
//           {/* Add more profile details as needed */}
//         </>
//       ) : (
//         <p>Loading profile data...</p>
//       )}
//     </div>
//   );
// };

export default Profile;