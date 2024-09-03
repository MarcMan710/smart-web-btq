// frontend/src/services/authService.js
import axios from 'axios';

const login = async ({ email, password }) => {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data; // Assuming response.data contains { token, user }
};

export default { login };