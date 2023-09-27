const axios = require('axios'); // Import Axios library

// Define the API endpoint URL
const apiUrl = 'http://localhost:8000/users/';

const someone =   {
    username: 'another',
    email: 'another@gmail.com',
    is_staff: true,
  };

const token = "d3e1373ed18628323b03a636b9f577e03444b816";
const headers = {
  Authorization: "Token d3e1373ed18628323b03a636b9f577e03444b816",
  'Content-Type': 'application/json',
};

show = () =>{
  axios.get(apiUrl)
  .then((response) => {
    console.log('API Response:', response.data);
  })
  .catch((error) => {
    // Handle error
    console.error('API Error:', error);
  });
}

show()

adduser = () =>{
  axios.post(apiUrl,someone, {headers})
  .then((res) => {console.log('POST Request Response:', res.data);})
  .catch((error) => {
    // Handle error
    console.error('API Error:', error);
  });
}

adduser()