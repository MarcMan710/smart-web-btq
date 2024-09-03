// frontend/src/services/userService.js
import apiService from './apiService';

const userService = () => {
    const { get, post } = apiService();

    const fetchUserProfile = async () => {
        const response = await get('/api/users/profile');
        return response;
    };

    const updateUserProfile = async (profileData) => {
        const response = await post('/api/users/profile', profileData);
        return response;
    };

    return { fetchUserProfile, updateUserProfile };
};

export default userService;
