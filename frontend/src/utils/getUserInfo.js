import axios from 'axios';

const getUserInfo = async () => {
  try {
    const response = await axios.get('http://localhost:1234/api/auth/authCheck', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


export default getUserInfo;