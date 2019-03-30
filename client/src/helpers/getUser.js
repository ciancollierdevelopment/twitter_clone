import axios from 'axios';

const getUser = async () => {
  const response = await axios.get('/auth/currentuser');

  if (response.data.error) {
    return {
      logged_in: false
    };
  } else {
    return {
      logged_in: true,
      user: response.data.username,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
      email: response.data.email
    };
  }
};

export default getUser;
